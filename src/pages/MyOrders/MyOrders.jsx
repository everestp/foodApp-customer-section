import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { AP_URL } from "../../service/baseURl";

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const getStatusClass = (orderStatus) => {
    switch (orderStatus) {
      case "Payment Received":
        return "bg-success"; // Blue for payment received
      case "Order Confirmed":
        return "bg-info"; // Light blue for order confirmed
      case "Quality Check":
        return "bg-warning"; // Yellow for quality check
      case "Dispatched":
        return "bg-secondary"; // Gray for dispatched
      case "In Transit":
        return "bg-info"; // Light gray for in transit
      case "Out for Delivery":
        return "bg-success"; // Green for out for delivery
      case "Delivered":
        return "bg-success"; // Green for delivered
      case "Canceled":
        return "bg-danger"; // Red for canceled
      case "Returned":
        return "bg-danger"; // Red for returned
      default:
        return "bg-secondary"; // Default gray for unknown or unrecognized statuses
    }
  };
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${AP_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      console.log("This is the order data:", response.data); // Fixed typo here
    } catch (error) {
      console.error("Failed to fetch orders:", error.response || error); // Improved error handling
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
        <table
  className="table table-striped table-hover table-bordered text-center"
  style={{ backgroundColor: "#f9f9f9", borderRadius: "10px", overflow: "hidden" }}
>
  <thead className="table-dark">
    <tr>
      <th>Parcel</th>
      <th>Order Items</th>
      <th>Amount</th>
      <th>Total Items</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {data.map((order, index) => (
      <tr
        key={order.id}
        style={{
          backgroundColor: index % 2 === 0 ? "#e9ecef" : "#ffffff", // Alternating row colors
        }}
      >
        <td>
          <img
            src={assets.parcel}
            alt="Parcel Icon"
            height={48}
            width={48}
            className="rounded"
          />
        </td>
        <td>
          <span className="d-block text-muted">
            {order.orderItems?.map((item, idx) =>
              `${item.name} X ${item.quantity}${idx === order.orderItems.length - 1 ? "" : ", "}`
            ) || "No items available"}
          </span>
        </td>
        <td>
          <span style={{ color: "green", fontWeight: "bold" }}>Rs {order.amount}</span>
        </td>
        <td>
          <span className="badge bg-info text-light">{order.orderItems?.length || 0}</span>
        </td>
        <td>
          <span
            className={`badge ${getStatusClass(order.orderStatus)} text-capitalize`}
          >
            {order.orderStatus}
          </span>
        </td>
        <td>
          <button
            className="btn btn-sm btn-primary"
            onClick={fetchOrders}
          >
            <i className="bi bi-arrow-clockwise"></i> Refresh
          </button>
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

export default MyOrders;