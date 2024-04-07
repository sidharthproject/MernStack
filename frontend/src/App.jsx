import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Component/Layout/Navbar'
import Footer from './Component/Layout/Footer'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAuthorized } from './store/authSlice'
import { setUser } from './store/authSlice'

function App() {
  const Authorized = useSelector(state=>state.auth.isAuthorized)
 const dispatch = useDispatch()
 useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/user/getuser",{ withCredentials: true });
      console.log(response.data);
      dispatch(setIsAuthorized(true));
      dispatch(setUser(response.data.user));
    } catch (error) {
      dispatch(setIsAuthorized(false));
      console.log(error);
    }
  };

  fetchUser();
}, [Authorized]);




 
  return (
    <>
   <div className=''>
      <div className=''>
     
   
     <Navbar/>
     <Outlet/>
     <Footer/>
      </div>
      <Toaster/>
    </div>
</>
  )
}

export default App
