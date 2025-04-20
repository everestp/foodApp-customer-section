import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../service/AuthService";
import { toast } from "react-toastify";
import { useState } from "react";
import { StoreContext } from "../../context/StoreContext";
const Login = () => {
  const navigate = useNavigate()
  const {setToken ,loadCartData} = useContext(StoreContext)
    const [data, setData] = useState({
      email: "",
      password: ""
    });

    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setData((prev) => ({
        ...prev,
        [name]: value
      }));
  
      // Email validation
     
     
    };
     const onSubmit = async(event)=>{
      event.preventDefault()
      try {
        const response = await login(data)
        if(response.status ==200){
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token)
          loadCartData(localStorage.getItem("token"));
          toast.success("Login Success")
          navigate('/')
          
        }
        
      } catch (error) {
        console.log("DEBUG :unable to login",error)
        toast.error("Unable to Login")
      }
     }
  
  
  return (
    <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <div className="card shadow-lg w-100" style={{ maxWidth: "480px" }}>
        <div className="card-body">
          <div className="text-center">
            <h4>Welcome to <span
             style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#007BFF',
                fontFamily: "Pacifico",
                margin: "15px"
              
              }}
            
            
            >carten</span></h4>
            <h1 className="card-title h3">Sign in</h1>
            <p className="card-text text-muted">Sign in below to access your account</p>
          </div>
          <div className="mt-4">
          <form  onSubmit={onSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="form-label text-muted">Email Address</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  className="form-control"
                  id="email"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label text-muted">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="d-grid">
                <button  className="btn btn-dark btn-lg" type="submit">Sign in</button>
              </div>
              <p className="text-center text-muted mt-4">
                Don't have an account yet?{" "}
                <Link to={'/signup'} className="text-decoration-none">Register</Link>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;