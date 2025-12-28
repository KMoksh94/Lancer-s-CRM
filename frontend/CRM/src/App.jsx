import { useState,useEffect } from 'react'
import './App.css'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard'
import Loader from './Components/loader'

function App() {
  const navigate = useNavigate()
  const [token,setToken] = useState(null)
  const [loading,setLoading] = useState(true)

  useEffect(()=> {
    const t= localStorage.getItem('token')
    setToken(t || null)
    setLoading(false)
  },[])

  if(loading) return <Loader/>

  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to={token ? '/dashboard' :"/auth" } replace />}/>
      <Route path='/auth' element = {token ? <Navigate to ="/dashboard" replace/>: <Auth setToken={setToken} />}></Route>
      <Route path='/dashboard' element = {token ? <Dashboard token={token} setToken={setToken}/> : <Navigate to ="/auth" replace/>}></Route>
    </Routes>      
    </>
  )
}

export default App
