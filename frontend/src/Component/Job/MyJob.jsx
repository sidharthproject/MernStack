import React,{useState,useEffect} from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function MyJob() {
  const [myJobs, setMyJobs] = useState([]);

  const [editingMode, setEditingMode] = useState(null);
  const Authorized = useSelector((state)=>state.auth.isAuthorized)
  const userJob = useSelector((state)=>state.auth.user)
  const navigate = useNavigate()
 
  //Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
    if(userJob && userJob.role !=="Employer"){
      navigate("/")
    }else{
        try {
        const { data } = await axios.get(
          "https://mernstack-1jqz.onrender.com/api/v1/job/getMyJob",
          { withCredentials: true }
        );
     
        setMyJobs(data.myjobs)
        console.log(myJobs);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          // If there's no response object or data property, handle the error differently
          toast.error("An unexpected error occurred.");
        }
        setMyJobs([]);
      }
    }
    };
    fetchJobs();
  }, []);


  //Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that job whose ID has been send.
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };
  useEffect(()=>{
  if(!Authorized){
  navigate("/login")
 }},[Authorized,navigate])
 
  //Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`https://mernstack-1jqz.onrender.com/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
        setEditingMode(null);
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

  //Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`https://mernstack-1jqz.onrender.com/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
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

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };
  return (
    <>
    <div className="bg-[#f1f3f6] md:pl-[50px] px-[20px] min-h-[800px]">
        <div className="min-w-full max-w-full my-0 mx-auto items-center flex flex-col gap-[35px]">
          <h1 className='font-bold text-[17px] md:text-[30px] py-4 md:py-10 '>Your Posted Jobs</h1>
          {myJobs && myJobs.length > 0 ? (
            <>
              <div className="w-full flex flex-wrap gap-[20px] fle-col ">
                {myJobs.map((element) => (
                  <div className="border-b-[1px] border-b-[solid] border-b-[#18191c]  md:flex-row flex-col py-[10px] px-0 w-full flex gap-[20px]" key={element._id}>
                    <div className="md:flex-3 flex flex-col md:flex-row gap-[20px]">
                      <div className="flex-1 flex flex-col gap-[20px]">
                        <div className='flex flex-col gap-[10px]'>
                          <span className='text-[20px] mr-[6px] font-bold'>Title:</span>
                          <input    className="border-b border-gray-400 focus:outline-none focus:border-indigo-600"
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.title || ''}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div  className='flex flex-col gap-[10px]'>
                          {" "}
                          <span className='text-[20px] mr-[6px] font-bold'>Country:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.country || ''}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "country",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div  className='flex flex-col gap-[10px]'>
                          <span className='text-[20px] mr-[6px] font-bold'>City:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.city || ''}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "city",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div  className='flex flex-col gap-[10px]'>
                          <span className='text-[20px] mr-[6px] font-bold'>Category:</span>
                          <select
                            value={element.category || ''}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "category",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value="Graphics & Design">
                              Graphics & Design
                            </option>
                            <option value="Mobile App Development">
                              Mobile App Development
                            </option>
                            <option value="Frontend Web Development">
                              Frontend Web Development
                            </option>
                            <option value="MERN Stack Development">
                              MERN STACK Development
                            </option>
                            <option value="Account & Finance">
                              Account & Finance
                            </option>
                            <option value="Artificial Intelligence">
                              Artificial Intelligence
                            </option>
                            <option value="Video Animation">
                              Video Animation
                            </option>
                            <option value="MEAN Stack Development">
                              MEAN STACK Development
                            </option>
                            <option value="MEVN Stack Development">
                              MEVN STACK Development
                            </option>
                            <option value="Data Entry Operator">
                              Data Entry Operator
                            </option>
                          </select>
                        </div>
                        <div  className='flex flex-col  gap-[10px]'>
                          <span className='text-[20px] mr-[6px] font-bold'>
                            Salary:{" "}
                            {element.fixedSalary ? (
                              <input
                                type="number"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.fixedSalary || ''}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "fixedSalary",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <div  className='flex md:flex-row flex-col gap-[12px] '>
                                <input
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  } 
                                  value={element.salaryFrom || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "salaryFrom",
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.salaryTo || ''}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "salaryTo",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            )}
                          </span>
                        </div>
                        <div  className='flex flex-col gap-[10px]'>
                          {" "}
                          <span  className='text-[20px] mr-[6px] font-bold'>Expired:</span>
                          <select
                            value={element.expired  }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expired",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex-2 flex flex-col gap-[20px]">
                        <div className='flex flex-col gap-[10px]'>
                          <span  className='text-[20px] mr-[6px] font-bold'>Description:</span>{" "}
                          <textarea className='bg-transparent text-[16px] text-[#18191c] border-none py-[7px] px-[4px] h-fit focus:outline-none'
                            rows={5}
                            value={element.description || ''}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div  className='flex flex-col gap-[10px]'>
                          <span  className='text-[20px] mr-[6px] font-bold'>Location: </span>
                          <textarea className='bg-transparent text-[16px] text-[#18191c] border-none py-[7px] px-[4px] h-fit focus:outline-none'
                            value={element.location || ''}
                            rows={5}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "location",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* Out Of Content Class */}
                    <div className="flex-1 flex flex-col gap-3 mt-[-53px] md:mt-0 md:gap-[20px] items-center justify-center">
                      <div className="gap-[20] flex">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateJob(element._id)}
                              className="bg-transparent text-[#184235] border-[1px] border-solid border-[#184235] rounded-lg p-[8px] flex justify-center items-center text-[20px] hover:transition-all duration-200 hover:bg-[#184235] hover:text-[#f1f3f6]"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="bg-transparent text-[#d9534f] border-[1px] border-solid border-[#d9534f] rounded-s-lg w-[50px] p-[8px] flex justify-center items-center text-[20px] hover:transition-all duration-200 hover:bg-[#d9534f] hover:text-[#f1f3f6]"
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className=" w-[120px] text-[#18191c] text-[16px] font-[500] uppercase p-[7px] border-none bg-[#ffc107]"
 
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteJob(element._id)}
                        className=" w-[120px] text-[#e7e8ec] text-[16px] font-[500] uppercase p-[7px] border-none bg-[#ee5d53]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              You've not posted any job or may be you deleted all of your jobs!
            </p>
          )}  
        </div>
      </div>
    </>
  )
}

export default MyJob