import React from 'react'
import { assets } from '../../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../../context/StoreContext'
import { paymentDone } from '../../../service/orderService'
const Cod = () => {

  const {token ,orderId ,setOrderId} = useContext(StoreContext);
    const navigate = useNavigate()

 const handleCod = async  ()=>{

  const datacod = {
    PaymentStatus: "COD",
    TransactionCode: "COD",
  }
  try {
    const response = await paymentDone(datacod,token ,orderId)
    setOrderId("xxx")
    navigate("/sucess-payment")
    console.log(response)
  
    
  } catch (error) {
    console.log("Error",error)
  }
  
 }
    
  return (
    <div>


<div style={{ backgroundColor: "#f0f8ff", minHeight: "100vh", padding: "20px" }}>
  <div
    style={{
      maxWidth: "600px",
      margin: "0 auto",
      textAlign: "center",
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: "#ffffff",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    }}
  >
    <h1 style={{ color: "#0056b3" }}>Thank You for Your Order!</h1>
    <p style={{ color: "#007bff", fontSize: "18px", marginTop: "10px" }}>
      You've selected <strong>Cash on Delivery</strong> as your payment method.
    </p>
    <p style={{ color: "#666", fontSize: "16px", margin: "20px 0" }}>
      Your order has been placed successfully. Please have the exact amount ready when your order is delivered.
    </p>
    <img
      src={assets.cod}
      alt="Cash on Delivery"
     
    />
    <button
    className="btn btn-outline-primary px-4 py-2 rounded-pill mt-3"
    onClick={handleCod}
  >
   Confirm Order
  </button>
  </div>
</div>
    </div>
  )
}

export default Cod