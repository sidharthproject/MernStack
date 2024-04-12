import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import {GiHamburgerMenu} from 'react-icons/gi'
import { setIsAuthorized } from '../../store/authSlice'
import { Link } from 'react-router-dom'

function Navbar() {
    const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector(state=>state.auth.user)
 const Authorized =useSelector(state=>state.auth.isAuthorized)
  
  const handleLogout = async()=>{
    try {
      const response = await axios.get("https://mernstack-vbvz.onrender.com/api/v1/user/logout",{withCredentials:true})
      toast.success(response.data.messsage)
      dispatch(setIsAuthorized(false))
      navigate("/login")
    } catch (error) {
      dispatch(setIsAuthorized(true))
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        // If there's no response object or data property, handle the error differently
        toast.error("An unexpected error occurred.");
      }
    }
}
  return (
    <div>
          <nav className={Authorized?" md:w-full w-full   bg-[#18191c] md:py-0 md:px-[20px]     "  : "hidden"}>
      <div className="flex justify-between items-center w-full  md:w-full md:my-0 md:mx-auto md:flex  sm:w-full md:justify-between">
        <div className=" w-[120px]  h-[120px]">
          <img className='w-full h-full ' src="/JobZee-logos__white.png" alt="logo" />
        </div>
        <ul className={!show ?  "  md:static hidden    md:flex md:gap-[25px] md:items-center " : "absolute top-[120px] bg-[#f2f3f6] transition-all duration-500 ease-in  left-0 w-[350px] flex flex-col h-[300px] justify-center gap-6 items-start  px-6 shadow-lg z-[1] md:z-auto  "}>
          <li >
            <Link className='md:text-[#f1f3f6] md:border-none text-[#1a191a] decoration-[none] font-bold md:font-[500] text-[15px] relative hover:text-[#549681] transition-all duration-[0.3s] before:absolute  before:h-[1px] before:w-[100%] before:left-[-100%] before:bottom-0 before:transition-all before:duration-[0.3s] ' to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li  >
            <Link className='md:text-[#f1f3f6]  md:border-none font-bold  text-[#1a191a] decoration-[none] md:font-[500] text-[15px] relative hover:text-[#549681] transition-all duration-[0.3s] :hover::bef'  to={"/job/getall"} onClick={() => setShow(false)}>
              ALL JOBS
            </Link>
          </li>
          <li >
            <Link className='md:text-[#f1f3f6] md:border-none font-bold  text-[#1a191a] decoration-[none] md:font-[500] text-[15px] relative hover:text-[#549681] transition-all duration-[0.3s] :hover::bef'to={"/application/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" ? (
            <>
              <li >
                <Link className='md:text-[#f1f3f6]  md:border-none font-bold  text-[#1a191a] decoration-[none] md:font-[500] text-[15px] relative hover:text-[#549681] transition-all duration-[0.3s] :hover::bef'  to={"/job/post"} onClick={() => setShow(false)}>
                  POST NEW JOB
                </Link>
              </li>
              <li  >
                <Link className='md:text-[#f1f3f6] md:border-none font-bold  text-[#1a191a] decoration-[none] md:font-[500] text-[15px] relative hover:text-[#549681] transition-all duration-[0.3s] :hover::bef' to={"/job/me"} onClick={() => setShow(false)}>
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}

          <button className='h-fit  bg-transparent outline-none text-[#195321] font-bold text-[15px] md:p-[7px] md:border-[1px] md:border-solid md:border-[#f1f3f6] md:text-[#f1f3f6] md:text-[20px] md:font-[300px] hover: bg-[#184235] hover:transition-all duration-300 hover:cursor-pointer hover:border-[1px] hover:border-[solid] hover:border-[#184235]' onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="block text-[50px] text-white p-[8px] md:hidden ">
          <GiHamburgerMenu  onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>

    </div>
  )
}

export default Navbar
