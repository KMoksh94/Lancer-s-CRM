import React from 'react'
import { useState } from 'react'
import apiCall from '../utilities/axios'
import { useEffect } from 'react'

const AddProjectModal = ({setOpenAddModal, setNewProjectCreated,
   editModal,projectInfo, setEditModal,setEditedProject}) => {
  const [paymentStatus,setPaymentStatus] = useState('Pending')
  const [status,setStatus] = useState('Active')
  const [newProjectData,setNewProjectData] = useState({
    name : '',
    paymentStatus : paymentStatus,
    status : status,
    dueDate : '',
    amount : 0,
    clientName : '',
    description : '',
    paymentDate : ''
  })

  const [editProjectData,setEditProjectData] = useState({})

  useEffect(()=>{
    editModal ? setPaymentStatus(projectInfo?.paymentStatus) : ''
    editModal ? setStatus(projectInfo?.status) : ''

    if (projectInfo != undefined)
    setEditProjectData({
      name: projectInfo.name || '',
      status: projectInfo.status || 'Active',
      paymentStatus: projectInfo.paymentStatus || 'Pending',
      dueDate: projectInfo.dueDate
        ? new Date(projectInfo.dueDate).toISOString().split('T')[0]
        : '',
      amount: projectInfo.amount || 0,
      clientName: projectInfo.clientName || '',
      description: projectInfo.description || '',
      paymentDate: projectInfo.paymentDate
        ? new Date(projectInfo.paymentDate).toISOString().split('T')[0]
        : ''
    })
    
    
  },[editModal,projectInfo])
  
  
  const [clientOptions,setClientOptions] = useState([])
  const handleChange= (e) => {
    !editModal ?
    setNewProjectData({...newProjectData,[e.target.name] : e.target.value}) :
    setEditProjectData({...editProjectData,[e.target.name] : e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    // data utha raha hai saara bas ab api lagani hai
    try {
      if(!editModal){
        const response = await apiCall.post('/projects/add-project',newProjectData)
      setNewProjectCreated(true)
      alert(response.data.response)
      }else if(editModal){
        const response = await apiCall.post(`/projects/edit-project/${projectInfo?._id}`,editProjectData)
        setEditedProject(true)
        alert(response.data.response)
      }
    } catch (error) {
      console.log(error);
      alert(`Error Occured. Kindly retry.`)
    }
  }

  const getClientOptions = async()=>{
    try {
      const response = await apiCall.get('/clients/all-clients')
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
  <div className="w-xl bg-white rounded-2xl shadow-xl p-5  h-[80vh] flex flex-col">

<div className="sticky top-0 z-10 bg-white px-5 py-1 border-b">
    <h2 className="text-xl font-semibold text-gray-800">
      {!editModal ? "Add New Project" : "Edit Project"}
    </h2>
</div>
  
  <div className='p-5 space-y-4 overflow-scroll'>
    {/* Project Name */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Project Name *
      </label>
      <input
        type="text"
        name='name'
        id='name'
        value={editModal ? editProjectData?.name : newProjectData?.name}
        required
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter project name"
        onChange={(e)=> handleChange(e)}
      />
    </div>

    {/* Client Dropdown */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Client *
      </label>
      <select className="w-full border rounded-lg px-3 py-2" 
      onChange={(e)=>handleChange(e)} name='clientName'
      value={!editModal ? newProjectData?.clientName : editProjectData?.clientName?._id}>
        <option value="">--Select Client--</option>
        {clientOptions.length > 0 ? clientOptions.map(client=>{return(
          <option key={client._id} value={client._id}>{client.name}</option>
        )}): ''} 
      </select>
    </div>

    {/* Due Date */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Due Date *
      </label>
      <input
        type="date"
        name='dueDate'
        id='dueDate'
        value={editModal ? editProjectData?.dueDate : newProjectData?.dueDate}
        required
        className="w-full border rounded-lg px-3 py-2"
        onChange={(e)=>handleChange(e)}
      />
    </div>

    {/* Amount */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Amount (₹) *
      </label>
      <input
        type="number"
        name='amount'
        id='amount'
        value={editModal ? editProjectData?.amount/100 : newProjectData?.amount/100}
        required
        className="w-full border rounded-lg px-3 py-2"
        placeholder="Enter amount"
        onChange={(e)=>
          !editModal ? 
          setNewProjectData(newProjectData =>({...newProjectData,amount : Number(e.target.value)*100})): 
          setEditProjectData(editProjectData=>({...editProjectData,amount : Number(e.target.value)*100}))
        }
      />
      <p className="text-xs text-gray-500 mt-1">
        ₹1,23,456
      </p>
    </div>

    {/* Status */}
     <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Status
      </label>
      <div className="flex gap-3">
        <button className={`px-4 py-2 rounded-lg border hover:bg-indigo-100  ${status === 'Active' ? "bg-indigo-100 text-indigo-700" : 'bg-white'} hover:bg-indigo-100 hover:text-indigo-700`}
        onClick={()=>{setStatus('Active')
          !editModal ?
          setNewProjectData(newProjectData=>({...newProjectData,status : 'Active'})) :
          setEditProjectData(editProjectData=>({...editProjectData,status : 'Active'}))
        }}>
          Active
        </button>
        <button className={`px-4 py-2 rounded-lg border ${status === 'Complete' ? "bg-green-100 text-green-700" : 'bg-white'} hover:bg-green-100 hover:text-green-700`}
        onClick={()=>{setStatus('Complete')
          !editModal ?
          setNewProjectData(newProjectData=>({...newProjectData,status : 'Complete'})) :
          setEditProjectData(editProjectData=>({...editProjectData,status : 'Complete'}))
        }}>
          Complete
        </button>
        <button className={`px-4 py-2 rounded-lg border ${status === 'Overdue' ? "bg-red-100 text-red-700" : 'bg-white'} hover:bg-red-100 hover:text-red-700`}
        onClick={()=>{setStatus('Overdue')
          !editModal ?
          setNewProjectData(newProjectData=>({...newProjectData,status : 'Overdue'})) : 
          setEditProjectData(editProjectData=>({...editProjectData,status : 'Overdue'}))
        }}>
          Overdue
        </button>
      </div>
    </div>

    {/* Payment Status */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Payment Status
      </label>
      <div className="flex gap-3">
        <button className={`px-4 py-2 rounded-lg border hover:bg-indigo-100  ${paymentStatus === 'Pending' ? "bg-indigo-100 text-indigo-700" : 'bg-white'} hover:bg-indigo-100 hover:text-indigo-700`}
        onClick={()=>{setPaymentStatus('Pending')
          !editModal ?
          setNewProjectData(newProjectData=>({...newProjectData,paymentStatus : 'Pending', paymentDate : ''})) :
          setEditProjectData(editProjectData=>({...editProjectData,paymentStatus : 'Pending', paymentDate : ''}))
        }}>
          Pending
        </button>
        <button className={`px-4 py-2 rounded-lg border ${paymentStatus === 'Paid' ? "bg-green-100 text-green-700" : 'bg-white'} hover:bg-green-100 hover:text-green-700`}
        onClick={()=>{setPaymentStatus('Paid')
          !editModal ?
          setNewProjectData(newProjectData=>({...newProjectData,paymentStatus : 'Paid', paymentDate : new Date().toISOString()})) :
          setEditProjectData(editProjectData=>({...editProjectData,paymentStatus : 'Paid', paymentDate : new Date().toISOString()}))
        }}>
          Paid
        </button>
        <button className={`px-4 py-2 rounded-lg border ${paymentStatus === 'Overdue' ? "bg-red-100 text-red-700" : 'bg-white'} hover:bg-red-100 hover:text-red-700`}
        onClick={()=>{setPaymentStatus('Overdue')
          !editModal ?
          setNewProjectData(newProjectData=>({...newProjectData,paymentStatus : 'Overdue', paymentDate : ''})) : 
          setEditProjectData(editProjectData=>({...editProjectData,paymentStatus : 'Overdue', paymentDate : ''}))
        }}>
          Overdue
        </button>
      </div>
    </div>

    {/* Description */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Description (optional)
      </label>
      <textarea
        rows="3"
        name='description'
        id='description'
        value={editModal ? editProjectData?.description : newProjectData?.description}
        className="w-full border rounded-lg px-3 py-2"
        placeholder="Additional notes"
        onChange={(e)=>handleChange(e)}
      />
    </div>

    {/* Actions */}
    <div className="flex justify-end gap-3 pt-4">
      <button className="px-4 py-2 rounded-lg border hover:bg-gray-100"
      onClick={()=>{
        editModal ? setEditModal(false) : setOpenAddModal(false) }}>
        Cancel
      </button>
      <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
      onClick={async (e)=>{
        if(!editModal){
          if(newProjectData.name==='' || newProjectData.dueDate === '' || newProjectData.amount === 0) return alert(`Kindly fill all the required fields!`)
        }
        await handleSubmit(e)
        editModal ? setEditModal(false) : setOpenAddModal(false)
      }}>
        {editModal ? "Edit Project" : "Add Project"}
      </button>
    </div>

  </div>
  </div>
</div>

  )
}

export default AddProjectModal
