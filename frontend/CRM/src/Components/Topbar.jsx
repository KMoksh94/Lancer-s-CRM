import React from 'react'

const Topbar = ({currentTab,user,setToken}) => {
  return (
    <div className='sticky top-0 w-full h-25 md:h-15 flex flex-col md:flex-row md:items-center md:justify-between px-6 bg-white z-50 space-y-5 md:space-y-0' >
      <div className='font-semibold text-3xl'>{currentTab}</div>
      <div className='right-section flex space-x-8 items-center font-semibold justify-between'>
        <div className='name'>{`${user.firstName} ${user.lastName}`}</div>
        <div className='logout-btn rounded-xl bg-amber-700 text-white hover:bg-amber-800'>
          <button className='w-full px-6 py-2 border'
          onClick={()=>{localStorage.removeItem('token');
             setToken(null)}}
          >Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Topbar
