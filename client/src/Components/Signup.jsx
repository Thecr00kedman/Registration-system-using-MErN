import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignupUser } from "../api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useCookies } from "react-cookie";


export default function Signup() {
    const [cookies,setCookies]=useCookies(['access_token'])
    const navigate = useNavigate();
  const [formValues, setFromValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(()=>{

    if(cookies.access_token){

        navigate('/Home')
    }
    else{
        navigate('/')
    }

  },[])
  const handleChange = (e) => {
    setFromValues({ ...formValues, [e.target.name]: e.target.value });
  };

//   writing code for error handeling while submission
  const handleSubmit =async (e)=>
  {
    const response = await SignupUser(formValues)
   
    if(response)
    { 
        if(response.data.error){
        toast.error(response.data.error)
    }
    else if(response.data.warning){
        toast.warn(response.data.warning)
        
    }
    else{
        toast.success(response.data.success)
        navigate('/login')
    }
}
 else{
    toast.error('something went wrong')
 } 
 //   writing code for error handeling while submission

  };
  return (
    <div
      id="signup"
      className="d-flex justify-content-center align-items-center"
    >
      <div
        className="card px-3 py-2"
        style={{ maxWidth: "600px", width: "80%" }}
      >
        <h3>Sign up</h3>
        <div className="card-body d-flex flex-column">
          <div className="input-group mb-3">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="form-control"
              placeholder="name"
              aria-label="Name"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="form-control"
              placeholder="email"
              aria-label="Email"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="form-control"
              placeholder="password"
              aria-label="Password"
              aria-describedby="basic-addon1"
            />
          </div>
          <button className="btn btn-primary mb-3" onClick={handleSubmit}>Sign up</button>
          {/* navigate to login */}
          <p>
            Already a member
            <Link to={"/login"} className="text-decoration-none">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
