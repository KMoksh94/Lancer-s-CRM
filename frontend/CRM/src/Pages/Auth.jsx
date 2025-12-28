import React from "react";
import { useState } from "react";
import apiCall from "../utilities/axios";
import { useNavigate } from "react-router-dom";

const Auth = ({setToken}) => {
  const navigate = useNavigate()
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
    const response = await apiCall.post(`user/${mode === 'login'? 'login' : 'signup'}`,formData) 
      console.log(response.data.token);
      localStorage.setItem("token",response.data.token)
      setToken(response.data.token)
      alert(response.data.response);
      if(localStorage.getItem('token') !== ''){
        navigate('/dashboard')
      }else {
        navigate('/auth')
      }
    } catch (error) {
      console.log(error);
      setFormData({
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      })
      alert(`Failed to ${mode === 'login' ? 'login' : 'signup'}. ${error}`)
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-gray-100 to-gray-200">
        <div className="top-section">
          <div className="max-w-3xs">
            <img src="/assets/logo-removebg-preview.png" alt="logo" />
          </div>
          {/* <div className='text-2xl font-semibold text-center'>Lancer's CRM</div> */}
          <div className="text-sm font-semibold text-gray-500 text-center mt-1 mb-6">
            {mode === "login"
              ? "Sign In to your Account"
              : "Create New Account"}
          </div>
        </div>
        <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-8">
          {/* Tabs here */}
          <div className="flex mb-6 border-b">
            <button
              className={`flex-1 pb-2 text-sm font-medium ${
                mode === "login"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-400"
              }`}
              onClick={() => setMode("login")}
            >
              Log In
            </button>
            <button
              className={`flex-1 pb-2 text-sm font-medium ${
                mode === "signup"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-400"
              }`}
              onClick={() => setMode("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div>
                  <label htmlFor="firstName" className="font-semibold">
                    First Name :
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    placeholder="First Name Here .."
                    onChange={(e)=> handleChange(e)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="font-semibold">
                    Last Name :
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    placeholder="Last Name Here .."
                    onChange={(e)=> handleChange(e)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="font-semibold">
                    Email :
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    placeholder="Email Here .."
                    onChange={(e)=> handleChange(e)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="userName" className="font-semibold">
                Username :
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={formData.userName}
                placeholder="Username Here .."
                onChange={(e)=> handleChange(e)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="font-semibold">
                Password :
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                placeholder="********"
                onChange={(e)=> handleChange(e)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="flex w-full justify-end text-xs text-indigo-600 mt-3">
                <span className="text-indigo-600 hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              {mode === "login" ? "Log In" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
