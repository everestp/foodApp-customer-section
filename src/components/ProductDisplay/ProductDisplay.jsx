import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import ProductItem from "../../ProductItem/ProductItem";
const ProductDisplay = ({category,searchText}) => {
  const { itemList } = useContext(StoreContext);
  const lowerCaseSearchText = typeof searchText === "string" ? searchText.toLowerCase() : "";
  const filteredItems = itemList.filter(food => 
     (
        (category === "All" || food.category === category) &&
        food.name.toLowerCase().includes(lowerCaseSearchText)
    )
);
  return (
    <div className="container">
      <div className="row">
        {filteredItems.length > 0 ? (
          filteredItems.map((item,index) => (
           <ProductItem key={index} 
           name={item.name} 
           description={item.description} 
           id={item.id}
           imageUrl={item.imageUrl}
           price={item.price}

           
           
           />
          ))

          
        ) : (
          <div className="text-center mt-4">
            <h4>No items available</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDisplay;
