import { createContext, useEffect, useState } from "react";
import { fetchItemList } from "../service/ItemService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {  addTocartService, getCartData, removeQtyFromCart } from "../service/cartService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [itemList, setItemList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const increaseQty = async (foodId) => {
    setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
 await addTocartService(foodId,token)
  };

  const addtoCart = (id) => {
    increaseQty(id);
    toast.success("Added to Cart");

    navigate("/cart");
  };

  const decreaseQty = async (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0,
    }));
 await removeQtyFromCart(foodId,token);
  };

  const removeFromCart = (foodId) => {
    setQuantities((prevQuantities) => {
      const updateQuantities = { ...prevQuantities };
      delete updateQuantities[foodId];
      toast.error("Items Removed");
      return updateQuantities;
    });
  };

  const loadCartData = async (token)=>{
   const items = await getCartData(token)
   setQuantities(items)

  }

  const contextValue = {
    itemList,
    increaseQty,
    decreaseQty,
    quantities,
    removeFromCart,
    addtoCart,
    token,
    setToken,
    setQuantities,
    loadCartData
  };

  useEffect(() => {
    async function loadData() {
      const data = await fetchItemList();
      setItemList(data);
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
       await  loadCartData(localStorage.getItem("token"))
      }
      console.log(data);
    }
    loadData();
  }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
