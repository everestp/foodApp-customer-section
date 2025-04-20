import React, { useContext } from 'react';
import './PlaceOrder.css';
import { districtCityData } from '../../data/data';
import { useState } from 'react';

import { StoreContext } from '../../context/StoreContext';
import { calculateCaertTotal } from '../../Utils/cartUtlis';
const PlaceOrder = () => { 
  const {itemList,increaseQty,decreaseQty,quantities,removeFromCart}=useContext(StoreContext);
  const uniqueItems =Object.values(quantities).filter(qty =>qty >0).length;
  const cartItems =itemList.filter(item =>quantities[item.id] >0);
   const {subtotal,shipping,vat,total} = calculateCaertTotal(cartItems,quantities)
 

        const [selectedDistrict, setSelectedDistrict] = useState('');
        const [cities, setCities] = useState([]);
      const [payment,setPayment] =useState('')
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

            <div className="my-3">
              <div className="form-check">
                <input id="credit" name="paymentMethod" type="radio" className="form-check-input" defaultChecked required />
                <label className="form-check-label" htmlFor="credit">Credit card</label>
              </div>
              <div className="form-check">
                <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required />
                <label className="form-check-label" htmlFor="debit">Esewa</label>
              </div>
              <div className="form-check">
                <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required />
                <label className="form-check-label" htmlFor="paypal">Khalti</label>
              </div>
              <div className="form-check">
                <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required />
                <label className="form-check-label" htmlFor="paypal">Cash on delivery</label>
              </div>
            </div>

           

            <hr className="my-4" />

            <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
