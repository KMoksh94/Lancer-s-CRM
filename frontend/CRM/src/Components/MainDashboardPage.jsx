import React, { useEffect, useState } from 'react'
import { MdPeopleAlt } from "react-icons/md";
import { VscProject } from "react-icons/vsc";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import apiCall from '../utilities/axios';

const MainDashboardPage = ({setClientId,setProjectId,setCurrentTab}) => {

  const [recentProjectList,setRecentProjectList] = useState([])
  const [topData,setTopData] = useState({
    clients : 0,
    active : 0,
    overdue : 0,
    amount : 0
  })

  const topSectionDataFetch = async()=>{

  }

  const recentProjectsFetch = async ()=>{
    try {
    const response = await apiCall.get('/projects/recent-projects')
    setRecentProjectList(response.data.projectList)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    recentProjectsFetch()
  },[])

  return (
  <div className='w-full px-15 py-4'>

    <div className='topSection gap-10 flex flex-wrap items-center justify-between'>
      <div className='border border-gray-50 rounded-xl shadow bg-gray-200 min-w-2/12 p-3 flex space-x-5'>
        <div className='text-3xl flex items-center'><MdPeopleAlt /></div>
        <div className='flex flex-col items-center'>
        <span className='text-gray-500 font-semibold'>Total Clients</span>
        <span className='font-semibold text-xl w-full text-left'>12</span></div>
      </div>
      <div className='border border-gray-50 rounded-xl shadow bg-gray-200 min-w-2/12 p-3 flex space-x-5'>
        <div className='text-3xl flex items-center'><VscProject /></div>
        <div className='flex flex-col items-center'>
        <span className='text-gray-500 font-semibold'>Active Projects</span>
        <span className='font-semibold text-xl w-full text-left'>5</span></div>
      </div>
      <div className='border border-gray-50 rounded-xl shadow bg-gray-200 min-w-2/12 p-3 flex space-x-5'>
        <div className='text-3xl flex items-center'><FaExclamationTriangle /></div>
        <div className='flex flex-col items-center'>
        <span className='text-gray-500 font-semibold'>Overdue Payments</span>
        <span className='font-semibold text-xl w-full text-left'>2</span></div>
      </div>
      <div className='border border-gray-50 rounded-xl shadow bg-gray-200 min-w-2/12 p-3 flex space-x-5'>
        <div className='text-3xl flex items-center'><FaRupeeSign /></div>
        <div className='flex flex-col items-center'>
        <span className='text-gray-500 font-semibold'>{`This Month (₹)`}</span>
        <span className='font-semibold text-xl w-full text-left'>45,000</span></div>
      </div>
    </div>

    <div className='recentProjects mt-5 py-3 px-1 bg-gray-200 rounded-xl shadow'>
      <div className='w-full font-semibold text-xl border-b border-b-gray-500'>Recent Projects</div>
      <div className='overflow-x-auto bg-white rounded-lg shadow px-5 py-5 m-5'>
        <table className='w-full border-collapse'>
          <thead className="bg-gray-100">
            <tr>
            <th className="px-4 text-left text-sm font-semibold text-gray-600 border-b">Client</th>
            <th className="px-4 text-left text-sm font-semibold text-gray-600 border-b">Project</th>
            <th className="px-4 text-left text-sm font-semibold text-gray-600 border-b">Status</th>
            <th className="px-4 text-left text-sm font-semibold text-gray-600 border-b">Amount</th>
            <th className="px-4 text-left text-sm font-semibold text-gray-600 border-b">Due Date</th>
            <th className="px-4 text-left text-sm font-semibold text-gray-600 border-b">Payment</th>
          </tr>
          </thead>
          <tbody>
            {recentProjectList?.map(project=>{
              return (
              <tr className="hover:bg-gray-200 transition border-b border-b-gray-300">
                <td
                className="px-4 py-3 text-sm text-gray-800 hover:underline cursor-pointer"
                onClick={()=>{
                  setClientId(project?.clientName?._id)
                  setCurrentTab('Client Details')
                }}
                >{project?.clientName?.name}</td>

                <td
                className="px-4 py-3 text-sm text-gray-800 hover:underline cursor-pointer"
                onClick={()=>{
                  setProjectId(project?._id)
                  setCurrentTab('Project Details')
                }}
                >{project?.name}</td>

                <td
                className={`px-4 py-3 text-sm ${project?.status === 'Active'? 'text-indigo-600': project?.status === 'Complete' ? 'text-green-600' : 'text-red-600'}`}>{project?.status}</td>

                <td className="px-4 py-3 text-sm text-gray-700">₹ {project?.amount /100 || "--"}</td>
                <td
                className="px-4 py-3 text-sm text-gray-700">{new Date(project?.dueDate).toLocaleDateString(('en-GB'),{
                  day : '2-digit',
                  month : 'short',
                  year : 'numeric'
                })}</td>
                <td 
                className={`px-4 py-3 text-sm ${project?.paymentStatus === 'Pending'? 'text-indigo-600': project?.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>{project?.paymentStatus}</td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default MainDashboardPage
