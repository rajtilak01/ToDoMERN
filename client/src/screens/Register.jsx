import React, {useState} from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  async function registerHandler(){
    if(password == cpassword){
      const user = {
        name,
        email,
        password,
        cpassword,
      }
      try {
        const result = (await axios.post('/api/users/register',user)).data;
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
            className="rounded-t-md border-b  "
          />
        </div>
        <div className="flex gap-5 items-center"> 
          <label htmlFor="email" className=" text-white m-5">
            Name
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="rounded-t-md border-b  "
          />
        </div>
        <div className="flex gap-5 items-center">
          <label htmlFor="email" className=" text-white m-5">
            Password
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="rounded-t-md border-b  "
          />
        </div>
        <div className="flex gap-5 items-center">
          <label htmlFor="email" className=" text-white m-5">
            Confirm Password
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="rounded-t-md border-b  "
          />
        </div>

        <button onClick={registerHandler} className='btn btn-primary bg-zinc-600 py-2 px-5 rounded-xl'>Sign Up</button>

        <p className="mt-2">Already registered? <a href="/login" className='underline text-blue-300'>Login</a></p>
      </form>
    </div>
  );
};

export default Register
