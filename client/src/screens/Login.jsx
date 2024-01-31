import React, { useState } from "react";
import { redirect,} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import axios from 'axios'
const Login = () => {
  const history = createBrowserHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  async function loginHandler(e) {
    e.preventDefault();
    const user = {
      email,
      password
    }
    try {
      const result = (await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/login`, user)).data
      console.log(result.token)
      localStorage.setItem("currUser",JSON.stringify(result));
      window.location.href='/todo';
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="h-screen w-screen bg-zinc-900 text-white flex items-center justify-center">
      <form className="w-screen rounded shadow-md flex-col flex justify-center items-center">
        <div className="flex gap-5 items-center mb-5">
          <label htmlFor="email" className="text-white">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="rounded-t-md border-b text-black"
            value={email}
            onChange={(e)=>{
              setemail(e.target.value);
            }}
          />
        </div>

        <div className="flex gap-5 items-center mb-5">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="rounded-t-md border-b ml-6 text-black"
            value={password}
            onChange={(e)=>{
              setpassword(e.target.value);
            }}
          />
        </div>
        <button
          onClick={loginHandler}
          className="btn btn-primary bg-zinc-600 py-2 px-5 rounded-xl"
        >
          {" "}
          Login
        </button>
        <p>
          Not yet registered?{" "}
          <a href="/register" className="underline text-blue-300">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
