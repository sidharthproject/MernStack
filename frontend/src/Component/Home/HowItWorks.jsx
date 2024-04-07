import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="bg-[#e7edf7] mt-[30px] md:p-8">
        <div className="max-w-full min-w-full flex flex-col justify-center my-0 mx-auto   items-center py-[50px] px-0 gap-[50px]">
          <h3 className="text-[25px] font-bold ">How JobZee Works</h3>
          <div className="flex flex-col  md:flex-row justify-between gap-[25px]">
            <div className=" bg-[#fff] flex text-center items-center h-[100px] flex-col flex-1 w-[350px] md:w-auto md:h-[300px] py-[30px] px-[50px] gap-[12px] justify-center">
              <FaUserPlus className="text-[30px] text-[#2d5649]" />
              <p className="text-[#18191c] font-[500]">Create Account</p>
              <p className="text-[14px] text-gray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div>
            <div className=" bg-[#18191c] flex text-center items-center flex-col flex-1 w-[350px] md:w-auto h-[300px] py-[20px] px-[50px] gap-[12px] justify-center">
              <MdFindInPage className="text-[30px] text-[#2d5649]" />
              <p className="text-[#fff]">Find a Job/Post a Job</p>
              <p className="text-[14px] text-gray-100">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet beatae delectus aperiam quaerat magni.
              </p>
            </div>
            <div className=" bg-[#fff] flex text-center items-center flex-col flex-1 w-[350px] md:w-auto h-[300px] py-[30px] px-[50px] gap-[12px] justify-center">
              <IoMdSend className="text-[30px] text-[#2d5649]" />
              <p className="text-[#18191c] font-[500]">Apply For Job/Recruit Suitable Candidates</p>
              <p className="text-[14px] text-gray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, culpa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;