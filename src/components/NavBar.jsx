import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function NavBar() {
    const currentUser = JSON.parse(localStorage.getItem("user"));

const [loggedIn, setLoggedIn] = useState(currentUser);

const navigate = useNavigate()
const signOut = ()=>{
  localStorage.removeItem("user")
  setLoggedIn(null)
  navigate("/homepage")
}


  return (
    <>
      <div className="navbar bg-white shadow-lg">
        <div className="navbar-start">
          <Link to="/homepage" className="btn btn-ghost text-xl hover:bg-none">
            <img
              src="https://i.ibb.co/4Ygbn67/Poke-Archive.png "
              alt="Poke-Archive"
              className="w-40 object-cover object-center hover:bg-none max-sm:w-32"
            ></img>
          </Link>
        </div>
     {
        currentUser &&    <div className="navbar-end">
        <Link to={"/favorites"}>
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-red-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        </Link>
        <Link to={"/watched"}>
        <button className="btn btn-ghost btn-circle ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-red-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            />
          </svg>
        </button>
        </Link>
        <button className="btnMain text-white p-2 font-extrabold max-sm:text-sm" onClick={signOut}>Sign Out</button>
      </div>
     }
      </div>
    </>
  );
}

export default NavBar;
