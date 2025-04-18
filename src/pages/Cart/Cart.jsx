import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './Cart.css'
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
const Cart = () => {
     const {itemList,increaseQty,decreaseQty,quantities,removeFromCart}=useContext(StoreContext);

     //cart items
     const cartItems =itemList.filter(item =>quantities[item.id] >0);

     //calcualting
     const subtotal = cartItems.reduce((acc,item)=>acc + item.price * quantities[item.id],0);
     const shipping = subtotal ===0 ?0.0:10
     const vat = subtotal *0.13
     const total = subtotal + shipping +vat;


 

  return (
    <div className="container py-5">
      <h1 className="mb-5">Your Shopping Cart</h1>
      <div className="row">
        <div className="col-lg-8">
         {
            cartItems.length == 0? (
                <h3>Cart is Empty</h3>
            ):(

                <div className="card mb-4">
                <div className="card-body">
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <div className="row cart-item mb-3 align-items-center">
                        <div className="col-md-3">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="img-fluid rounded"
                          />
                        </div>
                        <div className="col-md-5">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="text-muted">Category: {item.category}</p>
                        </div>
                        <div className="col-md-2">
                          <div className="input-group">
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              type="button"
                              onClick={() => decreaseQty(item.id)}
                            >
                              -
                            </button>
                            <input
                              style={{ maxWidth: "100px" }}
                              type="text"
                              className="form-control form-control-sm text-center quantity-input"
                              value={quantities[item.id]}
                              readOnly
                            />
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              type="button"
                              onClick={() => increaseQty(item.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="col-md-2 text-end">
                          <p className="fw-bold">
                            Rs {(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>


            )
         }
          <div className="text-start mb-4">
            <Link to={'/explore'} className="btn btn-outline-primary">
             
              <i className="bi bi-arrow-left me-2"></i>
              Continue Shopping
            </Link>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card cart-summary">
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>Rs {subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <span>Rs {shipping.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>  VAT</span>
                <span>Rs {vat.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong>Rs {total.toFixed(2)}</strong>
              </div>
              <button className="btn btn-primary w-100">Proceed to Checkout</button>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Apply Promo Code</h5>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Enter promo code" />
                <button className="btn btn-outline-secondary" type="button">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
