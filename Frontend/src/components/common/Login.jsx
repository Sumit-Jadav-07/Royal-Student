import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import axios from "axios";

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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const classes = useStyles();

  // Function to validate email format
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailPattern.test(email)) return "Invalid email format";
    return "";
  };

  // Function to validate password strength
  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  // Function to handle login request
  const handleLogin = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      try {
        const response = await axios.post(
          "http://localhost:1218/api/public/session/login",
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert(response.data.message);
      } catch (error) {
        console.error("There was an error!", error.response || error.message);
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="font-metropolis h-auto w-[475px] bg-white p-7 flex flex-col rounded-md shadow-lg shadow-indigo-500/40">
      <div className="w-full">
        <h1 className="text-3xl font-bold">Login</h1>
      </div>

      <div className="mt-6 space-y-4">
        {/* Email input field */}
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

        {/* Password input field */}
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

      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="ease-in duration-200 text-center bg-[#00c6ff] rounded-md p-3 mt-5 text-[#ffffff] hover:bg-[#0082fe] shadow-sm shadow-slate-200"
      >
        Login
      </button>

      {/* Forgot Password Link */}
      <div className="flex items-center tracking-wide mt-4">
        <p className="text-lg">Forgot Password?</p>
        <a
          className="text-[#00c0ff] hover:text-[#0082fe] text-lg ml-2"
          href="#"
        >
          Click here
        </a>
      </div>
    </div>
  );
}

export default Login;
