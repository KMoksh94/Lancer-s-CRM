import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import { AiFillProject } from "react-icons/ai";
import { LuReceiptIndianRupee } from "react-icons/lu";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { useState } from 'react';
import { useEffect } from 'react';
import apiCall from '../utilities/axios';
import EditModal from './edit-modal';
import deleteClient from '../utilities/deleteClient';

const ClientDetails = ({clientId,setCurrentTab}) => {
  const [clientInfo,setClientInfo] = useState({})
  const [editModal,setEditModal] = useState(false)
  const [editedClient,setEditedClient] = useState(false)

  const getClientDetails = async (clientId)=> {
    try {
    const response = await apiCall.get(`/clients/client-details/${clientId}`)
    setClientInfo(response.data.client)
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(()=>{
    try {
    getClientDetails(clientId)
    if(!editedClient)return
    setEditedClient(false)
    } catch (error) {
      console.log(error);
    }
  },[clientId,editedClient])

  return (
    <div className='overflow-scroll'>
    {editModal && <EditModal setEditModal={setEditModal} setEditedClient={setEditedClient} clientId={clientId} clientInfo = {clientInfo}/>}
      <div className='topSection mt-10 bg-white flex w-full px-10 py-3  justify-between'>
        <div className='flex flex-col flex-1 text-left '>
          <span className='font-bold text-2xl'>{clientInfo?.name}</span>
          <span className='text-gray-600'>{clientInfo.companyName}</span>
        </div>
        <div className=' space-x-5 px-5 flex items-center'>
          <button className='bg-indigo-500 hover:bg-indigo-700 text-white py-1 px-3 rounded shadow-2xl cursor-pointer'
          onClick={()=>setEditModal(true)}>Edit Client</button>
          <button className='bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded shadow-2xl cursor-pointer'
          onClick={async ()=>{
            const confirmation = confirm(`Are you sure? Related Projects will also be deleted!`)
            if(confirmation){
              await deleteClient(clientId)
              setCurrentTab('Clients')
            }
          }}
          >Delete Client</button>
        </div>
      </div>
      {/* Info Section */}
    <div className='infoSection bg-white mt-5 flex flex-wrap px-10 space-y-3'>
        <div className='w-full font-semibold text-gray-700 border-b border-b-gray-300'>
          <span className='my-3 flex items-center space-x-3 '>
            <span className='text-2xl'><MdEmail /></span>Email : <span className='px-3'>{clientInfo?.email}</span>
            </span>
            </div>
        <div className='w-full font-semibold text-gray-700 border-b border-b-gray-300'>
          <span className='mb-3 flex items-center space-x-3'>
          <span className='text-2xl'><FaBriefcase /></span><span className=''>{clientInfo?.companyName}</span>
          </span></div>
          <div className='w-xl max-w-full flex font-semibold text-gray-700 border-b border-b-gray-300'>
            <span className=' mb-3 pe-2 flex-1 border-r border-r-gray-300 flex items-center space-x-3'>
              <span className='text-2xl'><AiFillProject /></span>
              <span className='space-x-1'>
                <span>{clientInfo?.projectList?.length}</span><span>Projects</span></span>
            </span>
            <span className='mb-3 ps-2 flex-1 flex items-center space-x-3'>
            <span className='text-2xl'><LuReceiptIndianRupee /></span>
            <span className='space-x-1'>
              <span>{clientInfo?.amount}</span>
              <span>Billed</span></span>
            </span>
          </div>
           <div className='w-full font-semibold text-gray-700'>
          <span className='mb-3 flex items-center space-x-3'>
          <span className='text-2xl'><MdOutlineSpeakerNotes /></span><span className=''>
            <span>Notes :</span>
            <span className='px-3 font-normal'>{clientInfo?.notes}</span>
            </span>
          </span></div>
      </div>
    </div>
  )
}

export default ClientDetails
