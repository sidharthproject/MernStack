import React,{useEffect}from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import HeroSection from './HeroSection'
import HowItWorks from './HowItWorks'
import PopularCategory from './PopularCategory'
import PopularCompany from './PopularCompany'
function Home() {
  const Authorized = useSelector(state=>state.auth.isAuthorized)

  if(!Authorized){
    <Navigate to={'/login'}/>
  }
  return (
    <section className='HomePage page'>
       <HeroSection/>
       <HowItWorks/>
       <PopularCategory/>
       <PopularCompany/>
    </section>
  )
}

export default Home