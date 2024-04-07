import axios from "axios";
import React, {useState,useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { extractErrorMessage } from "../../ExtractError/Extract";
import { useSelector } from "react-redux";
const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const Authorized = useSelector(state=>state.auth.isAuthorized)
  const userJob = useSelector(state=>state.auth.user)
 

  const navigateTo = useNavigate();

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    ;
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");
      toast.success(data.message);
      navigateTo("/job/getAll");
    } catch (error) {
      console.log(error);
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
  };
 

 
  useEffect(() => {
    if (!Authorized) {
      navigateTo("/login");
    }
    if(userJob && userJob.role=="Employer"){
      navigateTo("/");
    }
  }, [Authorized, navigateTo,userJob]);
  return (
    
    <section className="flex flex-col">
      <div className="min-w-[1000px] max-w-[1000px] my-0 mx-auto flex flex-col text-center py-[50px] px-[20px]">
        <h3 className="font-bold text-[30px] ">Application Form</h3>
        <form className="flex flex-col w-[500px] py-[40px] px-[20px]  gap-[25px] my-0 mx-auto  mt-[35px]" onSubmit={handleApplication}>
          <input className="  text-[20px] border-b-[1px] border-b-[solid] border-b-[black] py-[12px] px-[4px] focus:outline-none"        type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input className="  text-[20px] border-b-[1px] border-b-[solid] border-b-[black] py-[12px] px-[4px] focus:outline-none"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input className="  text-[20px] border-b-[1px] border-b-[solid] border-b-[black] py-[12px] px-[4px] focus:outline-none"
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input className="  text-[20px] border-b-[1px] border-b-[solid] border-b-[black] py-[12px] px-[4px] focus:outline-none"
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <textarea className="focus:outline-none"
            placeholder="CoverLetter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Select Resume <span className="text-red-400">(Only Jpeg And Png Format Allowed)</span>
            </label>
            <input className="text-[20px] border-b-[1px] border-b-[solid] border-b-[black] py-[12px] px-[4px] focus:outline-none"
              type="file"
             
              onChange={handleFileChange}
              style={{ width: "100%" }}
             
            />
          </div>
          <button className="bg-[#2d5649] text-[#e9f9ff] text-[20px] font-[400] border-none py-[12px] px-[30px] no-underline w-full hover:bg-[#184235] hover:transition-all duration-200 hover:cursor-pointer" type="submit">Send Application</button>
        </form>
      </div>
    </section>
  );
}

export default Application;