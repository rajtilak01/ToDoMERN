import React, {useState} from "react";
import axios from 'axios'
// import { useHistory } from 'react-router-dom';
const Register = () => {
  // const history = useHistory();
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  async function registerHandler(e){
    e.preventDefault()
    if(password == cpassword){
      const user = {
        username : name,
        email,
        password,
      }
      try {
        const result = (await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/register`, user)).data
        // .then((data)=>{
        //   // console.log('Successfully registered!')
        //   res.redirect('/login')
        // })
        // history.push('/login')

        console.log(result);
      } catch (err) {
        console.log(err);
      }
  }
}
  return (
    <div className="h-screen bg-no-repeat w-screen flex items-center justify-center text-white bg-zinc-900">
      <form className="w-screen rounded shadow-md flex-col flex justify-center items-center">
        <div className="flex gap-5 items-center mb-5">
          <label htmlFor="email" className=" text-white">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="rounded-t-md text-black"
            value={email}
            onChange={(e)=>{setemail(e.target.value)}}
          />
        </div>
        <div className="flex gap-5 items-center"> 
          <label htmlFor="email" className=" text-white m-5">
            Name
          </label>
          <input
            id="name"
            type="name"
            placeholder="Enter your name"
            className="rounded-t-md border-b  "
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-5 items-center">
          <label htmlFor="email" className=" text-white m-5">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your Password"
            className="rounded-t-md text-black "
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="flex gap-5 items-center">
          <label htmlFor="email" className=" text-white m-5">
            Confirm Password
          </label>
          <input
            id="cpassword"
            type="password"
            placeholder="Confirm Password"
            className="rounded-t-md text-black "
            value={cpassword}
            onChange={e=> setcpassword(e.target.value)}
          />
        </div>

        <button onClick={registerHandler} className='btn btn-primary bg-zinc-600 py-2 px-5 rounded-xl'>Sign Up</button>

        <p className="mt-2">Already registered? <a href="/" className='underline text-blue-300'>Login</a></p>
      </form>
    </div>
  );
};

export default Register
