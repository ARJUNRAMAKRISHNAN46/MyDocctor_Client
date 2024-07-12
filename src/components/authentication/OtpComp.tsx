import { useEffect, useRef, useState } from "react";
import { UserData } from "../../types/userData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

interface OtpCompProps {
  data: UserData;
}

function OtpComp({ data }: OtpCompProps) {
  const [otp, setOtp] = useState<string>("");
  const [validOtp, setValidOtp] = useState<boolean>(false);
  const [countDown, setCountDown] = useState<number>(30);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = data
    ? {
        name: data.name,
        mobile: data.mobileNumber,
        email: data.email,
        password: data.password,
        otp: data.otp,
      }
    : {};

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (value.length > 1) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    const finOtp = newOtp.join("");
    if (finOtp.length > 4) {
      return;
    }
    setOtp(finOtp);

    console.log("finOtp:", finOtp, finOtp.length);

    if (finOtp.length === 4) {
      userData.otp = finOtp;
      console.log("data.otp :", userData.otp);
      try {
        const response = await axios.post(
          `https://mydocctor.online/auth/signup`,
          userData,
          { withCredentials: true }
        );
        if (response.status === 200) {
          console.log("Routing to home page...");
          dispatch({ type: "SET_USER_DATA", payload: response.data });
          navigate("/home");
        }
      } catch (error) {
        if (error) {
          setValidOtp(!validOtp);
        }
        console.error("Error:", error);
      }
    }

    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleResendOTP = async () => {
    setCountDown(30);
    const response = await axios.post(
      `https://mydocctor.online/auth/signup`,
      userData,
      { withCredentials: true }
    );

    if (response) {
      console.log("response : ", response);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-700">
      {validOtp && (
        <div className="bg-red-500 text-white text-center py-2">
          Invalid OTP
        </div>
      )}
      <div className="flex justify-center">
        <h1 className="text-red-600 md:text-[40px] text-[20px] font-bold mt-48">
          Enter Your OTP
        </h1>
      </div>
      <div className="flex justify-center mt-6">
        <div>
          {inputRefs.map((ref, index) => (
            <input
              key={index}
              ref={ref}
              className="w-[60px] h-[60px] m-1 text-center text-[30px] font-semibold border rounded-sm"
              type="number"
              maxLength={1}
              required
              onChange={(e) => handleChange(index, e)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        {countDown === 0 ? (
          <button
            onClick={handleResendOTP}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Resend OTP
          </button>
        ) : (
          <p className="text-white">Resend OTP in {countDown} seconds</p>
        )}
      </div>
    </div>
  );
}

export default OtpComp;
