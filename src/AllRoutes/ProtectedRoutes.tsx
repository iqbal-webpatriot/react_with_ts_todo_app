import React,{useContext} from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../ContextApi/UserAuthContext/AuthContext'

export default function ProtectedRoutes() {
 const {loggedUser}=useContext(AuthContext)
 console.log('logged user ',loggedUser)
  return (
    <>
    { loggedUser && loggedUser.token!==''?<Outlet/>:<Navigate to={'/login'}/>}
    </>
  )
     
}
