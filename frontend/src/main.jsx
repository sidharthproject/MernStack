import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './Component/Auth/Login.jsx'
import SignUp from './Component/Auth/SignUp.jsx'
import Home from './Component/Home/Home.jsx'
import Jobs from './Component/Job/Jobs.jsx'
import JobDetail from './Component/Job/JobDetail.jsx'
import PostJob from './Component/Job/PostJob.jsx'
import MyJob from './Component/Job/MyJob.jsx'
import Application from './Component/Application/Application.jsx'
import MyApplication from './Component/Application/MyApplication.jsx'
import NotFound from './Component/NotFound/NotFound.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux' 
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<SignUp/>    
  },
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/job/getAll',
    element:<Jobs/>
  },
  {
    path:"/job/:id",
    element:<JobDetail/>
  },
  {
    path:"/job/post",
    element:<PostJob/>
  },
  {
    path:"/job/me",
    element:<MyJob/>
  },
  {
    path:"/application/:id",
    element:<Application/>
  },
  {
    path:"/application/me",
    element:<MyApplication/>
  },{
    path:"*",
    element:<NotFound/>
  }
]}
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store ={store}>
        <RouterProvider router ={router}/>
    </Provider>
  
  </React.StrictMode>,
)
