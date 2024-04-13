import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import axios from 'axios'
function JobDetail() {
  const Authorized = useSelector((state)=>state.auth.isAuthorized)
  const jobUser =useSelector((state)=>state.auth.user)
  const {id} = useParams()
  const[job,setJob] = useState({})
  const navigate = useNavigate()
   useEffect(()=>{

    if(!Authorized){
      navigate("/login")
    }else{
    axios.get(`https://mernstack-1jqz.onrender.com/api/v1/job/${id}`, {withCredentials:true})
    .then((res)=>{
      setJob(res.data.job)
    })
    .catch((error)=>{
      navigate("/*")
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        // If there's no response object or data property, handle the error differently
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          // If there's no response object or data property, handle the error differently
          toast.error("An unexpected error occurred.");
        }
      }

    })
   }}
   
   ,[])

      return(
    <div className="bg-[#f1f3f6] py-[50px] px-[20px] ">
    <div className="max-w-[1000px] min-w-[1000px]  my-0 mx-auto flex flex-col items-center">
      <h3 className='font-blod text-[30px]'>Job Details</h3>

      <div className="w-full min-h-[550px] py-[50px] px-0 flex flex-col gap-[25px] justify-center">
        <p className='font-bold text-[#wd5649]'>
          Title: <span className='text-[#18191c] font-[400]'> {job.title}</span>
        </p>
        <p className='font-bold text-[#2d5649]]'>
          Category: <span className='text-[#18191c] font-[400]'>{job.category}</span>
        </p>
        <p className='font-bold text-[#2d5649]'>
          Country: <span className='text-[#18191c] font-[400]'>{job.country}</span>
        </p>
        <p className='font-bold text-[#2d5649]'>
          City: <span className='text-[#18191c] font-[400]'>{job.city}</span>
        </p>
        <p className='font-bold text-[#2d5649]'>
          Location: <span className='text-[#18191c] font-[400]'>{job.location}</span>
        </p>
        <p className='font-bold text-[#2d5649] w-[320px] md:w-full'>
          Description: <span className='text-[#18191c] font-[400]'>{job.description}</span>
        </p>
        <p className='font-bold text-[#2d5649]'>
          Job Posted On: <span className='text-[#18191c] font-[400]'>{job.jobPostOn}</span>
        </p>
        <p className='font-bold text-[#2d5649]'>
          Salary:{" "}
          {job.fixedSalary ? (
            <span className='text-[#18191c] font-[400]'>{job.fixedSalary}</span>
          ) : (
            <span>
              {job.salaryFrom} - {job.salaryTo}
            </span>
          )}
        </p>
        {jobUser && jobUser.role === "Employer" ? (
          <></>
        ) : (
          <Link className='bg-[#2d5649] text-[#e9f9ff] text-[20px] font-[400]  border-none py-[12px] px-[30px] no-underline mt-[10px] w-fit' to={`/application/${job._id}`}>Apply Now</Link>
        )}
      </div>
     
    </div>
  </div>
  )
 
}


export default JobDetail