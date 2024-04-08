import React, {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModel from "./ResumeModel";
import { extractErrorMessage } from "../../ExtractError/Extract";
const MyApplication = () => {
const jobUser = useSelector(state=>state.auth.user)
  const [application, setApplications] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const Authorized = useSelector(state=>state.auth.isAuthorized)
  const navigateTo = useNavigate();

  useEffect(() => {
  
        try {
      
      if (jobUser && jobUser.role === "Employer") {
        axios
          .get("https://mernstack-h0mv.onrender.com/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
          
            setApplications(res.data.application);
          });
      } else if(jobUser && jobUser.role === "JobSeeker"){
        axios
          .get("https://mernstack-h0mv.onrender.com/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            
            setApplications(res.data.application);
          });
      }else{
        toast.error( error.response.data)
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Extract the error message from the response
        const errorMessage = extractErrorMessage(error.response.data);
        // Display the error message using toast or any other method
        toast.error(errorMessage);
      } else {
        // Handle other types of errors
        toast.error("An error occurred. Please try again later.");
      }
    }
      
  }, []);

  useEffect(() => {
    if (!Authorized) {
      navigateTo("/login");
    }
  
  }, [Authorized, navigateTo]);

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`https://mernstack-h0mv.onrender.com/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        })
        .catch((error) => {
          // Handle Axios errors
         
        });
    } catch (error) {
      // Handle unexpected errors
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="bg-[#f1f3f6] py-[50px] px-[20px] min-h-[800px] ">
      {jobUser && jobUser.role === "JobSeeker" ? (
        <div className="max-w-full min-w-full my-0 mx-auto flex flex-col gap-[35px] ">
          <h1 className="text-[30px] font-bold text-center">My Applications</h1>
          {application.length <= 0 ? (
            <>
              {" "}
              <h4 className="md:text-[20px] font-bold text-[15px]">No Applications Found</h4>{" "}
            </>
          ) : (
            application.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1 className="md:text-[30px] text-[14px] text-center  font-bold">Applications From Job Seekers</h1>
          {!application || application.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            application.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModel imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplication;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  
  return (
    <>
      <div className="flex  items-center flex-col md:flex-row  border-b-[1px] border-b-[solid] border-b-[#dcdcdc]">
        <div className="flex-3 flex-2 flex flex-col gap-[5px] ">
          <p>
            <span className="font-bold">Name:</span> {element.name}
          </p>
          <p>
            <span  className="font-bold">Email:</span> {element.email}
          </p>
          <p>
            <span  className="font-bold">Phone:</span> {element.phone}
          </p>
          <p>
            <span  className="font-bold">Address:</span> {element.address}
          </p>
          <p>
            <span  className="font-bold">CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="md:flex-1 flex flex-col static md:relative md:h-[200px] h-[220px] md:mb-4 mb-4">
          <img className="w-auto h-full md:absolute top-0 left-[100px]"
            src={element.resume.url}
            alt="resume"  
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <button className="bg-[#d9534f] text-[#fff] border-none py-[10px] px-[30px] text-[20px] font-[500]" onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className=" flex flex-col md:flex-row h-auto border-b-[1px] md:justify-center md:items-center border-b-[solid] border-b-[#dcdcdc]">
        <div className="md:flex-3 md:flex-2  mt-[20px] md:mt-0  flex flex-col md:gap-[5px]  bottom-[10px]">
          <p>
            <span  className="font-bold ">Name:</span> {element.name}
          </p>
          <p>
            <span  className="font-bold">Email:</span> {element.email}
          </p>
          <p>
            <span className="font-bold">Phone:</span> {element.phone}
          </p>
          <p>
            <span  className="font-bold">Address:</span> {element.address}
          </p>
          <p>
            <span  className="font-bold">CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="md:flex-1  flex md:flex-col static md:relative h-[250px] md:h-[280px]">
          <img className="md:w-[auto] h-[150px] md:h-[200px]  absolute mt-11 md:mt-[50px] md:top-0  md:left-[150px]"
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </>
  );
};