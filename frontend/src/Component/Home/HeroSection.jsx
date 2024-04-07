import React from 'react'
import { FaSuitcase } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
function HeroSection() {
  
const details = [
  {
    id: 1,
    title: "1,23,441",
    subTitle: "Live Job",
    icon: <FaSuitcase />,
  },
  {
    id: 2,
    title: "91220",
    subTitle: "Companies",
    icon: <FaBuilding />,
  },
  {
    id: 3,
    title: "2,34,200",
    subTitle: "Job Seekers",
    icon: <FaUsers />,
  },
  {
    id: 4,
    title: "1,03,761",
    subTitle: "Employers",
    icon: <FaUserPlus />,
  },
];
  return (
    <div className='flex flex-col md:h-[450px] pt-75 pb-50 px-0'>
       <div className='flex items-center flex-col md:flex-row  h-[650px] mb-[1.75rem] min-w-full max-w-full my-0 mx-auto'>
        <div className="flex-1 flex flex-col ml-[40px] justify-center">
          <h1 className=' text-[30px] font-[500]'>FIND A JOB THAT SUITS YOU</h1>
          <h1 className='text-[40px] font-[500]'>YOUR INTEREST AND SKILL</h1>
          <p className='mt-[1.5rem] max-w-[500px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, reprehenderit esse ex asperiores earum corporis vitae velit in repudiandae ut cupiditate perferendis architecto nam tenetur dolorum doloremque! Atque, similique illo!</p>
        </div>
        <div className='flex-1 overflow-hidden'>
          <img className='w-[400px] h-[300px] md:mb-0 md:w-full md:h-full ' src="/heroS.jpg" alt="" />
        </div>
       </div>
       <div className="min-w-full  flex-wrap max-w-full my-0 mx-auto flex items-center justify-center md:justify-between">
        {
       details.map(element=>{
        return(
          <div className="flex mx-[30px] gap-[20px] m-4 items-center bg-[#f1f3f6] w-[200px] py-[10px] px-[20px] hover:transition-all hover:duration-100 hover:shadow-lg" key={element.id}>
            <div className="text-[24px] bg-[rgb(233,249,255)] flex items-center justify-center p-[10px]  text-[#2d5649]">{element.icon}</div>
            <div className="content">
              <p className='font-bold'>{element.title}</p>
              <p className='text-[14px] text-gray-600 mt-[5px]'>{element.subTitle}</p>
            </div>
            </div>
        )
       })
       }
       </div>
    </div>
  )
}

export default HeroSection