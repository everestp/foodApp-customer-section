
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";


 export const  register =  async (data)=>{
    try {
         const response = await axios.post(`${BASE_URL}/register`,data)
         return response
    } catch (error) {
        console.log("DEBUG :Unable to register with error"+error)
        throw error
    }

   
}

export const login =  async (data)=>{
        try {
            const response = await axios.post(`${BASE_URL}/login`,data)
            return response
        } catch (error) {
            console.log("DEBUG :Unable to login with error",error)
            throw error
        }
}