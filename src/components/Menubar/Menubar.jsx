import React, { useContext, useEffect, useState } from "react";
import "./Menubar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Menubar = () => {
  const [active,setActive]=useState('home')
  const {quantities,token,setToken,setQuantities} = useContext(StoreContext)
   const uniqueItems =Object.values(quantities).filter(qty =>qty >0).length;
  const navigate = useNavigate()

  const logout =() =>{
    localStorage.removeItem('token');
    setToken("")
    setQuantities("")
    navigate("/")
    
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
  <Link to={'/'}>
  <h1
  style={{
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#007BFF',
    fontFamily: "Pacifico",
    margin: "15px"
  
  }}
>
  Carten
</h1>
  </Link>


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={active==='home'? "nav-link fw-bold active":"nav-link"} to="/" onClick={()=>setActive('home')}>
                Home
             </Link>
            </li>
            <li className="nav-item">
              <Link className= {active==='explore'? "nav-link fw-bold active":"nav-link"} to="/explore"onClick={()=>setActive('explore')}>
                Explore
             </Link>
            </li>
            <li className="nav-item">
              <Link className={active==='contact-us'? "nav-link fw-bold active":"nav-link"}to="/contact" onClick={()=>setActive('contact-us')}>
                Contact us
             </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-4">
          <Link to={'/cart'}>
          <div className="position-relative">
              
              <img src={assets.cart} alt="" height={32} width={32} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">{uniqueItems}</span>
            </div>
              </Link>
            
          {
            !token ?(
              <>
              
              <Link to={'/login'}>
            <button className="btn btn-outline-primary">Login</button>
            </Link>
           <Link to={'/signup'}>
           <button className="btn btn-outline-success">Register</button>
           </Link>
              </>
            ):(
              <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://avatar.iran.liara.run/public"
                
                  width="32"
                  height="32"
                  className="rounded-circle"
                />
              </a>
        
              <ul className="dropdown-menu text-small">
                <li>
                  <button className="dropdown-item" onDoubleClick={()=>navigate("/admin56/*")} onClick={() => navigate("/myorder")}>
                    Orders
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={()=>navigate("/admin56")}>
                    Admin
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>

            )
          }
           
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
