import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Message from "../common/Message.jsx";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
      fontFamily: "Metropolis, sans-serif",
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: "green",
      },
      fontFamily: "Metropolis, sans-serif",
    },
  },
  errorText: {
    color: "red",
    fontSize: "0.875rem",
    marginTop: "0.5rem",
  },
}));

function Signup({ setLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [fullname, setFullname] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [visible, setVisible] = useState(false);
  const classes = useStyles();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailPattern.test(email)) return "Invalid email format";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  const validateFullname = (fullname) => {
    if (!fullname) return "Full name is required";
    const nameParts = fullname.trim().split(" ");
    if (nameParts.length < 2)
      return "Full name must include both first and last name";
    return "";
  };

  const validateMobile = (mobile) => {
    const mobilePattern = /^\d{10}$/; // Example: 10-digit mobile number
    if (!mobile) return "Mobile number is required";
    if (!mobilePattern.test(mobile))
      return "Invalid mobile number format. It must be 10 digits.";
    return "";
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const mobileError = validateMobile(mobile);
    const fullNameError = validateFullname(fullname);

    setErrors({
      email: emailError,
      password: passwordError,
      mobile: mobileError,
      fullname: fullNameError,
    });

    if (!emailError && !passwordError && !mobileError && !fullNameError) {
      setLoading(true); // Show loader
      try {
        const response = await axios.post(
          "http://localhost:1218/api/public/session/signup",
          { email, password, mobile, fullname },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 && response.data.token) {
          setIsError(false);
          setMessage(response.data.message); // Success message
        } else if (response.data.error) {
          setIsError(true);
          setMessage(response.data.error); // Error message from backend
        }

        setVisible(true); // Show message
      } catch (error) {
        console.error("There was an error!", error.response || error.message);
        setIsError(true);
        setMessage("Login failed. Please try again.");
        setVisible(true); // Show error message
      } finally {
        setLoading(false); // Hide loader
      }
    }
  };

  const handleCloseMessage = () => {
    setVisible(false);
  };

  return (
    <div className="relative font-metropolis h-auto w-[475px] bg-white p-7 flex flex-col rounded-md shadow-lg shadow-indigo-500/40">
      
      <Message
        message={message}
        isError={isError}
        isVisible={visible}
        onClose={handleCloseMessage}
      />

      <div className="w-full">
        <h1 className="text-3xl font-bold">Signup</h1>
      </div>

      <div className="mt-6 space-y-4">
        <TextField
          fullWidth
          id="outlined-basic"
          label="Fullname"
          variant="outlined"
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className={classes.root}
          error={Boolean(errors.fullname)}
        />
        {errors.fullname && (
          <span className={classes.errorText}>{errors.fullname}</span>
        )}

        <TextField
          fullWidth
          id="outlined-basic"
          label="Mobile number"
          variant="outlined"
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className={classes.root}
          error={Boolean(errors.mobile)}
        />
        {errors.mobile && (
          <span className={classes.errorText}>{errors.mobile}</span>
        )}

        <TextField
          fullWidth
          id="outlined-email"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.root}
          error={Boolean(errors.email)}
        />
        {errors.email && (
          <span className={classes.errorText}>{errors.email}</span>
        )}

        <TextField
          fullWidth
          id="outlined-password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classes.root}
          error={Boolean(errors.password)}
        />
        {errors.password && (
          <span className={classes.errorText}>{errors.password}</span>
        )}
      </div>

      <button
        onClick={handleSignup}
        className="ease-in duration-200 text-center bg-[#00c6ff] rounded-md p-3 mt-5 text-[#ffffff] hover:bg-[#0082fe] shadow-sm shadow-slate-200"
      >
        Signup
      </button>

      {/* <div className="flex items-center tracking-wide mt-4">
        <p className="text-lg">Forgot Password?</p>
        <a
          className="text-[#00c0ff] hover:text-[#0082fe] text-lg ml-2"
          href="#"
        >
          Click here
        </a>
      </div> */}
    </div>
  );
}

export default Signup;
