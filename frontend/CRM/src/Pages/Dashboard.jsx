import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../Components/Navbar'
import Topbar from '../Components/Topbar'
import Loader from '../Components/Loader'
import apiCall from '../utilities/axios'
import ClientPage from '../Components/ClientPage'
import MainDashboardPage from '../Components/MainDashboardPage'
import ProjetcsPage from '../Components/ProjetcsPage'
import ClientDetails from '../Components/ClientDetails'
import ProjectDetails from '../Components/ProjectDetails'
import { useIsMobile } from '../utilities/useIsMobile'
const Dashboard = ({token,setToken}) => {
  const [currentTab,setCurrentTab] = useState('Dashboard')
  const [user,setUser] = useState(null)
  const [loadingUser,setLoadingUser] = useState(true)
  const [clientId,setClientId] = useState(null)
  const [projectId,setProjectId] = useState(null)
  const [collapse,setCollapse] = useState(false)
  const isMobile = useIsMobile()

  useEffect(()=>{
     const fetchUser = async() => { 
     try {
      const response = await apiCall.get('user/getUser')
      setUser(response.data.response)
      
     } catch (error) {
      console.log(error);
     } finally {
      setLoadingUser(false)
     }}
     fetchUser()
  },[token])
 
  useEffect(()=>{
    console.log(isMobile);
    if(!isMobile) return
    const handleScroll = ()=>setCollapse(true)
    window.addEventListener('scroll',handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  },[isMobile,collapse])

  return (
    <>
    {loadingUser ? <Loader></Loader> : 
    <div className='bg-gray-100 flex flex-col md:flex-row'>
      <Navbar currentTab = {currentTab} setCurrentTab = {setCurrentTab} collapse={collapse} setCollapse={setCollapse} isMobile={isMobile}></Navbar>
      <div className='w-full flex flex-col'
      onScroll={()=>{setCollapse(false)}}>
      <Topbar currentTab={currentTab} user={user} setUser={setUser} setToken={setToken}></Topbar>
      <div className='w-full'>
        {currentTab === 'Clients' && <ClientPage setCurrentTab={setCurrentTab} setClientId={setClientId} />}
        {currentTab === 'Dashboard' && <MainDashboardPage setProjectId={setProjectId} setCurrentTab={setCurrentTab} setClientId={setClientId}/>}
        {currentTab === 'Projects' && <ProjetcsPage setCurrentTab={setCurrentTab} setProjectId={setProjectId}/>}
        {currentTab === 'Client Details' && <ClientDetails clientId={clientId} setCurrentTab={setCurrentTab} setProjectId={setProjectId}/>}
        {currentTab === 'Project Details' && <ProjectDetails projectId = {projectId} setCurrentTab={setCurrentTab} setClientId={setClientId}/>}
      </div>
      </div>
    </div>
    }
    </>
  )
}

export default Dashboard
