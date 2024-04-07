import { Link } from "react-router-dom"


function NotFound() {
  return (
    <div>
       <section className=' flex items-center justify-center mb-[200px]'>
          <div className="flex flex-col items-center">
            <img src="/notfound.png" className="md:h-[500px] h-[200px]" alt="notfound" />
            <Link className="text-[20px] font-[500] py-[7px] px-[30px] bg-transparent border-[1px] border-solid border-[#184235] text-[#184235] decoration-none hover:bg-[#184235] hover:text-[#f1f3f6] hover:transition-all duration-[0.3]"  to={'/'}>RETURN TO HOME PAGE</Link>
          </div>
        </section>
    </div>
  )
}

export default NotFound