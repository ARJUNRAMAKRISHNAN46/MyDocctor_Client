import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { UserData } from "../types/userData";
import { signupUser } from "../redux/actions/UserActions";
import { AppDispatch } from "../redux/store";

interface OtpInputProps {
  length?: number;
  userData: UserData;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 4, userData }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [validOtp, setValidOtp] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  console.log("userData on otp page", userData);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const onOtpSubmit = async (otp: string) => {
    try {
      console.log("otp : ", otp);
      console.log("userData :", userData);
      userData.otp = otp;
      delete userData.confirmPassword;
      console.log("userData with otp :", userData);

      dispatch(signupUser(userData))
        .then((res) => {
          console.log("🚀 ~ .then ~ res----------------------:", res);

          if (res.type.endsWith("fulfilled")) {
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
  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
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
      <div className="flex justify-center items-start h-[50vh] bg-gray-700">
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
    </div>
  );
};

export default OtpInput;
