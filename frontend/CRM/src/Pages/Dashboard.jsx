import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../Components/Navbar'
import Topbar from '../Components/Topbar'
import apiCall from '../utilities/axios'
const Dashboard = ({token,setToken}) => {
  const [currentTab,setCurrentTab] = useState('Dashboard')
  const [user,setUser] = useState({})
  const [updateToken,setUpdateToken] = useState(token)
  
  useEffect(()=> setToken(updateToken) ,[updateToken])
  useEffect(()=>{
     const fetchUser = async() => { 
     try {
      const response = await apiCall.get('user/getUser')
      console.log(`This is the response`, response.data.response);
      setUser(response.data.response)
     } catch (error) {
      console.log(error);
     }}
     fetchUser()
  },[])
 
  return (
    <div className='bg-gray-100 flex'>
      <Navbar currentTab = {currentTab} setCurrentTab = {setCurrentTab}></Navbar>
      <Topbar currentTab={currentTab} user={user} setUser={setUser} setUpdateToken={setUpdateToken}></Topbar>
    </div>
  )
}

export default Dashboard
