import axios from "axios";
import { toast } from "react-toastify";

import { useState,useEffect } from "react";
import { deleteFood, getFoodList } from "../../service/foodService";

const ListFood = () => {
    const [list, setList] = useState([]);
    const fetchList = async ()=>{
     
        try {
           const data =  await getFoodList()
           setList(data);
        } catch (error) {
            console.log("DEBUG:Error Fetching Items List ",error);
            toast.error("Error Fetching Items List")
        }
}
useEffect(()=>{
    fetchList()
},[])
const removeItem  = async (foodId) => {
try {
    const success = await deleteFood(foodId);
    if(success){
       toast.success("Items Removed") 
       await fet();
    }
    else{
        toast.error("Error Removing Items")
    }
} catch (error) {
    toast.error("Error Removing Items")
    console.log("DEBUG:Error Removing Items ",error);
}

}
  return (
    <div className=""py-5 row justify-content-center>
<div className="col-11 card">
    <table className="table">
        <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {
            list.map((item,index)=>{
                return(
                    <tr key={index}>
                        <td>
                            <img src={item.imageUrl} alt="" width={50} height={50} className="rounded-circle" />
                        </td>
<td>{item.name}</td>
<td>{item.category}</td>
<td>Price:  ₨ {item.price}</td>
<td className="text-danger">
    <i className="bi bi-x-circle-fill" onClick={()=>removeItem(item.id)}></i>
</td>
                    </tr>
                )

            })
          }
        </tbody>
    </table>
</div>
    </div>
  )
}

export default ListFood