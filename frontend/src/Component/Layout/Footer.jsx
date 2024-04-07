import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import{FaFacebook,FaYoutube,FaLinkedin} from 'react-icons/fa'
import { RiInstagramFill } from "react-icons/ri";

function Footer() {
 const Authorized = useSelector(state=>state.auth.isAuthorized)
  return (
  <footer className={Authorized?"bg-[#18191c] flex md:flex-row flex-col justify-between py-[20px] px-[120px] items-center" :"hidden"}>
      
 <div className='flex gap-[12px] text-[11px] md:text-[16px] text-[#f1f3f6]'>
  &copy; All Rights Reserved By Sidharth.
 </div>
 <div className ='flex mt-4 gap-[12px] text-[16px] text-[#f1f3f6]'>
 <Link className='text-[20px]  no-underline text-[#f1f3f6] hover:text-[#2d5649] hover:scale-[1.2] transition-all duration-[0.3s]' to={"*"} target="_blank">
          <FaFacebook />
        </Link>
        <Link className='text-[20px]  no-underline text-[#f1f3f6] hover:text-[#2d5649] hover:scale-[1.2] transition-all duration-[0.3s]' to={"*"} target="_blank">
          <FaYoutube />
        </Link>
        <Link className='text-[20px] no-underline text-[#f1f3f6] hover:text-[#2d5649] hover:scale-[1.2] transition-all duration-[0.3s] ' to={"*"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link className='text-[20px] no-underline  text-[#f1f3f6] hover:text-[#2d5649] hover:scale-[1.2] transition-all duration-[0.3s]' to={"*"} target="_blank">
          <RiInstagramFill />
        </Link>
 </div>
    </footer>
  )
}

export default Footer