import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import apiCall from '../utilities/axios';

const ForgotPassword = ({resetPass,setResetPass}) => {
  const {token} = useParams()
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await apiCall.post(`/user/reset-password/${token}`,{password})
    navigate('/auth')
    alert(response.data.response)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-gray-100 to-gray-200">
        <div className="top-section">
          <div className="max-w-3xs">
            <img src="/assets/logo-removebg-preview.png" alt="logo" />
          </div>
          <div className="text-sm font-semibold text-gray-500 text-center mt-1 mb-6">
            {resetPass ? 'Reset Password' : ''}
          </div>
        </div>
        <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-8">

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="font-semibold">
                Password :
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="New Password Here .."
                onChange={(e)=> setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              onClick={(e)=>handleSubmit(e)}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default ForgotPassword
