import React, { useEffect, useRef, useState } from "react";
import { UserData } from "../../types/userData";
import { signupDoctor, signupUser } from "../../redux/actions/UserActions";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

interface OtpInputProps {
  length?: number;
  userData: UserData;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 4, userData }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [validOtp, setValidOtp] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [countDown, setCountDown] = useState<number>(30);

  console.log("userData on otp page", userData);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    const timer = setInterval(() => {
      setCountDown((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const onOtpSubmit = async (otp: string) => {
    try {
      console.log("otp : ", otp);
      console.log("userData :", userData);
      userData.otp = otp;
      delete userData.confirmPassword;
      console.log("userData with otp :", userData);

      if (userData.role === "user") {
        dispatch(signupUser(userData))
          .then((res) => {
            console.log("🚀 ~ .then ~ res----------------------:", res);

            if (res.type.endsWith("fulfilled")) {
              navigate("/userHome");
              console.log("heree");
            }
            if (res.type.endsWith("rejected")) {
              setValidOtp(true);
              setTimeout(() => {
                setValidOtp(false);
              }, 3000);
            }
          })
          .catch((err) => {
            console.log(err, "error");
          });
      } else if (userData.role === "doctor") {
        dispatch(signupDoctor(userData))
          .then((res) => {
            console.log("🚀 ~ .then ~ res----------------------:", res);

            if (res.type.endsWith("fulfilled")) {
              navigate("/doctor/doctorHome");
              console.log("heree");
            }
            if (res.type.endsWith("rejected")) {
              setValidOtp(true);
              setTimeout(() => {
                setValidOtp(false);
              }, 3000);
            }
          })
          .catch((err) => {
            console.log(err, "error");
          });
      }
    } catch (error) {
      if (error) {
        setValidOtp(!validOtp);
        setTimeout(() => {
          setValidOtp(false);
        }, 3000);
      }
      console.error("Error:", error);
    }
  };

  const handleResendOTP = async () => {
    setCountDown(30);
    console.log("ivide ethittund sanam",userData);
    userData.otp = "";
    if (userData && (userData.role === "user" || userData.role === "doctor")) {
      if (userData.role === "user") {
        dispatch(signupUser(userData))
          .then((res) => {
            console.log("🚀 ~ dispatch ~ res:", res);
          })
          .catch((err) => {
            console.log("🚀 ~ dispatch ~ err:", err);
          });
      } else {
        dispatch(signupDoctor(userData))
          .then((res) => {
            console.log("🚀 ~ dispatch ~ res:", res);
          })
          .catch((err) => {
            console.log("🚀 ~ dispatch ~ err:", err);
          });
      }
    }
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div>
      {validOtp && (
        <div className="bg-red-500 text-white text-center py-2">
          Invalid OTP
        </div>
      )}
      <div className="h-[45vh] flex justify-center items-end bg-gray-700">
        <h1 className="md:text-[30px] font-bold text-red-600">
          ENTER YOUR OTP
        </h1>
      </div>
      <div className="h-[5vh] bg-gray-700"></div>
      <div className="flex justify-center items-start h-[15vh] bg-gray-700">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            ref={(input) =>
              (inputRefs.current[index] = input as HTMLInputElement)
            }
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-[50px] h-[50px] border-2 border-gray-500 rounded-lg m-1 text-center text-[25px] font-semibold"
          />
        ))}
      </div>
      <div className="flex justify-center bg-gray-700 h-[35vh]">
        {countDown === 0 ? (
          <button
            onClick={handleResendOTP}
            className="bg-red-500 text-white px-4 py-2 h-[40px] rounded-md"
          >
            Resend OTP
          </button>
        ) : (
          <p className="text-white font-semibold">
            Resend OTP in {countDown} seconds
          </p>
        )}
      </div>
    </div>
  );
};

export default OtpInput;
