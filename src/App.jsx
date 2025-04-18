
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Menubar from './components/Menubar/Menubar'
import Home from './pages/Home/Home'
import ContactUs from './pages/ContactUs/ContactUs'
import Explore from './pages/Explore/Explore'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Cart from './pages/Cart/Cart'
import { ToastContainer } from 'react-toastify'

function App() {
 

  return (
   <div>
   <Menubar/>
<ToastContainer/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/contact' element={<ContactUs/>}/>
    <Route path='/explore' element={<Explore/>}/>
    <Route path='/product/:id' element={<ProductDetails/>}/>
    <Route path='/cart' element={<Cart/>}/>
   </Routes>
   </div>
  )
}

export default App
