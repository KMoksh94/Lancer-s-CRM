import React from 'react'
import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import apiCall from '../utilities/axios';
import { useEffect } from 'react';
import AddProjectModal from './add-project-modal';

const ProjetcsPage = () => {
  const [userProjectList,setUserProjectList] = useState([])
  const [openAddModal,setOpenAddModal] = useState(false)

  const [clientOptions,setClientOptions] = useState([])
  const getClientOptions = async()=>{
    try {
      const response = await apiCall.get('/clients/all-clients')
      const clientNames = response.data.clients.map(client =>({_id : client._id,name:client.name}))
      setClientOptions(...clientNames)
      console.log(clientOptions);
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getClientOptions()
  },[])
  
  const getUserProjectList = async ()=> {
    try {
      const response = await apiCall.get('/projects/all-projects')
      console.log(response.data)
      setUserProjectList(response.data.projectList)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getUserProjectList()
  },[])

  return (
    <div>
      {openAddModal && <AddProjectModal setOpenAddModal={setOpenAddModal}/>}
      <div className='topSection w-full py-3 px-10 flex'>
        <div className='options flex flex-1 items-center space-x-6'>
         <div className='filter border border-gray-300 rounded px-2 py-1 bg-gray-200'>
          <span className='pe-1 text-gray-500'>Filter By Status : </span>
          <select name="filter" id="filter" className='font-semibold'>
            <option value="none">None</option>
            <option value="Paid">Paid</option>
            <option value="Active">Active</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
        <div className='sort border border-gray-300 rounded px-2 py-1 bg-gray-200'>
          <span className='pe-1 text-gray-500'>Sort By : </span>
          <select name="sort" id="sort" className='font-semibold'>
            <option value="dueDate">Due Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
      </div>
        <div className='buttons flex items-center ps-5'>
        <button className='add-new flex items-center rounded px-2 py-1 bg-indigo-500 text-white hover:bg-indigo-700 cursor-pointer'
        onClick={()=>{setOpenAddModal(true)}}>
          <span className='pe-1'><FaPlus/></span>
          <span>Add New Project</span>
          </button>
        </div>
      </div>
      <div className="w-full px-10 py-5">
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
          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 border-b">
            Status
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
            Due Date
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
            Amount
          </th>
          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 border-b">
            Actions
          </th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        <tr className="hover:bg-gray-50 transition">

          {/* Hidden values (still accessible in data) */}
          <td className="hidden">PRJ_001</td>
          <td className="hidden">USER_123</td>

          <td className="px-4 py-3 text-sm font-medium text-gray-800">
            Website Redesign
          </td>
          <td className="px-4 py-3 text-sm text-gray-700">
            John Smith
          </td>
          <td className="px-4 py-3 text-sm text-gray-700">
            Acme Corp
          </td>
          <td className="px-4 py-3 text-sm text-center">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-600">
              Overdue
            </span>
          </td>
          <td className="px-4 py-3 text-sm text-gray-600">
            25 Sep 2025
          </td>
          <td className="px-4 py-3 text-sm text-gray-800 font-medium">
            ₹15,000
          </td>
          <td className="px-4 py-3 text-sm text-center space-x-3">
            <button className=" bg-indigo-600 text-white rounded py-1 px-3 text-sm cursor-pointer hover:bg-indigo-700">
              View
            </button>
            <button className=" bg-green-600 text-white rounded py-1 px-3 text-sm cursor-pointer hover:bg-green-700">
              Mark Paid
            </button>
          </td>
        </tr>
        {userProjectList.map(project=>{
          return (
             <tr className="hover:bg-gray-50 transition">

          <td className="hidden">{project?._id}</td>
          <td className="hidden">{project?.user}</td>

          <td className="px-4 py-3 text-sm font-medium text-gray-800">
            {project?.name}
          </td>
          <td className="px-4 py-3 text-sm text-gray-700">
            {project?.clientName?.name}
          </td>
          <td className="px-4 py-3 text-sm text-gray-700">
            {project?.clientName?.companyName}
          </td>
          <td className="px-4 py-3 text-sm text-center">
            <span className={`px-2 py-1 rounded text-xs font-semibold
            ${project?.status === 'Active' ? 'bg-indigo-100 text-indigo-600' : 
            project.status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {project?.status}
            </span>
          </td>
          <td className="px-4 py-3 text-sm text-gray-600">
            {new Date(project?.dueDate).toLocaleDateString('en-GB',{
              day : '2-digit', month : 'short', year : 'numeric'
            })}
          </td>
          <td className="px-4 py-3 text-sm text-gray-800 font-medium">
            ₹{new Intl.NumberFormat("en-IN").format(project?.amount/100)}
          </td>
          <td className="px-4 py-3 text-sm text-center space-x-3">
            <button className=" bg-indigo-600 text-white rounded py-1 px-3 text-sm cursor-pointer hover:bg-indigo-700">
              View
            </button>
            <button className=" bg-green-600 text-white rounded py-1 px-3 text-sm cursor-pointer hover:bg-green-700">
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
