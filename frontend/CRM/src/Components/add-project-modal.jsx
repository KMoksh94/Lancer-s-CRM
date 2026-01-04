import React from 'react'
import { useState } from 'react'
import apiCall from '../utilities/axios'
import { useEffect } from 'react'

const AddProjectModal = ({setOpenAddModal, setNewProjectCreated}) => {
  const [paymentStatus,setPaymentStatus] = useState('Pending')
  const [newProjectData,setNewProjectData] = useState({
    name : '',
    paymentStatus : paymentStatus,
    dueDate : '',
    amount : 0,
    clientName : '',
    description : '',
    paymentDate : ''
  })
  const [clientOptions,setClientOptions] = useState([])
  const handleChange= (e) => {
    setNewProjectData({...newProjectData,[e.target.name] : e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log(newProjectData);
    // data utha raha hai saara bas ab api lagani hai
    try {
      const response = await apiCall.post('/projects/add-project',newProjectData)
      console.log(response);
      setNewProjectCreated(true)
      alert(response.data.response)
    } catch (error) {
      console.log(error);
      alert(`Error Occured. Kindly retry.`)
    }
  }

  const getClientOptions = async()=>{
    try {
      const response = await apiCall.get('/clients/all-clients')
      console.log(response);
      const clientNames = response.data.clients.map(client =>({_id : client._id,name:client.name}))
      setClientOptions(clientNames)
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getClientOptions()
  },[])


  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <div className="w-xl bg-white rounded-2xl shadow-xl p-5 space-y-4">

    <h2 className="text-xl font-semibold text-gray-800">
      Add New Project
    </h2>

    {/* Project Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Project Name *
      </label>
      <input
        type="text"
        name='name'
        id='name'
        required
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter project name"
        onChange={(e)=> handleChange(e)}
      />
    </div>

    {/* Client Dropdown */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Client *
      </label>
      <select className="w-full border rounded-lg px-3 py-2" 
      onChange={(e)=>handleChange(e)} name='clientName'>
        {clientOptions.length > 0 ? clientOptions.map(client=>{return(
          <option key={client._id} value={client._id}>{client.name}</option>
        )}): ''} 
      </select>
    </div>

    {/* Due Date */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Due Date *
      </label>
      <input
        type="date"
        name='dueDate'
        id='dueDate'
        required
        className="w-full border rounded-lg px-3 py-2"
        onChange={(e)=>handleChange(e)}
      />
    </div>

    {/* Amount */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Amount (₹) *
      </label>
      <input
        type="number"
        name='amount'
        id='amount'
        required
        className="w-full border rounded-lg px-3 py-2"
        placeholder="Enter amount"
        onChange={(e)=>setNewProjectData(newProjectData =>({...newProjectData,amount : Number(e.target.value)*100}))}
      />
      <p className="text-xs text-gray-500 mt-1">
        ₹1,23,456
      </p>
    </div>

    {/* Status */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Status
      </label>
      <div className="flex gap-3">
        <button className={`px-4 py-2 rounded-lg border hover:bg-indigo-100  ${paymentStatus === 'Pending' ? "bg-indigo-100 text-indigo-700" : 'bg-white'} hover:bg-indigo-100 hover:text-indigo-700`}
        onClick={()=>{setPaymentStatus('Pending')
          setNewProjectData(newProjectData=>({...newProjectData,paymentStatus : 'Pending', paymentDate : ''}))
        }}>
          Pending
        </button>
        <button className={`px-4 py-2 rounded-lg border ${paymentStatus === 'Paid' ? "bg-green-100 text-green-700" : 'bg-white'} hover:bg-green-100 hover:text-green-700`}
        onClick={()=>{setPaymentStatus('Paid')
          setNewProjectData(newProjectData=>({...newProjectData,paymentStatus : 'Paid', paymentDate : new Date().toISOString()}))
        }}>
          Paid
        </button>
        <button className={`px-4 py-2 rounded-lg border ${paymentStatus === 'Overdue' ? "bg-red-100 text-red-700" : 'bg-white'} hover:bg-red-100 hover:text-red-700`}
        onClick={()=>{setPaymentStatus('Overdue')
          setNewProjectData(newProjectData=>({...newProjectData,paymentStatus : 'Overdue', paymentDate : ''}))
        }}>
          Overdue
        </button>
      </div>
    </div>

    {/* Description */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Description (optional)
      </label>
      <textarea
        rows="3"
        name='description'
        id='description'
        className="w-full border rounded-lg px-3 py-2"
        placeholder="Additional notes"
        onChange={(e)=>handleChange(e)}
      />
    </div>

    {/* Actions */}
    <div className="flex justify-end gap-3 pt-4">
      <button className="px-4 py-2 rounded-lg border hover:bg-gray-100"
      onClick={()=>{setOpenAddModal(false)}}>
        Cancel
      </button>
      <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
      onClick={async (e)=>{
        if(newProjectData.name==='' || newProjectData.dueDate === '' || newProjectData.amount === 0) return alert(`Kindly fill all the required fields!`)
          console.log(newProjectData);
        // await handleSubmit(e)
        // setOpenAddModal(false)
      }}>
        Add Project
      </button>
    </div>

  </div>
</div>

  )
}

export default AddProjectModal
