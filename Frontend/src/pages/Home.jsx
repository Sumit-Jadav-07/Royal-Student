import React, { useState } from "react";
import Login from "../components/common/Login";
import Signup from "../components/common/Signup"; // Assuming you will create this component
import SendOtp from "../components/common/SendOtp";
import ForgotPassword from "../components/common/ForgotPassword";

function Home() {
  const [loading, setLoading] = useState(false); // Manage loader visibility
  const [isLogin, setIsLogin] = useState(true); // Track whether to show Login or Signup
  const [showSendOtpModal, setShowSendOtpModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleOtpSent = () => {
    setIsOtpSent(true);
    setTimeout(() => {
      // After OTP is sent, show the ForgotPassword component
      setShowForgotPasswordModal(true);
    }, 0); // Optional delay before showing ForgotPassword
  };

  return (
    <div className="font-metropolis h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Loader */}
      {loading && !isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <span className="h-7 w-7 loading loading-spinner text-primary"></span>
        </div>
      )}

      {/* Left Section */}
      <div
        className={`h-full w-[50%] flex items-center justify-center p-10 transition-all ease-linear transform duration-500 ${
          isLogin ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        {isLogin ? (
          <Login
            setLoading={setLoading}
            setShowSendOtpModal={setShowSendOtpModal}
          />
        ) : (
          <Signup setLoading={setLoading} />
        )}
      </div>

      {/* Right Section */}
      <div
        className={`h-screen w-[50%] flex justify-center items-center text-white bg-gradient-to-r from-[#00c0ff] to-[#0082fe] flex-col transition-all ease-linear transform duration-500 ${
          isLogin ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        <div className="h-44 flex items-center justify-evenly flex-col text-center p-5 gap-4">
          {isLogin ? (
            <>
              <h1 className="text-3xl font-bold">New Here?</h1>
              <p className="text-base font-medium">
                Signup and discover a great amount of new opportunities!
              </p>
              <button
                onClick={() => setIsLogin(false)} // Switch to Signup
                className="ease-in duration-200 text-center bg-white p-3 mt-5 text-[#0082fe] pl-8 pr-8 rounded-full font-bold text-lg"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold">Already signed up?</h1>
              <p className="text-base font-medium">
                Log in to continue exploring your opportunities!
              </p>
              <button
                onClick={() => setIsLogin(true)} // Switch to Login
                className="ease-in duration-200 text-center bg-white p-3 mt-5 text-[#0082fe] pl-8 pr-8 rounded-full font-bold text-lg"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>

      {/* Show SendOtp Modal */}
      {showSendOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60">
          <SendOtp
            setIsSubmitting={setIsSubmitting}
            onOtpSent={handleOtpSent}
            onClosed={() => setShowSendOtpModal(false)}
          />
        </div>
      )}

      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60">
          <ForgotPassword
            setIsSubmitting={setIsSubmitting}
            onClosed={() => setShowForgotPasswordModal(false)}
          />
        </div>
      )}

      {/* Loader during Submission */}
      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-70">
          <span className="h-7 w-7 loading loading-spinner text-primary"></span>
        </div>
      )}
    </div>
  );
}

export default Home;
