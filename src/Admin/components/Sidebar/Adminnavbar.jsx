import { Link } from "react-router-dom"
import { assets } from "../../../assets/assets"




const Adminnavbar = ({sideBarVisible}) => {
  return (
    <div className={`border-end bg-white ${sideBarVisible ? '' : 'd-none'}`} id="sidebar-wrapper">
    <div className="sidebar-heading border-bottom bg-light">
      <img src={assets.cart} alt="" height={32} width={32} />
      </div>
           <div className="list-group list-group-flush">
               <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/admin56/add">
             <i className='bi bi-plus-circle me-2'></i>  Add Food</Link>
               <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/admin56/list">
               <i className='bi bi-list-ul me-2'></i>   List Food</Link>
               <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/admin56/order">
               <i className='bi bi-cart me-2'></i>    Orders</Link>
               
           </div>
</div>
  )
}

export default Adminnavbar