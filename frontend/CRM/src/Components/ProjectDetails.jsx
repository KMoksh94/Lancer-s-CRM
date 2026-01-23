import React, { useEffect, useState } from 'react'
import { IoPersonSharp } from "react-icons/io5";
import { FaBarsProgress } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { LuReceiptIndianRupee } from "react-icons/lu";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import apiCall from '../utilities/axios'
import updateStatusRequest from '../utilities/updateStatusRequest';
import deleteProject from '../utilities/deleteProject';
import AddProjectModal from './add-project-modal';

const ProjectDetails = ({projectId,setCurrentTab,setClientId}) => {

  const [projectInfo,setProjectInfo] = useState(null)
  const [editModal,setEditModal] = useState(false)
  const [editedProject,setEditedProject] = useState(false)
  const [updateStatus,setUpdateStatus] = useState({})
  
  
  const getProjectDetails = async(projectId)=> {
     const response = await apiCall.get(`/projects/project-details/${projectId}`)
     setProjectInfo(response.data.project)
    }

  useEffect(()=>{
    const call = async ()=>{
      if(updateStatus?.status || updateStatus?.paymentStatus){
        await updateStatusRequest(projectId,updateStatus)
        await getProjectDetails(projectId)
    }
    }
    call()
  },[updateStatus])

    useEffect(()=>{
      getProjectDetails(projectId)
    },[])

    useEffect(()=>{
      if(!editedProject) return
      getProjectDetails(projectId)
      setEditedProject(false)
    },[editedProject])
  
return (
  <div className='overflow-scroll'>
    {editModal && <AddProjectModal editModal = {editModal} projectInfo = {projectInfo} setEditModal = {setEditModal} setEditedProject = {setEditedProject} />}
      <div className='topSection mt-10 bg-white flex w-full px-10 py-3  justify-between'>
        <div className='flex flex-col flex-1 text-left '>
          <span className='font-bold text-2xl'>{projectInfo?.name}</span>
          <span className='text-gray-600'>{projectInfo?.clientName?.companyName}</span>
        </div>
        <div className=' space-x-5 px-5 flex items-center'>
          <button className='bg-indigo-500 hover:bg-indigo-700 text-white py-1 px-3 rounded shadow-2xl cursor-pointer'
          onClick={()=>setEditModal(true)}>Edit Project</button>
          <button className='bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded shadow-2xl cursor-pointer'
          onClick={async ()=>{
            const confirmation = confirm(`Are you sure? Related Projects will also be deleted!`)
            if(confirmation){
              await deleteProject(projectId)
              setCurrentTab('Projects')
            }
          }}
          >Delete Project</button>
        </div>
      </div>
      {/* Info Section */}
    <div className='infoSection bg-white mt-5 flex flex-wrap px-10 space-y-3'>
      <div className='w-full font-semibold text-gray-700 border-b border-b-gray-300'>
        <span className='my-3 flex items-center space-x-3 '>
        <span className='text-2xl'><IoPersonSharp /></span>
        Client : <span className='px-3 cursor-pointer hover:underline'
        onClick={()=>{setClientId(projectInfo?.clientName?._id)
          setCurrentTab('Client Details')
        }}>{projectInfo?.clientName?.name}</span>
        </span>
      </div>
      <div className='w-full font-semibold text-gray-700 border-b border-b-gray-300'>
        <span className='my-3 flex items-center space-x-3 '>
          <span className='text-2xl'><FaBarsProgress /></span>
          Status : <span className={`px-3 ${projectInfo?.status === 'Active'? 'text-indigo-600': projectInfo?.status === 'Complete' ? 'text-green-600' : 'text-red-600'}`}>{projectInfo?.status}</span>
        </span>
      </div>
      <div className='w-full font-semibold text-gray-700 border-b border-b-gray-300'>
        <span className='my-3 flex items-center space-x-3 '>
          <span className='text-2xl'><HiMiniCalendarDateRange /></span>
          Due Date : <span className='px-3' >
            {new Date(projectInfo?.dueDate).toLocaleDateString(("en-GB"),{
              day : '2-digit',
              month : 'short',
              year : 'numeric'
            })}
          </span>
        </span>
      </div>
      <div className='w-full flex font-semibold text-gray-700 border-b border-b-gray-300'>
        <span className=' mb-3 pe-2 flex-1 border-r border-r-gray-300 flex items-center space-x-3'>
          <span className='text-2xl'><MdPayments /></span>
          <span className='space-x-1'>
            <span>Payment Status : </span>
            <span className={`px-3 ${projectInfo?.paymentStatus === 'Pending'? 'text-indigo-600': projectInfo?.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>{projectInfo?.paymentStatus}</span></span>
        </span>
        <span className='mb-3 ps-2 flex-1 flex items-center space-x-3'>
        <span className='text-2xl'><HiMiniCalendarDateRange /></span>
        <span className='space-x-1'>
          <span>Payment Date : </span>
          <span>{
          projectInfo?.paymentDate ? new Date(projectInfo?.paymentDate).toLocaleDateString(('en-GB'),{
            day : '2-digit',
            month : 'short',
            year : 'numeric'
          }) : '--'}</span></span>
        </span>
      </div>
      <div className='w-full font-semibold text-gray-700 border-b border-b-gray-300'>
        <span className='my-3 flex items-center space-x-3 '>
        <span className='text-2xl'><LuReceiptIndianRupee /></span>
        Amount : <span className='px-3'>₹ {Intl.NumberFormat('en-IN').format(projectInfo?.amount /100)}</span>
        </span>
      </div>
      <div className='w-full font-semibold text-gray-700 border-b border-b-gray-300'>
        <span className='my-3 flex items-center space-x-3 '>
        <span className='text-2xl'><MdOutlineSpeakerNotes /></span>
        Description : <span className='px-3'>{projectInfo?.description}</span>
        </span>
      </div>
    </div>

    {/* Actions */}
    <div className='bg-white mt-5 flex flex-wrap px-10 py-3 space-y-3'>
      <div className={`w-full font-semibold text-xl border-b border-b-gray-500 ${(projectInfo?.paymentStatus === 'Paid' && projectInfo?.status === 'Complete') ? 'hidden' : ''}`}>
        Actions</div>
      <div className='flex space-x-5 text-white'>
        <button className={`bg-green-600 hover:bg-green-700 cursor-pointer px-3 py-2 rounded font-semibold ${projectInfo?.paymentStatus === 'Paid' ? 'hidden' : ''}`}
        onClick={async ()=>{
          setUpdateStatus({paymentStatus:'Paid',paymentDate : new Date()})
        }}
        >Mark as Paid</button>
      <button className={`bg-indigo-600 hover:bg-indigo-700 cursor-pointer px-3 py-2 rounded font-semibold ${projectInfo?.status === 'Complete' ? 'hidden' : ''}`}
      onClick={async ()=>{
        setUpdateStatus({status : 'Complete'})
      }}>
        Mark Complete</button>
      </div>
    </div>
    </div>
)
}

export default ProjectDetails
