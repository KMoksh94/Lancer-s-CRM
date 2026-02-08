import React from 'react'
import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import apiCall from '../utilities/axios';
import { useEffect } from 'react';
import AddProjectModal from './add-project-modal';
import updateStatusRequest from '../utilities/updateStatusRequest';

const ProjetcsPage = ({setProjectId,setCurrentTab}) => {
  const [userProjectList,setUserProjectList] = useState([])
  const [openAddModal,setOpenAddModal] = useState(false)
  const [newProjectCreated,setNewProjectCreated] = useState(false)
  const [statusUpdated,setStatusUpdated] = useState(false)
  const [filteredList,setFilteredList] = useState([])
  const getUserProjectList = async ()=> {
    try {
      const response = await apiCall.get('/projects/all-projects')
      setUserProjectList(response.data.projectList)
      setFilteredList(response.data.projectList)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getUserProjectList()
  },[])

  useEffect(()=>{
    if(!newProjectCreated)return
    getUserProjectList()
    setNewProjectCreated(false)
  },[newProjectCreated])

  useEffect(()=>{
    if(!statusUpdated)return
    getUserProjectList()
    setStatusUpdated(false)
  },[statusUpdated])

  return (
    <div>
      {openAddModal && <AddProjectModal setOpenAddModal={setOpenAddModal} setNewProjectCreated={setNewProjectCreated}/>}
      <div className='topSection w-full py-3 px-10 flex-col space-y-2 md:space-y-0 md:flex'>
        <div className='options flex flex-col md:flex-row space-y-3 md:space-y-0 flex-1 items-center space-x-6'>
         <div className='filter border border-gray-300 rounded px-2 py-1 bg-gray-200 -mx-6 md:mx-0 w-full md:w-60 flex justify-between'>
          <span className='pe-1 text-gray-500'>Filter By Status : </span>
          <select name="filter" id="filter" className='font-semibold'
          onChange={(e)=>{
            setFilteredList(userProjectList.filter(project=>{
              if(e.target.value === ''){
                return true
              }else{
               return project?.status === e.target.value 
              }}))
          }}>
            <option value="">None</option>
            <option value="Complete">Complete</option>
            <option value="Active">Active</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
        <div className='sort border border-gray-300 rounded -mx-6 md:ms-3 px-2 py-1 bg-gray-200 flex w-full md:w-60 justify-between'>
          <span className='pe-1 text-gray-500'>Sort By : </span>
          <select name="sort" id="sort" className='font-semibold'
          onChange={(e)=>{
            setFilteredList([...filteredList].sort((a,b)=>{
              if(e.target.value === 'dueDate'){
                return new Date(a?.dueDate) - new Date(b?.dueDate)
              }else if(e.target.value === 'amount'){
                return a?.amount - b?.amount
              }
            }))
          }}>
            <option value="dueDate">Due Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
      </div>
        <div className='buttons flex flex-1 justify-end items-center ps-5'>
        <button className='add-new flex items-center rounded px-2 py-1 bg-indigo-500 text-white hover:bg-indigo-700 cursor-pointer'
        onClick={()=>{setOpenAddModal(true)}}>
          <span className='pe-1'><FaPlus/></span>
          <span>Add New Project</span>
          </button>
        </div>
      </div>
      <div className="w-full px-5 sm:px-10 py-5">
  <div className="overflow-x-auto bg-white rounded-lg shadow">
    <table className="w-full border-collapse">

      {/* Table Head */}
      <thead className="bg-gray-100">
        <tr>
          {/* Hidden columns */}
          <th className="hidden">ProjectId</th>
          <th className="hidden">User</th>

          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
            Project Name
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
            Client
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
            Company
          </th>
          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 border-b hidden md:table-cell">
            Status
          </th>
          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 border-b hidden md:table-cell">
            Payment
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b hidden md:table-cell">
            Due Date
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b hidden md:table-cell">
            Amount
          </th>
          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 border-b hidden lg:table-cell">
            Actions
          </th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {filteredList?.map(project=>{
          return (
             <tr className="hover:bg-gray-200 transition">

          <td className="hidden">{project?._id}</td>
          <td className="hidden">{project?.user}</td>

          <td className="px-4 py-3 text-sm font-medium text-gray-800 cursor-pointer hover:underline"
          onClick={()=>{
            setCurrentTab('Project Details')
            setProjectId(project?._id)
          }}>
            {project?.name}
          </td>
          <td className="px-4 py-3 text-sm text-gray-700">
            {project?.clientName?.name}
          </td>
          <td className="px-4 py-3 text-sm text-gray-700">
            {project?.clientName?.companyName}
          </td>
          <td className="px-4 py-3 text-sm text-center hidden md:table-cell">
            <span className={`px-2 py-1 rounded text-xs font-semibold
            ${project?.status === 'Active' ? 'bg-indigo-100 text-indigo-600' : 
            project.status === 'Complete' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {project?.status}
            </span>
          </td>
          <td className="px-4 py-3 text-sm text-center hidden md:table-cell">
            <span className={`px-2 py-1 rounded text-xs font-semibold
            ${project?.paymentStatus === 'Pending' ? 'bg-indigo-100 text-indigo-600' : 
            project.paymentStatus === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {project?.paymentStatus}
            </span>
          </td>
          <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
            {new Date(project?.dueDate).toLocaleDateString('en-GB',{
              day : '2-digit', month : 'short', year : 'numeric'
            })}
          </td>
          <td className="px-4 py-3 text-sm text-gray-800 font-medium hidden md:table-cell">
            ₹{new Intl.NumberFormat("en-IN").format(project?.amount/100)}
          </td>
          <td className="px-4 py-3 text-sm lg:flex justify-end space-x-3 hidden">
            <button className={`bg-indigo-600 text-white rounded py-1 px-3 text-sm cursor-pointer hover:bg-indigo-700
            ${project?.paymentStatus === 'Paid' ? 'me-24.5' : ''}`}
            onClick={()=>{
            setCurrentTab('Project Details')
            setProjectId(project?._id)
            }}>
              View
            </button>
            <button className={` bg-green-600 text-white rounded py-1 px-3 text-sm cursor-pointer hover:bg-green-700 ${project?.paymentStatus === 'Paid' ? 'hidden' : ''}`}
            onClick={async ()=>{
              await updateStatusRequest(project?._id,{paymentStatus : "Paid",paymentDate : new Date()})
              setStatusUpdated(true)
            }}
            >
              Mark Paid
            </button>
          </td>
        </tr>
          )
        })}
      </tbody>

    </table>
  </div>
</div>
    </div>
  )
}

export default ProjetcsPage
