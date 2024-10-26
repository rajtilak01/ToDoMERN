import React, { useState } from "react";
import { createBrowserHistory } from "history";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";

const Login = () => {
  const history = createBrowserHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function loginHandler(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      setLoading(true);
      const result = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/login`,
        user
      );
      setLoading(false);
      localStorage.setItem("currUser", JSON.stringify(result.data));
      window.location.href = "/todo";
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  }

  return (
    <>
      <div className="h-screen w-screen bg-zinc-900 text-white flex flex-col items-center justify-center">
        {/* <div className="h-1/5">
        </div> */}
        {/* {!error && !loading && ( */}
        <form className="w-screen h-4/5 rounded shadow-md flex-col flex justify-center items-center">
          {loading && <Loader />}
          {error && <Error />}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={loginHandler}
            className="btn btn-primary bg-zinc-600 py-2 px-5 rounded-xl"
          >
            Login
          </button>
          <p>
            Not yet registered?{" "}
            <a href="/register" className="underline text-blue-300">
              Sign Up
            </a>
          </p>
        </form>
        {/* )} */}
      </div>
    </>
  );
};

export default Login;
