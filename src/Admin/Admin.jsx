
import { useState } from 'react'

import { Route } from 'react-router-dom'




import { ToastContainer} from 'react-toastify'

import AdminRoutes from '../Routes/AdminRoutes'
import Adminnavbar from './components/Sidebar/Adminnavbar'
import Adminmenubar from './components/Menubar/Adminmenubar'
const Admin = () => {
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const toggleSideBar = () =>setSideBarVisible(!sideBarVisible);
   
  return (
<div className="d-flex" id="wrapper">
       
            <div className="border-end bg-white" id="sidebar-wrapper">
              
             <Adminnavbar sideBarVisible={sideBarVisible}/>
            </div>
      
            <div id="page-content-wrapper">
              
             <Adminmenubar toggleSideBar={toggleSideBar}/>
             <ToastContainer/>
                <div className="container-fluid">
                  <AdminRoutes/>
                </div>
            </div>
        </div>
  )
}

export default Admin

