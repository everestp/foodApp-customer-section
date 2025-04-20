import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { register } from "../../service/AuthService";
const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [conpass, setConPass] = useState('');
  const [error, setError] = useState('');
  const [perror, setPerror] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Email validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setError(emailRegex.test(value) ? '' : 'Invalid email address');
    }

    // Reset password mismatch error when password changes
    if (name === "password" && conpass) {
      setPerror(value === conpass ? '' : 'Passwords do not match');
    }
  };

  const handleConfirmPassChange = (event) => {
    const value = event.target.value;
    setConPass(value);

    if (value !== data.password) {
      setPerror("Passwords do not match");
    } else {
      setPerror('');
    }
  };

  const handleSubmit =  async (event) => {
    event.preventDefault();
    console.log(data)

    // Final validation
    if (!data.email) {
      setError("Email is required");
      return;
    }

    if (data.password !== conpass) {
      setPerror("Passwords do not match");
      return;
    }

    try {
      const response = await register(data)  ;
      if(response.status ===201){
        toast.success("Register Successfull ,Please Login")
        navigate('/login')
      }
    } catch (error) {
      toast.error("Unable to register")
    }

  };

  return (
    <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <div className="card shadow-lg w-100" style={{ maxWidth: "480px" }}>
        <div className="card-body">
          <div className="text-center">
            <h4>
              <span
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#007BFF',
                  fontFamily: "Pacifico",
                  margin: "15px"
                }}
              >
                carten
              </span>
            </h4>
            <h1 className="card-title h3">Register Here...</h1>
            <p className="card-text text-muted">Sign up below to create your account</p>
          </div>
          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="form-label text-muted">Full Name</label>
                <input
                  name="name"
                  onChange={handleChange}
                  value={data.name}
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="form-label text-muted">Email Address</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  value={data.email}
                  required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label text-muted">Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={data.password}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="conpassword" className="form-label text-muted">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="conpassword"
                  placeholder="Retype Password"
                  required
                  name="conpassword"
                  onChange={handleConfirmPassChange}
                  value={conpass}
                />
                {perror && <p style={{ color: 'red' }}>{perror}</p>}
              </div>

              <div className="d-grid">
                <button  className="btn btn-dark btn-lg "type="submit">Sign up</button>
              </div>

              <p className="text-center text-muted mt-4">
                Already have an account? <Link to="/login">Sign in</Link>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
