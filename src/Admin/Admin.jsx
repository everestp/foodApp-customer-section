
import { useState } from 'react'

import { Route } from 'react-router-dom'
import AddFood from './pages/AddFood/AddFood'
import ListFood from './pages/ListFood/ListFood'
import Orders from './pages/Orders/Orders'

import Menubar from './components/Menubar/Menubar'

import { Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Sidebar/Navbar'
import { ToastContainer} from 'react-toastify'

const App = () => {
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const toggleSideBar = () =>setSideBarVisible(!sideBarVisible);
   
  return (
<div className="d-flex" id="wrapper">
       
            <div className="border-end bg-white" id="sidebar-wrapper">
              
             <Navbar sideBarVisible={sideBarVisible}/>
            </div>
      
            <div id="page-content-wrapper">
              
             <Menubar toggleSideBar={toggleSideBar}/>
             <ToastContainer/>
                <div className="container-fluid">
                    <Routes>
                        <Route path="/add" element={<AddFood/>} />
                        <Route path="/list" element={<ListFood/>} />
                        <Route path="/order" element={<Orders/>} />
                        <Route path="/" element={<ListFood/>} />
                    </Routes>
                </div>
            </div>
        </div>
  )
}

export default App

