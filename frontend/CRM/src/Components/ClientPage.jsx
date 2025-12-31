import React from 'react'
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useState } from 'react';
import AddModal from './add-modal';
import { useEffect } from 'react';
import apiCall from '../utilities/axios';
import deleteClient from '../utilities/deleteClient';

const ClientPage = ({setCurrentTab,setClientId}) => {
  const [openModal,setOpenModal] = useState(false)
  const [clientList,setClientList] = useState([])
  const [newClientCreated,setNewClientCreated] = useState(false)
  const [clientDeleted,setClientDeleted] = useState(false)
  const fetchClients = async ()=> {
    try {
    const response = await apiCall.get('/clients/all-clients')
    console.log(response.data.clients);
    setClientList(response.data.clients)  
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=> {
    fetchClients()
  },[])

  useEffect(()=>{
    if(!clientDeleted)return
    fetchClients()
    setClientDeleted(false)
  },[clientDeleted])

  useEffect(()=>{
    if(!newClientCreated)return
    fetchClients()
    setNewClientCreated(false)
  },[newClientCreated])

  return (
    <div>
      {openModal && <AddModal setOpenModal={setOpenModal} setNewClientCreated={setNewClientCreated}/>}
      <div className=' w-full flex px-10 py-3 justify-between'>
        <div className='border border-gray-300 bg-white shadow-2xl flex space-x-2 px-2 py-1 rounded'>
          <label htmlFor="searchClient" className='text-2xl text-blue-800'><IoSearch /></label>
          <input
          className='outline-none' 
          type="text"
          name='searchClient'
          id='searchClient'
          placeholder='Search Clients...' />
        </div>
        <button
         className='px-4 flex items-center rounded bg-indigo-500 text-white hover:cursor-pointer hover:bg-indigo-600'
         onClick={()=>setOpenModal(true)}
         ><span className='pe-2'><FaPlus /></span> Add New Client</button>
      </div>
        <div className="w-full px-10 py-5">
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className='hidden'>_id</th>
                <th className='hidden'>user</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Email
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 border-b">
                  Active Projects
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                  Created At
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 border-b">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              <tr className="hover:bg-gray-200 transition border-b border-b-gray-300">
                <td className="px-4 py-3 text-sm text-gray-800 hover:underline cursor-pointer">
                  John Smith
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  Acme Corp
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  john@acme.com
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <span className="px-2 py-1 text-xs font-medium rounded bg-indigo-100 text-indigo-600">
                    3
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  12 Sep 2025
                </td>
                <td className="px-4 py-3 text-center space-x-1">
                  <button className=" bg-indigo-600 text-white rounded py-1 px-3 text-sm cursor-pointer hover:bg-indigo-700">
                    View
                  </button>
                  <button className="bg-red-600 text-white rounded py-1 px-3 text-sm cursor-pointer hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
              {clientList.map(client=>{
                return (<tr className="hover:bg-gray-200 transition border-b border-b-gray-300">
                  <td className='hidden'>{client?._id}</td>
                  <td className='hidden'>{client?.user}</td>
                <td 
                onClick={()=> {
                  setCurrentTab('Client Details')
                  setClientId(client?._id)
                }}
                className="px-4 py-3 text-sm text-gray-800 hover:underline cursor-pointer">
                  {client?.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {client?.companyName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {client?.email}
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <span className="px-2 py-1 text-xs font-medium rounded bg-indigo-100 text-indigo-600">
                    3
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(client?.createdAt).toLocaleDateString('en-GB',{
                    day : "2-digit",
                    month : 'short',
                    year : 'numeric'
                  })}
                </td>
                <td className="px-4 py-3 text-center space-x-1">
                  <button className=" bg-indigo-600 text-white rounded py-1 px-3 text-sm cursor-pointer hover:bg-indigo-700"
                  onClick={()=> {
                  setCurrentTab('Client Details')
                  setClientId(client?._id)
                }}
                  >
                    View
                  </button>
                  <button className="bg-red-600 text-white rounded py-1 px-3 text-sm cursor-pointer hover:bg-red-700"
                  onClick={async ()=>{
                    const confirmation = confirm(`Are you sure? Related Projects will also be deleted!`)
                    if(confirmation){
                      await deleteClient(client?._id)
                      setClientDeleted(true)
                    }
                  }}
                  >
                    Delete
                  </button>
                </td>
              </tr>)
              })}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}

export default ClientPage
