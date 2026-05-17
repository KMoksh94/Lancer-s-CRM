import React, { useState } from 'react'
import apiCall from '../utilities/axios'

const ForgotPassModal = ({resetPass, setResetPass}) => {
 
  const [email,setEmail] = useState('')
  const [loading,setLoading] = useState(false)
  const handleSubmit = async (e)=>{
  e.preventDefault()
  const response = await apiCall.post('user/forgotPassword',{email})
  console.log(response);
  alert(response.data.response)
  setLoading(false)
 }
 
 
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 space-y-4">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Forgot Password
          </h2>
          <button
            onClick={() => setResetPass(false)}
            className="text-gray-400 hover:text-gray-600 text-xl hover:cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              placeholder="Enter your registered email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            onClick={(e)=>{handleSubmit(e)
              setLoading(true)
            }}
          >{!loading ?"Send Reset Link" : 'Sent'}
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default ForgotPassModal
