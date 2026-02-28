import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";

const Navbar = ({currentTab,setCurrentTab,collapse,setCollapse, isMobile}) => {

  return (
    <>
    <div className={`sticky top-0 left-0 flex flex-col  ${collapse ? 'md:w-15 h-15' : 'md:w-3xs h-60'} w-full transition-all ease-in-out duration-100 md:duration-500 md:h-screen bg-gray-200 shadow-xl`}>
      <div className='py-4 px-7 cursor-pointer font-bold text-2xl'
      onClick={()=>{setCollapse(!collapse)}}>
        ☰</div>


      <div className='md:py-15'>
      <button 
      className={`w-full flex text-start p-4 font-semibold hover:bg-gray-300 hover:cursor-pointer
      ${collapse ? 'hidden' : ''} transition-all ease-in-out duration-100 md:duration-500 overflow-hidden
      ${currentTab === 'Dashboard' ? "bg-gray-300 border-r-2 border-r-indigo-600" : ''}`}
      onClick={()=> {
        setCurrentTab('Dashboard')
        if(!isMobile) return
        setCollapse(true)}}
      ><span className='mx-3 font-semibold text-2xl'><FaHome /></span>Dashboard
      </button>
      <button className={`w-full flex text-start p-4 font-semibold hover:bg-gray-300 hover:cursor-pointer 
      ${collapse ? 'hidden' : ''} transition-all ease-in-out duration-100 md:duration-500
      ${currentTab === 'Clients' ? "bg-gray-300 border-r-2 border-r-indigo-600" : ''}`}
      onClick={()=> {
        setCurrentTab('Clients')
        if(!isMobile) return
        setCollapse(true)}}
      ><span className='mx-3 font-semibold text-2xl'><MdPeopleAlt /></span>Clients</button>
      <button className={`w-full flex text-start p-4 font-semibold hover:bg-gray-300 hover:cursor-pointer 
      ${collapse ? 'hidden' : ''} transition-all ease-in-out duration-100 md:duration-500
      ${currentTab === 'Projects' ? "bg-gray-300 border-r-2 border-r-indigo-600" : ''}`}
      onClick={()=>{
        setCurrentTab('Projects')
        if(!isMobile) return
        setCollapse(true)}}
      ><span className='mx-3 font-semibold text-2xl'><FaBriefcase /></span>Projects</button>
      </div>
    </div>
    </>
  )
}

export default Navbar
