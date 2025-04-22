import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Orders from '../Admin/Orders'
import AddFood from '../pages/AddFood/AddFood'
import ListFood from '../pages/ListFood/ListFood'
import MyOrders from '../pages/MyOrders/MyOrders'

const AdminRoutes = () => {
  return (
    <div>
                    <Routes>
                 
                        <Route path="/order" element={<Orders/>} />
                        <Route path='/add' element={<AddFood/>}/>
                        <Route path='/list' element ={<ListFood/>}/>
                       
                    </Routes>
                </div>
           
  )
}

export default AdminRoutes