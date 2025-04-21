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

function App() {
  const location = useLocation(); // Hook to get the current route path

  // Check if the current path is login or signup
  const hideMenubar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div>
      {/* Show Menubar only if the current path is NOT login or signup */}
      {!hideMenubar && <Menubar />}
<ToastContainer/>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/esewa' element={<Esewa/>}/>
        <Route path='/khalti' element={<Khalti/>}/>
        <Route path='/cod' element={<Cod/>}/>

        <Route path='/success-payment' element={<PaymentDone/>}/>

      </Routes>
    </div>
  );
}

export default App;