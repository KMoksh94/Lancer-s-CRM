import React from 'react'

const Topbar = ({currentTab,user,setUpdateToken}) => {
  return (
    <div className='w-full h-15 flex items-center justify-between px-6 bg-white' >
      <div className='font-semibold text-3xl'>{currentTab}</div>
      <div className='right-section flex space-x-8 items-center font-semibold'>
        <div className='name'>{`${user.firstName} ${user.lastName}`}</div>
        <div className='logout-btn px-6 py-2 rounded-xl bg-amber-700 text-white hover:bg-amber-800'>
          <button
          onClick={()=>{localStorage.setItem('token','');
             setUpdateToken('')}}
          >Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Topbar
