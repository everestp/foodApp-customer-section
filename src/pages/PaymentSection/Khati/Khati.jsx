import React, { useContext, useState } from "react";
import { assets } from "../../../assets/assets";
import { StoreContext } from "../../../context/StoreContext";

import { calculateCartTotal } from "../../../Utils/cartUtlis";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { clearCart } from "../../../service/cartService";
const Khalti = () => {
  const { itemList, quantities ,token ,orderId ,setOrderId} = useContext(StoreContext);
  const cartItems = itemList.filter((item) => quantities[item.id] > 0);
  const { total } = calculateCartTotal(cartItems, quantities);
  const [data, setData] = useState({
    PaymentStatus: "Khalti",
    TransactionCode: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (event)=>{
event.preventDefault();
try {
  const response = await paymentDone(data,token ,orderId)
  setOrderId("xxx")
 clearCart(token)
  navigate("/sucess-payment")
  console.log(response)

  
} catch (error) {
  console.log("Error",error)
}

  }
 

  return (
    <div className="contact3 py-5">
      <div className="row no-gutters">
        <div className="container">
          <div className="row">
            {/* Image Column */}
            <div className="col-lg-6">
              <div className="card-shadow">
                <img src={assets.khalti1} className="img-fluid" alt="Contact" />
              </div>
            </div>

            {/* Form Column */}
            <div className="col-lg-6">
              <div className="contact-box ml-3">
                <h1
                  className="font-weight-bold text-center mt-4"
                  style={{ color: "#007bff", fontSize: "1.8rem" }}
                >
                  ❤️ Kindly make a payment of Rs :{" "}
                  <span style={{ fontWeight: "bold", color: "#28a745" }}>
                    {total} /-
                  </span>{" "}
                  ❤️
                </h1>
                <form className="mt-4" onSubmit={handleSubmit}>
                  <div className="align-items-center">
                    {/* Input Field */}
                    <div className="col-lg-4">
                      <div className="form-group mt-2">
                        <p>
                          Enter Transaction Code:
                          <Link style={{ color: "red", textDecoration: "none" }}>
                            Need Help?
                          </Link>
                        </p>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Transaction ID"
                          onChange={handleChange}
                          name="TransactionCode"
                          value={data.TransactionCode}
                          required
                        />
                      </div>
                    </div>

                    {/* Centered Submit Button */}
                    <div className="col-lg-4 d-flex justify-content-center">
                      <button
                      
                        type="submit"
                        className="btn btn-primary mt-2 border-0 px-4 py-2 rounded-pill shadow-sm"
                      >
                        <span className="text-white font-weight-bold">
                          Confirm payment
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Details */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Khalti;