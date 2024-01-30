import React, { useState } from "react";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  function loginHandler(e) {
    e.preventDefault();
    console.log(email);
    console.log(password)
    // const email = document.getElementById('email').value;
    // const password = document.getElementById('password').value;
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
