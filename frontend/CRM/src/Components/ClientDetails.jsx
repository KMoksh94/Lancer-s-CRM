import React from 'react'
import { MdEmail } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import { useState } from 'react';
import { useEffect } from 'react';
import apiCall from '../utilities/axios';

const ClientDetails = ({clientId}) => {
  const [clientInfo,setClientInfo] = useState({})

  const getClientDetails = async (clientId)=> {
    try {
    const response = await apiCall.get(`/clients/client-details/${clientId}`)
    setClientInfo(response.data.client)
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(()=>{
    getClientDetails(clientId)
  },[clientId])
  return (
    <div>
      <div className='topSection'>
        <div>
          <span>{clientInfo.name}</span>
          <span>{clientInfo.companyName}</span>
        </div>
        <div>
          <button>Edit Client</button>
          <button>Delete Client</button>
        </div>
      </div>
      <div className='infoSection'>
        <div><span><MdEmail /></span>Email : <span>{clientInfo.email}</span></div>
        <div><span><FaBriefcase /></span>{clientInfo.companyName}</div>
      </div>
    </div>
  )
}

export default ClientDetails
