
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Menubar from './components/Menubar/Menubar'
import Home from './pages/Home/Home'
import ContactUs from './pages/ContactUs/ContactUs'
import Explore from './pages/Explore/Explore'


function App() {
 

  return (
   <div>
   <Menubar/>
 
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/contact' element={<ContactUs/>}/>
    <Route path='/explore' element={<Explore/>}/>
   </Routes>
   </div>
  )
}

export default App
