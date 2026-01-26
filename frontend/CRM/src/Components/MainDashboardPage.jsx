import React, { useEffect, useState } from 'react'
import { MdPeopleAlt } from "react-icons/md";
import { VscProject } from "react-icons/vsc";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import apiCall from '../utilities/axios';
import SimpleBarChart from './barChart';
import StatusPieChart from './PieChart';

const MainDashboardPage = ({setClientId,setProjectId,setCurrentTab}) => {

  const [recentProjectList,setRecentProjectList] = useState([])
  const [chartData, setChartData] = useState([])
  const [topData,setTopData] = useState({
    clients : 0,
    active : 0,
    overdue : 0,
    amount : 0
  })
  const [pieChartData,setPieChartData] = useState([])

  const topSectionDataFetch = async()=>{
    const response = await apiCall.get(`/projects/top-data`)
    response.data.response = undefined
    setTopData(response.data)
  }

  const getMonthsList = (months)=>{
    const monthOrder = []
    const today = new Date()
    for(let i = months-1; i >=0; i--){
      const d = new Date(today.getFullYear(),today.getMonth()-i,1)

      monthOrder.push({
      key: `${d.getFullYear()}-${d.getMonth()}`, // unique
      label: d.toLocaleString('default', { month: 'short', year : '2-digit' })
    })
    }
    return monthOrder
  }
  
  const barChartDataFetch = async(months)=>{
    const response = await apiCall.get(`/projects/dashboard-charts-data/bar/${months}`)
    const data = response.data.projects
    const monthOrder = getMonthsList(months)
    const monthMap = {}
    monthOrder.forEach(m=>{
      monthMap[m.key] ={
        month : m.label,
        Amount : 0
      }
    })
    const monthBasedAmt = []
    data.forEach(project=>{
      if(!project.paymentDate) return
      const d = new Date(project.paymentDate)
      const key = `${d.getFullYear()}-${d.getMonth()}`

      if(monthMap[key]){
        monthMap[key].Amount += project.amount/100
      }
    })
      setChartData(Object.values(monthMap))
  }


  const pieChartDataFetch = async(months)=>{
    const response = await apiCall.get(`/projects/dashboard-charts-data/pie/${months}`)
    const data = response.data.projects
    const statusData = {
      active : {
        name : "Active",
        Quantity : 0
      },
      overdue : {
        name : 'Overdue',
        Quantity : 0
      },
      completed : {
        name : "Complete",
        Quantity : 0
      }
    }
    data.forEach(project=>{
      if(!project.status) return
      const statusVal = project?.status === 'Active' ? "active" : project?.status === 'Overdue' ? "overdue" : "completed"
      statusData[statusVal].Quantity++
    })
    setPieChartData(Object.values(statusData))
  }

  const recentProjectsFetch = async ()=>{
    try {
    const response = await apiCall.get('/projects/recent-projects')
    setRecentProjectList(response.data.projectList)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    recentProjectsFetch()
    topSectionDataFetch()
    barChartDataFetch("6")
    pieChartDataFetch("6")
  },[])

  return (
  <div className='w-full px-5 md:px-15 py-4'>

    <div className='topSection gap-10 flex flex-wrap items-center justify-between'>
      <div className='border border-gray-50 rounded-xl shadow bg-gray-200 min-w-2/12 p-3 flex space-x-5'>
        <div className='text-3xl flex items-center'><MdPeopleAlt /></div>
        <div className='flex flex-col items-center'>
        <span className='text-gray-500 font-semibold'>Total Clients</span>
        <span className='font-semibold text-xl w-full text-left'>{topData.clients}</span></div>
      </div>
      <div className='border border-gray-50 rounded-xl shadow bg-gray-200 min-w-2/12 p-3 flex space-x-5'>
        <div className='text-3xl flex items-center'><VscProject /></div>
        <div className='flex flex-col items-center'>
        <span className='text-gray-500 font-semibold'>Active Projects</span>
        <span className='font-semibold text-xl w-full text-left'>{topData.active}</span></div>
      </div>
      <div className='border border-gray-50 rounded-xl shadow bg-gray-200 min-w-2/12 p-3 flex space-x-5'>
        <div className='text-3xl flex items-center'><FaExclamationTriangle /></div>
        <div className='flex flex-col items-center'>
        <span className='text-gray-500 font-semibold'>Overdue Payments</span>
        <span className='font-semibold text-xl w-full text-left'>{topData.overdue}</span></div>
      </div>
      <div className='border border-gray-50 rounded-xl shadow bg-gray-200 min-w-2/12 p-3 flex space-x-5'>
        <div className='text-3xl flex items-center'><FaRupeeSign /></div>
        <div className='flex flex-col items-center'>
        <span className='text-gray-500 font-semibold'>{`This Month (₹)`}</span>
        <span className='font-semibold text-xl w-full text-left'>{Intl.NumberFormat('en-IN').format(topData.amount)}</span></div>
      </div>
    </div>

{/* Dashboard Charts */}
<div className='w-full my-4 flex flex-col md:flex-row items-center justify-center bg-white rounded-xl shadow py-4 gap-4'>
  <div className='flex flex-col flex-1 px-4 items-center justify-center '>
    <div className='w-full border-b flex justify-between mb-2 pb-2 border-b-gray-500'>
      <span className='font-semibold'>Monthly Revenue :</span>
      <select name="months" id="months" className='font-semibold'
      onClick={(e)=>{
        barChartDataFetch(e.target.value)
      }}>
        <option value="6">
          6 Months
        </option>
        <option value="12">
          12 Months
        </option>
      </select>
    </div>
  <SimpleBarChart chartData={chartData} />
  </div>
  <div className='flex flex-col flex-1 px-4 items-center justify-center'>
    <div className='w-full border-b flex justify-between mb-2 pb-2 border-b-gray-500'>
      <span className='font-semibold'>Projects :</span>
      <select name="months" id="months" className='font-semibold'
      onClick={(e)=>{
        pieChartDataFetch(e.target.value)
      }}>
        <option value="6">
          6 Months
        </option>
        <option value="12">
          12 Months
        </option>
      </select>
    </div>
    <StatusPieChart pieChartData = {pieChartData}/>
  </div>
</div>


{/* Recent Projects */}
    <div className='recentProjects mt-5 py-3 px-1 bg-gray-200 rounded-xl shadow'>
      <div className='w-full font-semibold text-xl border-b border-b-gray-500'>Recent Projects</div>
      <div className='overflow-x-auto bg-white rounded-lg shadow px-5 py-5 m-5'>
        <table className='w-full border-collapse'>
          <thead className="bg-gray-100">
            <tr>
            <th className="px-4 text-left text-sm font-semibold text-gray-600 border-b">Client</th>
            <th className="px-4 text-left text-sm font-semibold text-gray-600 border-b">Project</th>
            <th className="px-4 text-left text-sm font-semibold text-gray-600 border-b hidden md:table-cell">Status</th>
            <th className="px-4 text-left text-sm font-semibold text-gray-600 border-b hidden md:table-cell">Amount</th>
            <th className="px-4 text-left text-sm font-semibold text-gray-600 border-b hidden md:table-cell">Due Date</th>
            <th className="px-4 text-left text-sm font-semibold text-gray-600 border-b hidden md:table-cell">Payment</th>
          </tr>
          </thead>
          <tbody>
            {recentProjectList?.map(project=>{
              return (
              <tr className="hover:bg-gray-200 transition border-b border-b-gray-300">
                <td
                className="px-4 py-3 text-sm text-gray-800 hover:underline cursor-pointer"
                onClick={()=>{
                  setClientId(project?.clientName?._id)
                  setCurrentTab('Client Details')
                }}
                >{project?.clientName?.name}</td>

                <td
                className="px-4 py-3 text-sm text-gray-800 hover:underline cursor-pointer"
                onClick={()=>{
                  setProjectId(project?._id)
                  setCurrentTab('Project Details')
                }}
                >{project?.name}</td>

                <td
                className={`px-4 py-3 text-sm hidden md:table-cell ${project?.status === 'Active'? 'text-indigo-600': project?.status === 'Complete' ? 'text-green-600' : 'text-red-600'}`}>{project?.status}</td>

                <td className="px-4 py-3 text-sm hidden md:table-cell text-gray-700">₹ {project?.amount /100 || "--"}</td>
                <td
                className="px-4 py-3 text-sm hidden md:table-cell text-gray-700">{new Date(project?.dueDate).toLocaleDateString(('en-GB'),{
                  day : '2-digit',
                  month : 'short',
                  year : 'numeric'
                })}</td>
                <td 
                className={`px-4 py-3 text-sm hidden md:table-cell ${project?.paymentStatus === 'Pending'? 'text-indigo-600': project?.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>{project?.paymentStatus}</td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default MainDashboardPage
