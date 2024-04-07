import React from 'react'
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
function PopularCompany() {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];
  return (
    <div className="bg-[#f1f3f6] p-8 flex justify-center ">
    <div className="min-w-full max-w-full my-0 mx-auto flex flex-col items-center justify-center px-[30px] gap-[35px] ">
      <div>
      <h3 className='text-[25px] font-semibold mt-[20px] '>TOP COMPANIES</h3></div>
      <div className="flex flex-col md:flex-row  md:justify-between w-full  py-[20px] px-0">
        {companies.map((element) => {
          return (
            <div className="md:w-[300px]  mt-4 flex flex-col bg-[#fff] p-[20px] gap-[15px] hover:transition-all hover:duration-150 hover:shadow-lg" key={element.id}>
              <div className="flex items-center gap-[15px]">
                <div className="p-[10px] text-[24px] text-[#2d5649] bg-[#e9f9ff] flex justify-center items-center">{element.icon}</div>
                <div className="text">
                  <p className='font-bold mb-[5px]'>{element.title}</p>
                  <p className='text-[15px] text-gray-500'>{element.location}</p>
                </div>
              </div>
              <button className='text-[#2d5649] bg-[#e9f9ff] font-bold text-[20px] border-none py-[7px] px-0 mt-[10px]'>Open Positions {element.openPositions}</button>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  )
}

export default PopularCompany
