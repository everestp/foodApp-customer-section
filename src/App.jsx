import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Menubar from './components/Menubar/Menubar';
import Home from './pages/Home/Home';
import ContactUs from './pages/ContactUs/ContactUs';
import Explore from './pages/Explore/Explore';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Cart from './pages/Cart/Cart';
import { ToastContainer } from 'react-toastify';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Esewa from './pages/PaymentSection/Esewa/Esewa;';
import PaymentDone from './pages/PaymentSection/PaymentDone';
import Khalti from './pages/PaymentSection/Khati/Khati';
import Cod from './pages/PaymentSection/COD/Cod';
import MyOrders from './pages/MyOrders/MyOrders';

import { useContext } from 'react';
import { StoreContext } from './context/StoreContext';

import Orders from './Admin/Orders';
import Admin from './Admin/Admin';

function App() {
  const location = useLocation(); // Hook to get the current route path
 const {token}=useContext(StoreContext)
  // Check if the current path is login or signup
  const hideMenubar = location.pathname === '/login' || location.pathname === '/signup' || location.pathname ==='/admin';

  return (
    <div>
      {/* Show Menubar only if the current path is NOT login or signup */}
      {!hideMenubar && <Menubar />}
<ToastContainer/>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/login' element={token ? <Home/>: <Login />} />
        <Route path='/signup' element={token ? <Home/> : <Register />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={token ? <PlaceOrder/> :<Login/>}/>
        <Route path='/esewa' element={ token ? <Esewa/> : <Login/>}/>
        <Route path='/khalti' element={ token ? <Khalti/> : <Login/>}/>
        <Route path='/cod' element={<Cod/>}/>
        <Route path='/myorder' element={token ? <MyOrders/> : <Login/>}/>
        <Route path='/allorder' element={<Orders/>}/>
        <Route path='/admin56/*' element={<Admin/>}/>

        <Route path='/sucess-payment' element={<PaymentDone/>}/>

      </Routes>
    </div>
  );
}

export default App;