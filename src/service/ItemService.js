import axios from "axios";

const API_URL = "http://localhost:8080/api/foods";

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