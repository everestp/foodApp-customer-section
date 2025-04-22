import axios from "axios";
import { AP_URL } from "./baseURl";

const API_URL = `${AP_URL}/api/foods`;

 export const fetchItemList = async () => {

    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log("DEBUG: Error fetching item list:", error);
        throw error;
    }
   
}
 export  const fetchFoodDetail = async (id) => {
    try {
        const response =  await axios.get(API_URL+"/"+id)
        console.log(id);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log("DEBUG: Error fetching food detail:", error);
        throw error;        
    }
      
     

    }