import React,{useState,useEffect} from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from  'react-redux'

function PostJob() {
  const Authorized = useSelector((state)=>state.auth.isAuthorized)
 
  const jobUser =useSelector((state)=>state.auth.user)
  const navigate =useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

 

  
  const handleJobPost = async (e) => {
    
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }

   
     
 
    await axios.post("https://mernstack-vbvz.onrender.com/api/v1/job/postJob",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          // If there's no response object or data property, handle the error differently
          toast.error("An unexpected error occurred.");
        }
      });
    
  };
  useEffect(() => {
    // If the user is not authorized, redirect to the login page
    if (!Authorized) {
      navigate('/login');
    }
    // If the user is not an employer, redirect to the home page
    if (jobUser && jobUser.role !== 'Employer') {
      navigate('/login');
    }
  }, [Authorized, jobUser, navigate]);
  return (
    <>
    <div className="bg-[#f1f3f6] py-[50px] px-[20px] min-h-full md:min-h-[800px] flex items-center">
    <div className="max-w-full min-w-full flex flex-col  gap-[35px] items-center my-0 mx-auto">
      <h3 className='text-[35px] font-bold'>POST NEW JOB</h3>
      <form className='w-full flex flex-col gap-[25px]' onSubmit={handleJobPost}>
        <div className="flex flex-col md:flex-row gap-[5vw]">
          <input className='flex-1 w-full text-[20px] py-[7px] px-[4px]  bg-transparent border-b-[1px] border-b-solid border-b-[gray]  focus:outline-none'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
          />
          <select className='flex-1 w-full text-[20px] py-[7px] px-[4px]  bg-transparent border-b-[1px] border-b-solid border-b-gray-400   focus:outline-none'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Graphics & Design">Graphics & Design</option>
            <option value="Mobile App Development">
              Mobile App Development
            </option>
            <option value="Frontend Web Development">
              Frontend Web Development
            </option>
            <option value="MERN Stack Development">
              MERN STACK Development
            </option>
            <option value="Account & Finance">Account & Finance</option>
            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>
            <option value="Video Animation">Video Animation</option>
            <option value="MEAN Stack Development">
              MEAN STACK Development
            </option>
            <option value="MEVN Stack Development">
              MEVN STACK Development
            </option>
            <option value="Data Entry Operator">Data Entry Operator</option>
          </select>
        </div>
        <div className="flex gap-[5vw]">
          <input className='flex-1 w-full text-[20px] py-[7px] px-[4px]  bg-transparent border-b-[1px] border-b-[solid] border-b-[gray] focus:outline-none'
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
          />
          <input className='flex-1 w-full text-[20px] py-[7px] px-[4px]  bg-transparent border-b-[1px] border-b-[solid] border-b-[gray] focus:outline-none'
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
        </div>
        <input className='flex-1 w-full text-[20px] py-[7px] px-[4px]  bg-transparent border-b-[1px] border-b-[solid] border-b-[gray] focus:outline-none'
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
        <div className="flex flex-col gap-[10px] focus:outline-none">
          <select className=' flex gap-[5vw] flex-1 w-full text-[20px] py-[7px] px-[4px]  bg-transparent border-b-[1px] border-b-[solid] border-b-[gray] focus:outline-none'
            value={salaryType}
            onChange={(e) => setSalaryType(e.target.value)}
          >
            <option value="default">Select Salary Type</option>
            <option value="Fixed Salary">Fixed Salary</option>
            <option value="Ranged Salary">Ranged Salary</option>
          </select>
          <div>
            {salaryType === "default" ? (
              <p className=' text-[#d9534f] text-[14px] font-[300]'>Please provide Salary Type *</p>
            ) : salaryType === "Fixed Salary" ? (
              <input className='flex-1 w-full text-[20px] py-[7px] px-[4px]  bg-transparent border-b-[1px] border-b-[solid] border-b-[gray] focus:outline-none'
                type="number"
                placeholder="Enter Fixed Salary"
                value={fixedSalary}
                onChange={(e) => setFixedSalary(e.target.value)}
              />
            ) : (
              <div className="ranged_salary">
                <input className='flex-1 w-full text-[20px] py-[7px] px-[4px]  bg-transparent border-b-[1px] border-b-[solid] border-b-[gray] focus:outline-none'
                  type="number"
                  placeholder="Salary From"
                  value={salaryFrom}
                  onChange={(e) => setSalaryFrom(e.target.value)}
                />
                <input className='flex-1 w-full text-[20px] py-[7px] px-[4px]  bg-transparent border-b-[1px] border-b-[solid] border-b-[gray] focus:outline-none'
                  type="number"
                  placeholder="Salary To"
                  value={salaryTo}
                  onChange={(e) => setSalaryTo(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
        <textarea className='flex-1 w-full h-[50%] text-[20px] py-[7px] px-[4px]  bg-transparent border-b-[1px] border-b-[solid] border-b-[gray] focus:outline-none'
          rows="10"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Job Description"
        />
        <button className='w-full bg-[#2d5649] text-[20px] py-[10px] px-[30pcx]  text-[#fff] uppercase font-[600] tracking-wider' type="submit">Create Job</button>
      </form>
    </div>
  </div>
  </>
  )
}

export default PostJob