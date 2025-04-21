
import { Link, useNavigate } from "react-router-dom";
import { calculateCaertTotal } from "../../../Utils/cartUtlis";
import { StoreContext } from "../../../context/StoreContext";
import { assets } from "../../../assets/assets";
import React from "react";
import { useContext } from "react";
export default function Khalti() {
  const { itemList, quantities } = useContext(StoreContext);
  const cartItems = itemList.filter((item) => quantities[item.id] > 0);
  const { total } = calculateCaertTotal(cartItems, quantities);
const navigate = useNavigate()
  return (
    <div className="contact3 py-5">
      <div className="row no-gutters">
        <div className="container">
          <div className="row">
            {/* Image Column */}
            <div className="col-lg-6">
              <div className="card-shadow">
              <img
  src={assets.khalti}
  alt="Contact"
  style={{ width: "80%", height: "90vh" }}
  className="img-fluid"
/>

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
                <form className="mt-4" >
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
          required
        />
      </div>
    </div>

    {/* Centered Submit Button */}
    <div className="col-lg-4 d-flex justify-content-center">
      <button
      onClick={()=>navigate('/success-payment')}
        type="submit"
        className="btn btn-primary mt-2 border-0 px-4 py-2 rounded-pill shadow-sm"
      >
        <span className="text-white font-weight-bold">Confirm payment</span>
      </button>
    </div>

  </div>
</form>
              </div>
            </div>

            {/* Contact Details */}

            {/* End of Contact Details */}
          </div>
        </div>
      </div>
    </div>
  );
}
