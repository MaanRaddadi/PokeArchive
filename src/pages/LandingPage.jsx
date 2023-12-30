import React from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LandingPage() {
  const [userInfo, setUserInfo] = useState({});
  const [errors, setErrors] = useState({});
  const navigator = useNavigate();
const handelInput  = (e)=>{
  
  if(!e.target.value.trim()){
    setErrors({...errors,[e.target.name]:"Cannot Be Empty"})
  } else {
    setUserInfo({...userInfo, [e.target.name]:e.target.value})
  }
}


const auth = (e) => {
  e.preventDefault()   

  try{
    axios.get("https://655895c4e93ca47020a97c19.mockapi.io/users").then((res)=>{
      res.data.find((user)=>{
       
        if(user.userInfo.email === userInfo.email && user.userInfo.password === userInfo.password){
         localStorage.setItem("user",JSON.stringify(user))
         navigator("/")

        } else {

          setErrors({
            ...errors,
            auth:"Invalid Email or Password"
          })
        }
      })
    })
  } catch(err){
    console.log(err)
  }
}



  return (
    <>
      <NavBar></NavBar>
      <div className=" hero min-h-screen bg-[url('https://wallpaperset.com/w/full/7/2/4/187210.jpg')] max-sm:p-2 relative">
        <div className="bg-white opacity-40 absolute top-0 left-0 w-full max-sm:hidden h-full"></div>
        <div className="hero-content flex-col lg:flex-row-reverse max-sm:p-0 ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-black border-b-2 border-black">
              Welcom To Poke Archive
            </h1>
          </div>

          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white ">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered bg-white"
                  required
                  onChange={handelInput}
                  name="email"
                />
                <small className="text-red-600">{errors.email}</small>
              </div>
              <div className="form-control">
                <label className="label ">
                  <span className="label-text text-black">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered bg-white"
                  required
                  onChange={handelInput}
                  name="password"
                />
                <small className="text-red-600">{errors.password}</small>
              </div>
              <small>
                Don't have an account?{" "}
                <Link to="/signUp">
                  <span className="text-gray-500">Sign Up</span>
                </Link>
              </small>
              <small className="text-red-600">{errors.auth}</small>
              <div className="form-control mt-6">
                <button className=" btnMain text-white p-2" onClick={auth}>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
