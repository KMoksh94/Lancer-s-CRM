import React from 'react'
import { useState } from 'react';
import apiCall from '../utilities/axios';


const AddModal = ({setOpenModal,setNewClientCreated}) => {
  const [newClientData,setNewClientData] = useState(
    {
      name : '',
      companyName : '',
      email : '',
      notes : ''
    }
  )
  const handleChange = (e) => {
    setNewClientData({...newClientData,[e.target.name] : e.target.value})
  }
  const handleSubmit = async ()=> {
    try {
      const response = await apiCall.post('/clients/add-client',newClientData)
      alert(response.data.response)
    } catch (error) {
      console.log(error);
    }finally{
      setNewClientCreated(true)
    }
  }
  return (
    <div>
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    
    {/* Modal box */}
    <div
      className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6"
      onClick={(e) => e.stopPropagation()} // 👈 prevents backdrop click close
    >
      <h2 className="text-xl font-semibold mb-4 pb-1 border-b">Add New Client</h2>

      <div className="space-y-6 mb-10">
  
  {/* Name */}
  <div className="flex flex-col gap-1">
    <label htmlFor="name" className="text-sm font-semibold text-gray-700">
      Name
    </label>
    <input
      type="text"
      name="name"
      id="name"
      onChange={(e)=> {handleChange(e)}}
      required
      className="rounded-md border border-gray-300 px-3 py-2 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500
                 focus:border-indigo-500"
    />
  </div>

  {/* Company Name */}
  <div className="flex flex-col gap-1">
    <label htmlFor="companyName" className="text-sm font-semibold text-gray-700">
      Company Name
    </label>
    <input
      type="text"
      name="companyName"
      id="companyName"
      onChange={(e)=> {handleChange(e)}}
      required
      className="rounded-md border border-gray-300 px-3 py-2
                 focus:outline-none focus:ring-2 focus:ring-indigo-500
                 focus:border-indigo-500"
    />
  </div>

  {/* Email */}
  <div className="flex flex-col gap-1">
    <label htmlFor="email" className="text-sm font-semibold text-gray-700">
      Email
    </label>
    <input
      type="email"
      name="email"
      id="email"
      onChange={(e)=> {handleChange(e)}}
      required
      className="rounded-md border border-gray-300 px-3 py-2
                 focus:outline-none focus:ring-2 focus:ring-indigo-500
                 focus:border-indigo-500"
    />
  </div>

  {/* Notes */}
  <div className="flex flex-col gap-1">
    <label htmlFor="notes" className="text-sm font-semibold text-gray-700">
      Special Notes
    </label>
    <textarea
      name="notes"
      id="notes"
      rows="3"
      onChange={(e)=> {handleChange(e)}}
      className="rounded-md border border-gray-300 px-3 py-2 resize-none
                 focus:outline-none focus:ring-2 focus:ring-indigo-500
                 focus:border-indigo-500"
    />
  </div>

</div>


      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={() => {
            handleSubmit();
            setOpenModal(false);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
    </div>
  )
}

export default AddModal
