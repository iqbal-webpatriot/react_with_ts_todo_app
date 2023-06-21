import React from 'react'
import {useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { loginApiHandler } from '../../services/Api'
import { AuthContext } from '../../ContextApi/UserAuthContext/AuthContext'
import { sanitizeInput } from '../../Utils/DomPurify'
//*defining type for error message
export type ErrorType ={
    //  email: string ,
    //  password: string,
    //  invalidLoginMsg: string
    [key:string]:string
}
//*defining type for user login input 
export type UserInputType={
   email: string,
   password: string
}
//! validation pattern for user login input
export const EMAIL_PATTERN =  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
export const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export default function Login() {
  //!error and user login input state
  const [errorMessage,setErrorMessage]=useState<ErrorType>({} as ErrorType);
  const [userLoginInput,setUserLoginInput] = useState<UserInputType>({} as UserInputType);
  const {updateUser}= useContext(AuthContext) || {}
  const navigate= useNavigate()
  //!user input handler function
  const  userInputHandler=(e:React.FormEvent<HTMLInputElement>):void=>{
     const {name,value}=e.currentTarget;
     const sanitizedValue= sanitizeInput(value); //?sanitization
     setUserLoginInput({...userLoginInput,[name]:sanitizedValue});
     setErrorMessage({email:'',password:'',invalidLoginMsg:''})
  }
//!handling login process
  const loginReqHandler= async (e:React.SyntheticEvent)=>{
    e.preventDefault();
     try {
      const { email, password } = userLoginInput;
      //** checking empty field validation */
      if (!email &&  !password) {
        setErrorMessage({ email: "This field is required.",password: "This field is required",invalidLoginMsg:''});
        return;
      }
      else if (!email) {
        setErrorMessage({ email: "This field is required.",password:'',invalidLoginMsg:''});
        return;
      }
     else   if ( !password) {
        setErrorMessage({password: "This field is required",email:'',invalidLoginMsg:''});
        return;
      }
      
       //! validation check for email and password 
       if(email && !EMAIL_PATTERN.test(email)) {
        setErrorMessage({email:'Invalid email format.',password:'',invalidLoginMsg:''});
        return
     }
     if(password && !PASSWORD_PATTERN.test(password)) {
       setErrorMessage({password:'Password must be alphanumeric of minimum 8 character.',email:'',invalidLoginMsg:''});
     
       return
    }
    //!calling api for login request 
     const {status,data}= await loginApiHandler(userLoginInput);
     if(status==200) {
      const {token,user}=data;
       updateUser({
         token,
         firstName:user.firstName,
         lastName:user.lastName,
         email:user.email,
         phone:user.phone,
         gender:user.gender,
         user_Id:user.user_Id,
         profile_pic:user.profile_pic
       })
       navigate('/dashboard')
     }
      
     } catch (error) {
       setErrorMessage({email:'',password:'',invalidLoginMsg:"Please check your email or password"})
       console.log('error',error);
     }

  }

  return (
   <>
   
   <div className="container mx-auto my-32">
      <form>
      <div className=" sm:w-full lg:w-1/2 xl:w-1/2 border    mx-auto h-auto  gap-1  shadow grid place-items-center p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-14 h-1w-14 border  border-green-400  text-green-500  rounded-full p-3 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <div className="lg:w-2/3 sm:w-full   gap-1 flex flex-col justify-start    px-10 py-2">
            {errorMessage.email? <p className=" text-sm text-red-500">{errorMessage.email}</p>: <p className=" text-md ">Email</p>}
            <input
              type="text"
              name="email"
              onChange={userInputHandler}
              className="px-5 mb-2 py-3 border "
              placeholder="i.e user@gmail.com"
            />
            
            {errorMessage.password? <p className=" text-sm text-red-500">{errorMessage.password}</p>: <p className=" text-md ">Password</p>}
            <input
              type="password"
              onChange={userInputHandler}
              name="password"
              className="px-5 mb-4 py-3 border "
              placeholder="password"
            />
            
            <button
              type="submit"
              onClick={loginReqHandler}
              className="w-full p-2 mb-2 rounded font-medium text-md text-slate-900 bg-orange-300"
            >
              Login
            </button>
             {errorMessage.invalidLoginMsg && <p className="  text-sm text-center text-red-500">{errorMessage.invalidLoginMsg}</p>}
           
          
          </div>
        
        </div>
      </form>
        
      </div>
   </>
  )
}
