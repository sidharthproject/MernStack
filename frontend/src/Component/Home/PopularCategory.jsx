import React from 'react'
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { BiLogoPython } from "react-icons/bi";
function PopularCategory() {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Postions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
    },
      {
      id: 9,
      title: "Python Development",
      subTitle: "80 Open Positions",
      icon: < BiLogoPython/>,
    },
  ];
  return (
    <div className="min-w-full max-w-full flex p-8 text-center  justify-center flex-col  mx-auto my-0 py-[50px] px-0 gap-[25px]">
    <h3 className='font-semibold text-[27px] '>POPULAR CATEGORIES</h3>
    <div className="flex flex-wrap items-center m-8 justify-center  md:justify-between gap-[30px] py-[20px] px-0">
      {categories.map((element) => {
        return (
          <div className="md:w-[300px] w-full h-[100px] md:p-[20px] flex items-center gap-[12px] bg-[#f1f3f6] hover:transition-all duration-200 hover:shadow-lg" key={element.id}>
            <div className="text-[24px] p-[10px] bg-[#e9f9ff] text-[#2d5649] flex items-center justify-center">{element.icon}</div>
            <div className="text">
              <p className='md:text-[16px] text-[20px] font-bold'>{element.title}</p>
              <p className='md:text-[14px] text-[17px] font-[300] text-gray-500'>{element.subTitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
  )
}

export default PopularCategory


