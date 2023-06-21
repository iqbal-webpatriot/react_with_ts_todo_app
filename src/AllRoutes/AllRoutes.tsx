import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../components/Home/Home'
import Login from '../components/Auth/Login'
import ProtectedRoutes from './ProtectedRoutes'
import Dashboard from '../components/Dashboard/Dashboard'
import UserProfile from '../components/User/MyProfile'
export default function AllRoutes() {
  return (
    <>
       <Routes>
          {/*//?? public routes */}
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
         <Route path ='/myprofile' element={<UserProfile/>} />
        {/* //! protected routes for authenticated users only  */}
        <Route element={<ProtectedRoutes/>}>
        
        </Route>

     </Routes>
    </>
  )
}
