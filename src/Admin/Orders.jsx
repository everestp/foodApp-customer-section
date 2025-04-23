import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import {AP_URL} from "../service/baseURl"
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";

const Orders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  // Function to display payment status
  const displayPaymentStatus = (paymentStatus, TransactionCode) => {
    if (paymentStatus === "COD") {
      return "COD";
    } else if (paymentStatus === "Not Paid") {
      return "Not Paid";
    } else {
      return `${paymentStatus}-${TransactionCode}`;
    }
  };

  // Function to fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${AP_URL}/api/orders/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      console.log("This is the order data", response.data); // Corrected console.log
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  // Function to update order status
  const updateStatus = async (event, orderId) => {
    try {

        const response = await axios.patch(`${AP_URL}/api/orders/status/${orderId}?status=${event.target.value}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
     
      if (response.status === 200) {
        await fetchOrders(); // Refresh orders after a successful update
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          <table className="table table-responsive">
            <tbody>
              {data.map((order, index) => (
                <tr key={index}>
                  <td>
                    <img src={assets.parcel} alt="Order Icon" height={48} width={48} />
                  </td>
                  <td>
                  <div style={{ borderBottom: "1px solid #ddd", padding: "10px 0", fontSize: "16px" }}>
  <strong>Order Items:</strong> 
  <span style={{ color: "#555" }}>
    {order.orderItems?.map((item, idx) => 
      `${item.name} X ${item.quantity}${idx === order.orderItems.length - 1 ? "" : ", "}`
    ) || "No items available"}
  </span>
</div>

<div style={{
  backgroundColor: "#f8f9fa",
  borderRadius: "5px",
  padding: "10px",
  marginTop: "10px",
  fontSize: "14px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
}}>
  <strong>Address:</strong> 
  <p style={{ color: "#333", margin: 0 }}>{order.userAddress || "No address provided"}</p>
</div>
                  </td>
                  <td>
                    <span style={{ color: "red" }}>Rs {order.amount}</span>
                  </td>
                 
                  
                  <td className="text-capitalize">
                    {displayPaymentStatus(order.paymentStatus, order.transactionCode)}
                  </td>
                  <td>
                    <select
                      className="form-control"
                      value={order.orderStatus}
                      onChange={(e) => updateStatus(e, order.id)} // Added onChange handler
                    >
                      <option value="Payment Received">Payment Verified</option>
                      <option value="Order Confirmed">Order Confirmed</option>
                      <option value="Quality Check">Under Quality Check</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Canceled">Order Canceled</option>
                      <option value="Returned">Order Returned</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;