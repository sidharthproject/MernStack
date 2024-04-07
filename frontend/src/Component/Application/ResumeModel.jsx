import React from 'react'

function ResumeModel({imageUrl,onClose}) {
  return (
    <div> 
      <div className="w-full flex bg-[#00000085] h-full fixed top-0 left-0">
    <div className="w-full h-full flex items-center justify-center relative">
      <span className="absolute right-[36px] top-[35px] text-[50px] text-[#d9534f] hover:cursor-pointer" onClick={onClose}>
        &times;
      </span>
      <img className='md:max-w-[500px] max-w-[300px] h-auto' src={imageUrl} alt="resume" />
    </div>
  </div>
  </div>
  )
}

export default ResumeModel 