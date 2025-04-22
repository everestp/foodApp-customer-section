import axios from "axios";
import { AP_URL } from "./baseURl";

const API_URL = `${AP_URL}/api/cart`;

export const addTocartService = async (foodId,token)=>{
    try {
        const response  = await axios.post(
            API_URL,
             {"foodId":foodId},
             { headers: { "Authorization": `Bearer ${token}` } }
           ); 
 
           return response
     } catch (error) {
        console.log(("DEBUG :Error while  Adding items",error))
         throw error
     }
}

export const removeQtyFromCart = async (foodId,token) =>{
    try {
         await axios.post(
            `${API_URL}/remove`,
            {"foodId":foodId},
            { headers: { "Authorization": `Bearer ${token}` } }
          );
          
    } catch (error) {
        console.log(("DEBUG :Error while  Removing items",error))
        throw error
    }
}

export const getCartData = async (token) =>{
    try {
        const resposnse =  await axios.get(API_URL,{ headers: { "Authorization": `Bearer ${token}` } })
       return resposnse.data.items
    } catch (error) {
        console.log(("DEBUG :Error while  fetching cart data",error))
         throw error
    }
}

export const clearCart = async(token) =>{
  

    try {
        const response = await axios.delete(`${API_URL}`, { headers: { "Authorization": `Bearer ${token}` } })
        setQunatities({})
        return response;
    } catch (error) {
        toast.error("Error while clearing cart")
        throw error
    }
   
}