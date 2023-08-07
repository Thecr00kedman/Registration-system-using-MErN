import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import {useCookies} from "react-cookie"
import { loginUser } from "../api";
import { toast } from "react-toastify";

export default function Signup() {
    const[cookies, setCookies]= useCookies(['access_token'])
    const navigate= useNavigate();
  const [formValues, setFromValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFromValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit =async(e)=>{
    const response = await loginUser(formValues)
    console.log(formValues)
    if(response){
        if(response.data.error){
            toast.error(response.data.error)
        }
        else if(response.data.warning){
            toast.warn(response.data.warning)
        }
        else{
           toast.success(response.data.success)
           setCookies("access_token", response.data.token)
           localStorage.setItem("userID",response.data.userID)
           localStorage.setItem("email",response.data.email)
           navigate('/home')
        }
    }
    else{
        toast.error('something went wrong')
    }

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
        <h3>Login</h3>
        <div className="card-body d-flex flex-column">
          

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
          <button className="btn btn-secondary mb-3" onClick={handleSubmit}>Login</button>
          {/* navigate to login */}
          <p>
            New here?
            <Link to="/" className="text-decoration-none">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
