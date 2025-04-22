import axios from "axios";
import { AP_URL } from "./baseURl";
const API_URL = `${AP_URL}/api/foods`;
 export const addFood = async(foodData,image) => {
    const formData = new FormData();
    formData.append('food', JSON.stringify(foodData));
    formData.append('file',image);


    try {
  await axios.post(API_URL, formData,{headers:{"Content-Type":"multipart/form-data"}})
     
    } catch (error) {
        console.log("DEBUG:Error Adding Food ",error);
       throw error;
    }

   
}
export const getFoodList = async ()=>{
try {
    const response =  await axios.get(API_URL);
        return response.data;
     
} catch (error) {
    console.log("DEBUG:Error Fetching Food List ",error);
    throw error;
}
}

export const deleteFood = async (foodId)=>{
    try {
        const response = await axios.delete(API_URL + "/"+foodId);
        return response.status ==204;
       
    } catch (error) {
       console.log("DEBUG:Error Deleting Food ",error);
       throw error; 
    }
   
}