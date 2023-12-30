import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function SignUp() {
    const [userInfo, setUserInfo] = useState({});
    const [errors, setErrors] = useState({});
const navigate = useNavigate();

    const checkUsername = (e) => {
        if (e.target.value.length < 4) {
          setErrors({
            ...errors,
            username: "Username must be at least 4 characters long",
          });
          return;
        } else {
          setErrors({
            ...errors,
            username: "",
          });
          setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
          });
        }
      };
    
      const checkPassword = (e) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (e.target.value.length < 6) {
          setErrors({
            ...errors,
            password: "Password must be at least 6 characters long",
          });
          return;
        } else if (!passwordRegex.test(e.target.value)) {
          setErrors({
            ...errors,
            password: "Password must contain at least one letter and one number",
          });
          return;
        } else {
          setErrors({
            ...errors,
            password: "",
          });
          setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
          });
        }
     
      };
    const checkEmail = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(e.target.value)) {
          setErrors({
            ...errors,
            email: "Invalid email address",
          });
          return;
        } else {
          setErrors({
            ...errors,
            email: "",
          });
          setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
          });
        }
      };
    

    const createUser = (e) => {
        e.preventDefault()  
        if(Object.values(userInfo).length === 3){
            try{
                axios.post('https://655895c4e93ca47020a97c19.mockapi.io/users',{
                    userInfo,
                    favorites:[],
                watched:[]}).then((res)=>{
                    console.log("User Created Successfully")
                    navigate('/homepage')
                })
            }
            catch(err){
            console.log(err)
        }
        } else{
            return 
        }
    }


  return (
    <>
    <div className='w-full bg-white flex justify-center items-center h-screen'>

   
<div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white ">
      <form className="card-body">
      <div className="form-control">
          <label className="label ">
            <span className="label-text text-lg text-black">Username</span>
          </label>
          <input onChange={checkUsername} type="text" placeholder="username" name='username' className="input input-bordered bg-white" required />
          <small className='text-red-600'>{errors.username}</small>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg text-black">Email</span>
          </label>
          <input onChange={checkEmail} type="email" placeholder="email" name='email' className="input input-bordered bg-white" required />
          <small className='text-red-600'>{errors.email}</small>
        </div>
        <div className="form-control">
          <label className="label ">
            <span className="label-text text-lg text-black">Password</span>
          </label>
          <input onChange={checkPassword} type="password" placeholder="password" name='password' className="input input-bordered bg-white" required />
         <small className='text-red-600'>{errors.password}</small>
        </div>
        <small className='text-md'>Already have an account? <Link to="/homepage"><span className='text-gray-500 text-md'>Login</span></Link></small>
        <div className="form-control mt-6">
          <button className=" btnMain text-white p-2"  onClick={createUser}>Sign Up</button>
        </div>
      </form>
    </div>
    </div>

    </>
  )
}

export default SignUp