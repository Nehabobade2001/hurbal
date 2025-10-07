import { useState, useRef, useEffect } from "react";
import { LuShield } from "react-icons/lu";
import { maskTwoLetters } from "../utils/additionalFunc";

function OtpVerificationPopup({
  show,
  onHide,
  payload,
  otpSubmitHandler,
  resendOtpHandler,
}) {
  const [emailOtp, setEmailOtp] = useState(new Array(6).fill(""));
  const [emailStatus, setEmailStatus] = useState(null);
  const [shakeEmail, setShakeEmail] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  const emailRefs = useRef([]);

  useEffect(() => {
    if (show) {
      emailRefs.current[0]?.focus();
    }
  }, [show]);

  useEffect(() => {
    let timer;
    if (show && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [show, resendTimer]);

  const handleChange = (otpArray, setOtpArray, index, value, refs) => {
    if (isNaN(value)) return;
    const updatedOtp = [...otpArray];
    updatedOtp[index] = value;
    setOtpArray(updatedOtp);
    if (value && index < 5) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, otpArray, index, refs) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e, setOtpArray, refs) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(data)) {
      const otpArray = Array(6).fill("");
      data.split("").forEach((char, idx) => {
        otpArray[idx] = char;
      });
      setOtpArray(otpArray);
      refs.current[Math.min(data.length, 5)]?.focus();
    }
  };

  const verifyOtps = () => {
    const isEmailValid = emailOtp.join("").length === 6;
    setEmailStatus(isEmailValid ? "success" : "error");

    if (!isEmailValid) {
      setShakeEmail(true);
      setTimeout(() => setShakeEmail(false), 500);
      return;
    }

    otpSubmitHandler({
      emailOtp: emailOtp.join(""),
    });
  };

  const handleResendOtp = async () => {
    if (resendTimer === 0) {
      await resendOtpHandler(payload?.email);
      setResendTimer(60);
      setEmailOtp(new Array(6).fill(""));
      emailRefs.current[0]?.focus();
    }
  };

  const renderOtpGroup = (
    label,
    otpArray,
    setOtpArray,
    refs,
    status,
    shake
  ) => (
    <div>
      <h3 className="text-lg font-medium text-gray-600 text-center">
        {label} - {maskTwoLetters(payload?.email)} OTP
      </h3>
      <div
        className={`flex justify-center gap-3 mt-4 mb-4 ${
          shake ? "animate-shake" : ""
        }`}
      >
        {otpArray.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (refs.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) =>
              handleChange(otpArray, setOtpArray, index, e.target.value, refs)
            }
            onKeyDown={(e) => handleKeyDown(e, otpArray, index, refs)}
            onPaste={(e) => handlePaste(e, setOtpArray, refs)}
            className={`w-14 h-14 sm:w-9 sm:h-9 text-xl text-center font-bold rounded-lg border-2 outline-none transition-all ${
              digit
                ? "border-indigo-500 bg-indigo-100 scale-105"
                : "border-gray-300 bg-gray-100"
            } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300`}
          />
        ))}
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600 text-center mt-2">
          Please enter valid email OTP
        </p>
      )}
    </div>
  );

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
              <LuShield className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Verify Email</h2>
            <p className="text-sm text-gray-500 mt-2">
              Enter OTP to verify your email address
            </p>
          </div>

          {renderOtpGroup(
            "Email",
            emailOtp,
            setEmailOtp,
            emailRefs,
            emailStatus,
            shakeEmail
          )}

          <button
            onClick={verifyOtps}
            className="w-full mt-2 bg-gradient-to-r cursor-pointer from-indigo-600 to-violet-500 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition-transform"
          >
            Verify OTP
          </button>

          <div className="text-center mt-4 text-sm text-gray-600">
            Didn't receive the OTP?{" "}
            {resendTimer > 0 ? (
              <span className="text-indigo-500 font-medium">
                Resend in {resendTimer}s
              </span>
            ) : (
              <button
                onClick={handleResendOtp}
                className="text-indigo-500 font-medium hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerificationPopup;
