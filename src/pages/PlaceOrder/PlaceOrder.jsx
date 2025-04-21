import React, { useContext } from 'react';
import './PlaceOrder.css';
import { districtCityData } from '../../data/data';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { calculateCaertTotal } from '../../Utils/cartUtlis';
import { assets } from '../../assets/assets';
const PlaceOrder = () => { 
  const {itemList,quantities}=useContext(StoreContext);
  const uniqueItems =Object.values(quantities).filter(qty =>qty >0).length;
  const cartItems =itemList.filter(item =>quantities[item.id] >0);
   const {subtotal,shipping,vat,total} = calculateCaertTotal(cartItems,quantities)
 const navigate = useNavigate()
 const handlePaymentChange = (event)=>{
  const {id } = event.target;

  setPayment(id)
 }
        const [selectedDistrict, setSelectedDistrict] = useState('');
        const [cities, setCities] = useState([]);
      const [payment,setPayment] =useState('esewa')
        const handleDistrictChange = (e) => {
          const district = e.target.value;
          setSelectedDistrict(district);
          setCities(districtCityData[district] || []);
        };
 


  return (
    <div className='container mt-4'>
   

      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">{uniqueItems}</span>
          </h4>
          <ul className="list-group mb-3">

            {
cartItems.map((item)=>(
  <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">{item.name}</h6>
                <small className="text-body-secondary">Qty: {quantities[item.id]}</small>
              </div>
              <span className="text-body-secondary">Rs :{item.price *quantities[item.id]}</span>
            </li>
))
            }
            <li className="list-group-item d-flex justify-content-between" style={{color:"orange"}}>
              <span>Subtotal Rs</span>
              <strong >{subtotal.toFixed(2)}</strong>
            </li>
          
            <li className="list-group-item d-flex justify-content-between"  style={{color:"green"}}>
              <span>VAT@13%</span>
              <strong>{vat.toFixed(2)}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Shipping Rs</span>
              <strong>{shipping.toFixed(2)}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between" style={{color :'tomato'}}>
              <span>Total Rs</span>
              <strong>{total.toFixed(2)}</strong>
            </li>
          </ul>

          <form className="card p-2" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Promo code" />
              <button type="submit" className="btn btn-secondary">Redeem</button>
            </div>
          </form>
        </div>

        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" noValidate onSubmit={(e) => e.preventDefault()}>
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">First name</label>
                <input type="text" className="form-control" id="firstName" required />
                <div className="invalid-feedback">Valid first name is required.</div>
              </div>

              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">Last name</label>
                <input type="text" className="form-control" id="lastName" required />
                <div className="invalid-feedback">Valid last name is required.</div>
              </div>

            

              <div className="col-12">
                <label htmlFor="email" className="form-label">Email <span className="text-body-secondary">(Optional)</span></label>
                <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                <div className="invalid-feedback">Please enter a valid email address for shipping updates.</div>
              </div>
              <div className="col-md-4">
              <label htmlFor="city">Select District:</label>
      <select id="district" value={selectedDistrict} onChange={handleDistrictChange}>
      
        {Object.keys(districtCityData).map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
               
              </div>

              <div className="col-md-4">
              {cities.length > 0 && (
        <>
          <label htmlFor="city">Select City:</label>
          <select id="city">
           
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </>
      )}
                
              </div>
              <div className="col-12">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                <div className="invalid-feedback">Please enter your shipping address.</div>
              </div>



          

              <div className="col-md-3">
                <label htmlFor="zip" className="form-label">Zip</label>
                <input type="text" className="form-control" id="zip" required />
                <div className="invalid-feedback">Zip code required.</div>
              </div>
            </div>

            <hr className="my-4" />

        
           

            <h4 className="mb-3">Payment</h4>

            <div className="form-check d-flex align-items-center mb-3">
  <input
    type="radio"
    id="esewa"
    name="paymentMethod"
    value="esewa"
    className="form-check-input"
    onChange={handlePaymentChange}
    style={{ marginRight: "10px" }} // Adds spacing between radio and image
  />
  <label htmlFor="esewa" className="form-check-label">
    <img
      src={assets.esewa1}
      alt="Esewa"
      style={{
        width: "90px",
        height: "50px",
        cursor: "pointer",
        border: "2px solid transparent",
        borderRadius: "5px",
      }}
      className="img-fluid"
    />
  </label>
</div>

<div className="form-check d-flex align-items-center mb-3">
  <input
    type="radio"
    id="khalti"
    name="paymentMethod"
    value="khalti"
    className="form-check-input"
    onChange={handlePaymentChange}
    style={{ marginRight: "10px" }} // Adds spacing between radio and image
  />
  <label htmlFor="khalti" className="form-check-label">
    <img
      src={assets.khalti1}
      alt="Khalti"
      style={{
        width: "90px",
        height: "50px",
        cursor: "pointer",
        border: "2px solid transparent",
        borderRadius: "5px",
      }}
      className="img-fluid"
    />
  </label>
</div>

<div className="form-check d-flex align-items-center mb-3">
  <input
    type="radio"
    id="cod"
    name="paymentMethod"
    value="cod"
    className="form-check-input"
    onChange={handlePaymentChange}
    style={{ marginRight: "10px" }} // Adds spacing between radio and image
  />
  <label htmlFor="cod" className="form-check-label">
    <img
      src={assets.cod}
      alt="Cash on Delivery"
      style={{
        width: "90px",
        height: "50px",
        cursor: "pointer",
        border: "2px solid transparent",
        borderRadius: "5px",
      }}
      className="img-fluid"
    />
  </label>
</div>

           

            <hr className="my-4" />
<Link to={`/${payment}`}>
<button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
</Link>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
