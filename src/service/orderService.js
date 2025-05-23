import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";
import { AP_URL } from "./baseURl";

const API_URL =`${AP_URL}/api/orders`


export const createOrder = async (orderData ,token)=>{
useContext
    try {
        const response = await axios.post(`${API_URL}/create`,orderData, { headers: { "Authorization": `Bearer ${token}` } })
        return response
    } catch (error) {
        throw error
    }
   
}

 export const deleteOrder = async(orderId,token) =>{


    try {
        const response = await axios.delete(`${API_URL}/delete/${orderId}`, { headers: { "Authorization": `Bearer ${token}` } })
        return response  
    } catch (error) {
        toast.error("Error while Deleting items")
        throw error
    }
   
}


export const paymentDone = async (paymentData,token ,orderId) => {
try {
  
    const response = await axios.patch(`${API_URL}/${orderId}/paymentStatus`,paymentData, { headers: { "Authorization": `Bearer ${token}` }})
       return response;
 
} catch (error) {
    toast.error("Error while payment")
    console.log("ERror in opaytment",error)
    throw error
}
}

