import axios from "axios";
import { UserInputType } from "../components/Auth/Login";

export const loginApiHandler = (loginData:UserInputType)=>{
    return axios.post(`${process.env.REACT_APP_API_URL}/login`,loginData)
}