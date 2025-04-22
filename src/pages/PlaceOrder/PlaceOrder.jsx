import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { districtCityData } from '../../data/data';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

import { assets } from '../../assets/assets';
import { calculateCartTotal } from '../../Utils/cartUtlis';
import axios from 'axios';
import { toast } from 'react-toastify';
import { createOrder, paymentDone } from '../../service/orderService';

const PlaceOrder = () => {
  const { itemList, quantities ,token ,setOrderId,orderId} = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    district: '',
    city: '',
    zip: '',
    paymentMethod: ''
  });
 

  const codHandle =async (datacod ,token,orderId)=>{
    
try {
  const response = await paymentDone(datacod,token ,orderId)
  setOrderId("xxx")

  console.log(response)

  
} catch (error) {
  console.log("Error",error)
}
  }

 

  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [cities, setCities] = useState([]);

  const handleDistrictChange = (event) => {
    const district = event.target.value;
    setSelectedDistrict(district);
    setCities(districtCityData[district] || []);
    setData((prevData) => ({ ...prevData, district }));
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler =  async (event) => {
    event.preventDefault();
  //handle cod
   
  
    console.log(data);
const orderData ={
  userAddress:`${data.firstName} ${data.lastName} ,${data.address}  ,${data.district} ,${data.city} ,${data.zip}`,

  phoneNumber:data.phoneNumber,
  email:data.email,
  orderItems: cartItems.map(item => ({
    foodId: item.foodId,
    quantity: quantities[item.id],
    price: item.price * quantities[item.id],
    category: item.category,
    imageUrl: item.imageUrl,
    description: item.description,
    name: item.name
  })),
amount:total.toFixed(2),
orderStatus:"Verifying Payment"

};

try {
  const response = await createOrder(orderData,token)

  if(response.status ===201){
    setOrderId(response.data.id)

    toast.success("Order Place Proceed to Payment")
   

    navigate(`/${data.paymentMethod}`)
  }
} catch (error) {
  toast.error("Unable to place Order")
}
console.log("This is the order data tghat is semd to api",orderData)

  };

  const deleteOrder = async(orderId) =>{

  }

  const uniqueItems = Object.values(quantities).filter((qty) => qty > 0).length;
  const cartItems = itemList.filter((item) => quantities[item.id] > 0);
  const { subtotal, shipping, vat, total } = calculateCartTotal(cartItems, quantities);

  return (
    <div className="container mt-4">
      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">{uniqueItems}</span>
          </h4>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">{item.name}</h6>
                  <small className="text-body-secondary">Qty: {quantities[item.id]}</small>
                </div>
                <span className="text-body-secondary">Rs: {item.price * quantities[item.id]}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between" style={{ color: "orange" }}>
              <span>Subtotal</span>
              <strong>{subtotal.toFixed(2)}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between" style={{ color: "green" }}>
              <span>VAT@13%</span>
              <strong>{vat.toFixed(2)}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Shipping</span>
              <strong>{shipping.toFixed(2)}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between" style={{ color: "tomato" }}>
              <span>Total</span>
              <strong>{total.toFixed(2)}</strong>
            </li>
          </ul>
        </div>

        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" onSubmit={onSubmitHandler}>
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={data.firstName}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={data.lastName}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <div className="col-sm-6">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <div className="col-sm-6">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="district" className="form-label">District</label>
                <select
                  id="district"
                  className="form-select"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  required
                >
                  <option value="">Select a district</option>
                  {Object.keys(districtCityData).map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="city" className="form-label">City</label>
                <select
                  id="city"
                  className="form-select"
                  name="city"
                  value={data.city}
                  onChange={onChangeHandler}
                  required
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={data.address}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="zip" className="form-label">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  name="zip"
                  value={data.zip}
                  onChange={onChangeHandler}
                  required
                />
              </div>
            </div>

            <hr className="my-4" />

            <h4 className="mb-3">Payment</h4>

            {['esewa', 'khalti', 'cod'].map((method) => (
              <div className="form-check d-flex align-items-center mb-3" key={method}>
                <input
                  type="radio"
                  id={method}
                  name="paymentMethod"
                  value={method}
                  className="form-check-input"
                  onChange={onChangeHandler}
                  required
                />
                <label htmlFor={method} className="form-check-label">
                  <img
                    src={assets[method]}
                    alt={method}
                    className="img-fluid"
                    style={{
                      width: "90px",
                      height: "50px",
                      cursor: "pointer",
                      border: "2px solid transparent",
                      borderRadius: "5px"
                    }}
                  />
                </label>
              </div>
            ))}

            <button className="w-100 btn btn-primary btn-lg" type="submit">
              Continue to checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;