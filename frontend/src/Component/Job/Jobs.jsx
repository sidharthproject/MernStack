import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Jobs() {
  const Authorized = useSelector(state=>state.auth.isAuthorized)
  const[job,setJobs] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    if (!Authorized) {
      navigate("/login");
    } else {
      try {
        axios.get("https://mernstack-vbvz.onrender.com/api/v1/job/getAll", { withCredentials: true })
          .then((res) => {
            setJobs(res.data);
          });
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          // If there's no response object or data property, handle the error differently
          toast.error("An unexpected error occurred.");
        }
      }
    }
  }, [Authorized, navigate]);
  return (
    <section className="bg-[#f1f3f6] h-auto py-[50px] px-[20px]">
      <div className="flex flex-col items-center min-w-full max-w-full my-0 mx-auto gap-[35px]">
        <h1 className='text-[25px] font-bold'>ALL AVAILABLE JOBS</h1>
        <div className="flex flex-wrap w-full gap-[30px] justify-center py-[30px] px-0">
          {job.jobs &&
            job.jobs.map((element) => {
              return (
                <div className="bg-[#fff] no-underline w-[320px] md:w-[290px] h-[190px] p-[20px] flex flex-col gap-[10px] justify-center hover:transition-all hover:duration-300 hover:shadow-lg"  key={element._id}>
                  <p className='font-[bold] text-[1.6rem]'>{element.title}</p>
                  <p className='text-[1.3rem] text-gray-500'>{element.category}</p>
                  <p className='text-[1rem] text-gray-500'>{element.country}</p>
                  <Link className="no-underline p-[7px] text-[20px] text-[#2d5649] bg-[#e9f9ff] w-full block text-center" to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  )
}

export default Jobs