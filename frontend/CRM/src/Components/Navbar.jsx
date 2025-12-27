import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";

const Navbar = ({currentTab,setCurrentTab}) => {

  return (
    <div className='flex flex-col  w-3xs h-screen py-20 bg-gray-200 shadow-xl'>
      <button 
      className={`w-full flex text-start p-4 font-semibold hover:bg-gray-300 hover:cursor-pointer ${currentTab === 'mainDashboard' ? "bg-gray-300" : ''}`}
      onClick={()=> setCurrentTab('Dashboard')}
      ><span className='mx-3 font-semibold text-2xl'><FaHome /></span>Dashboard
      </button>
      <button className={`w-full flex text-start p-4 font-semibold hover:bg-gray-300 hover:cursor-pointer ${currentTab === 'clients' ? "bg-gray-300" : ''}`}
      onClick={()=> setCurrentTab('Clients')}
      ><span className='mx-3 font-semibold text-2xl'><MdPeopleAlt /></span>Clients</button>
      <button className={`w-full flex text-start p-4 font-semibold hover:bg-gray-300 hover:cursor-pointer ${currentTab === 'projects' ? "bg-gray-300" : ''}`}
      onClick={()=> setCurrentTab('Projects')}
      ><span className='mx-3 font-semibold text-2xl'><FaBriefcase /></span>Projects</button>
    </div>
  )
}

export default Navbar
