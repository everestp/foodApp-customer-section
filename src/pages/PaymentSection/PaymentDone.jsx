import React from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentDone = () => {
    const navigate = useNavigate()
  return (
    <div>
    <div className="mt-5 text-center">
  <h1 style={{ color: "#0056b3" }}>Thank You for Shopping with Us!</h1>
  <p style={{ color: "#007bff", fontSize: "18px" }}>
    We hope you found everything you were looking for. Your satisfaction means
    the world to us! Keep exploring and discover more amazing products.
  </p>
  <button
    className="btn btn-outline-primary px-4 py-2 rounded-pill mt-3"
    onClick={() => navigate('/')}
  >
    Continue Shopping
  </button>
</div>
   


    </div>
  )
}

export default PaymentDone