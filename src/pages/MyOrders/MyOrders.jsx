import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";


const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      console.log("This is ther  osrder  data ",data)
    } catch (error) {
      console.error("Failed to fetch orders:", error);
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
              {data.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={order.iamgeUrl} alt="" height={48} width={48} />
                    </td>
                    <td>
                      {/* Use optional chaining and fallback to ensure safety */}
                      {order.orderItems?.map((item, idx) => {
                        if (idx === order.orderItems.length - 1) {
                          return item.name + " X " + item.quantity;
                        } else {
                          return item.name + " X " + item.quantity + " ";
                        }
                      }) || "No items available"} {/* Fallback if orderItems is null */}
                    </td>

                    <td>Rs: {order.amount}</td>
                    <td>Items: {order.orderItems?.length || 0}</td> {/* Fallback if orderItems is null */}
                    <td className="text-capitalize">{order.orderStatus}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={fetchOrders}
                      >
                        <i className="bi bi-arrow-clockwise"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;