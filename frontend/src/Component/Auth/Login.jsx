import React, {  useEffect, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { setIsAuthorized } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { extractErrorMessage } from "../../ExtractError/Extract";
const Login = () => {
  const Authorized = useSelector((state)=>state.auth.isAuthorized)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
 const dispatch = useDispatch()
 const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    if ( !email || !password|| !role) {
      toast.error("All fields are required");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");    
      setPassword("");
      setRole("");
      dispatch(setIsAuthorized(true));
    } catch (error) {
      dispatch(setIsAuthorized(false));
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
useEffect(()=>{
   if(Authorized){
    return  navigate("/")
  }
},[Authorized,navigate])
 

  return (
    <>
      <section className="flex min-w-full max-w-full my-0 mx-auto min-h-[100vh] md:flex-row flex-col">
        <div className="flex-1 flex flex-col justify-center bg-[#fff] py-[20px] px-[20px]">
          <div className="flex gap-[15px] flex-col text-center mb-[30px]">
            <img className="w-[300px] h-[120px] my-0 mx-auto" src="/JobZeelogo.png" alt="logo" />
            <h3 className="text-[1.6rem]">Login to your account</h3>
          </div>
          <form>
            <div className="flex flex-col gap-[10px]">
              <label>Login As</label>
              <div className="flex items-center rounded-lg">
                <select className="bg-[#87878778] p-[8px] border-none w-[100%] focus:outline-none" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="JobSeeker">Job Seeker</option>
                </select>
                <FaRegUser className="w-[10%]  text-[1.5rem] bg-[#2d5649] h-[100%] p-[8px] text-[#fff]" />
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <label>Email Address</label>
              <div className="flex items-center rounded-lg">
                <input
                className="bg-[#87878778] p-[8px] border-none w-[100%] focus:outline-none"
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline className="w-[10%] text-[1.5rem] bg-[#2d5649] h-[100%] p-[8px] text-[#fff]" />
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <label>Password</label>
              <div className="flex items-center rounded-lg">
                <input
                className="bg-[#87878778] p-[8px] border-none w-[100%] focus:outline-none"
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill className="w-[10%] text-[1.5rem] bg-[#2d5649] h-[100%] p-[8px] text-[#fff]" />
              </div>
            </div>
            <button className="p-[12px] text-center border-none mt-[25px] font-[700] text-[#fff] bg-[#2d5649] text-[1.2rem] rounded-lg" type="submit" onClick={handleLogin}>
              Login
            </button>
            <Link className="p-[12px] text-center border-[1px] border-solid border-[#2d5649] mt-[25px] font-[700] text-[#2d5649] text-[1.2rem] no-underline rounded-lg" to={"/register"}>Register Now</Link>
          </form>
        </div>
        <div className="flex-2 flex justify-center overflow-hidden">
          <img className="w-[550px] h-[550px]" src="/login.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Login;