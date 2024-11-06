import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
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
}));

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(
        "http://localhost:1218/api/public/session/signup",
        {
          email,
          password,
        }
      );
      alert(response.data); // Show success message
    } catch (error) {
      console.error("There was an error signing up!", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="font-metropolis h-auto w-[475px] bg-white p-7 flex flex-col rounded-md shadow-lg shadow-indigo-500/40">
      <div className=" w-full">
        <h1 className="text-3xl">Login</h1>
      </div>

      <div className="mt-6 space-y-4">
        <TextField
          fullWidth
          id="outlined-email"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.root}
        />

        <TextField
          fullWidth
          id="outlined-fullname"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classes.root}
        />
      </div>

      <button
        onClick={handleSignup}
        className="ease-in duration-200 text-center bg-[#e23745d7] rounded-md p-3 mt-5 text-[#ffffff] hover:bg-[#E23744]"
      >
        Create Account
      </button>

      <div className="relative flex items-center justify-center my-6">
        <div className="absolute px-2 bg-white text-gray-500">Or</div>
        <div className="w-full border-b-2 border-gray-300"></div>
      </div>

      <div className="w-full border-b-2 border-gray-300 mt-6"></div>

      <div className="flex item-center tracking-wide mt-4">
        <p className="text-lg">Already have an account ?</p>
        <a className="text-[#e03546] text-lg ml-2" href="#">
          Log in
        </a>
      </div>
    </div>
  );
}

export default Signup;
