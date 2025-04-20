import React, { useContext } from "react";
import "./ProductItem.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
const ProductItem = ({ name, description, id, imageUrl, price }) => {
  const {addtoCart } = useContext(StoreContext);
  return (
    <div className="col-12 col-sm-6  col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
      <div className="card " style={{ maxWidth: "320px" }}>
        <Link to={`/product/${id}`}>
          <div>
            <img src={imageUrl} className="card-img-top" alt="Product Image" />
          </div>
        </Link>

        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="h5 mb-0">Rs {price}</span>
            <div>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-half text-warning"></i>
              <small className="text-muted">(4.5)</small>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between bg-light">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => addtoCart(id)}
          >
            {" "}
            <i className="bi bi-cart-plus"></i> Add to Cart 
          </button>
          <button className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
