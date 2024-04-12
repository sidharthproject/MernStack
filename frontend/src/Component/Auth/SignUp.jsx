
import React,{useState} from 'react'

import { useSelector } from 'react-redux';
import {useDispatch}  from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { RiLock2Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setIsAuthorized } from '../../store/authSlice';
import toast from "react-hot-toast";



function SignUp() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate()
const Authorized = useSelector((state)=>state.auth.isAuthorized)
//const user = useSelector(state=>state.auth.user)

  const handleRegister =async(e)=>{
     e.preventDefault();
     if (!name || !email || !password || !phone || !role) {
      toast.error("All fields are required");
      return;
    }
  
    try {
      const {data} = await axios.post("https://mernstack-1jqz.onrender.com/api/v1/user/register",
   
      {name,email,password,phone,role},
    
      {
        withCredentials:true,
        headers:{
          "Content-Type" :"application/json"
        }
      })
      console.log(data);
      toast.success(data.message)
      setName(" ")
      setEmail(" ")
      setPassword(" ")
      setPhone("")
      setRole()

      dispatch(setIsAuthorized(true))
     
    } catch (error) {
      dispatch(setIsAuthorized(false))
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        // If there's no response object or data property, handle the error differently
        toast.error("An unexpected error occurred.");
      }
    }

  }
   
  {if(Authorized){
   
    return  navigate("/")
  }else{
  return (
    <section className='flex w-full  my-0 mx-[50px] md:flex-row flex-col '>
    <div className='flex-1 flex flex-col justify-center bg-[#fff] py-[20px] px-[20px]'>
      <div className='text-center mb-[30px]'>
      <img className='w-[300px] h-[120px] my-0 mx-auto' src="/JobZeelogo.png" alt="logo" />
        <h3 className='text-[1.6rem]'>Create a new account</h3>
      </div>
      <form action="">

        <div className='inputTag'>
          <label htmlFor="">Register As</label>
        <div  className='flex items-center rounded-md'>
        <select className='bg-[#87878778] p-[8px] b-none w-[100%]  focus:outline-none' value={role} onChange={(e)=>setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="Employer">Employer</option>
          <option value="JobSeeker">JobSeeker</option>
        </select>
        <FaRegUser className="w-[10%] text-[1.5rem] bg-[#2d5649] h-[100%] p-8px text-[#fff]"/>
       </div>
       </div>
       <div className='inputTag'>
          <label htmlFor="">Name</label>
        <div className='flex items-center rounded-md'>
        <input className='bg-[#87878778] p-[8px] b-none w-[100%]  focus:outline-none'
        type="text" 
        value={name} 
        onChange={(e)=>setName(e.target.value)}
        placeholder='Enter Your Name'
        />
        <FaPencilAlt className="w-[10%] text-[1.5rem] bg-[#2d5649] h-[100%] p-8px text-[#fff]"/>
       </div>
       </div>
       <div className='inputTag'>
          <label htmlFor="">Email</label>
        <div className='flex items-center rounded-md'>
        <input className='bg-[#87878778] p-[8px] b-none w-[100%]  focus:outline-none'
        type="email" 
        value={email} 
        onChange={(e)=>setEmail(e.target.value)}
        placeholder='Enter Your Email'
        />
        <MdOutlineMail className="w-[10%] text-[1.5rem] bg-[#2d5649] h-[100%] p-8px text-[#fff]"/>
       </div>
      </div>
       <div className='inputTag'>
          <label htmlFor="">Phone</label>
        <div className='flex items-center rounded-md'>
        <input className='bg-[#87878778] p-[8px] b-none w-[100%]  focus:outline-none'
        type="number" 
        value={phone} 
        onChange={(e)=>setPhone(e.target.value)}
        placeholder='Enter Your phone Number'
        />
        <FaPhoneFlip className="w-[10%] text-[1.5rem] bg-[#2d5649] h-[100%] p-8px text-[#fff]"/>
       </div>
       </div>
       <div className='inputTag'>
          <label htmlFor="">Passowrd</label>
        <div className='flex items-center rounded-md'>
        <input className='bg-[#87878778] p-[8px] b-none w-[100%]  focus:outline-none'
        type="password" 
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}
        placeholder='Enter Your Password '
        />
        <RiLock2Fill className="w-[10%] text-[1.5rem] bg-[#2d5649] h-[100%] p-8px text-[#fff]"/>
       </div>
       </div>
       <button className='p-[12px] text-center border-none mt-[25px] font-[700] text-[#fff] bg-[#2d5649] tetxt-[1.5rem] rounded-lg' onClick={handleRegister} type='submit'>Register</button>
       <Link className="p-[12px] text-center border-[1px] ml-[20px] border-solid border-[#2d5649] mt-[25px] text-[1.2rem] decoration-[none] rounded-lg" to={'/login'}>Login</Link>
      </form>
    </div>
   <div className='flex-[2] flex justify-center items-center overflow-y-hidden'>
   <img className='w-[500px] h-[500px] ' src="/register.png" alt="login" />
   </div>
  </section>
  )
}
}}
export default SignUp

