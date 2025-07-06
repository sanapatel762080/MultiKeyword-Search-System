import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';



const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        email,
        password
      });

      if (res.data.error) {
        alert(res.data.error);
        return;
      }

      // Save full user info and email in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("email", res.data.email); // ✅ optional for simpler access

      // Redirect based on role
      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/user");
      }

    } catch (err) {
      alert("Login failed!");
      console.error(err);
    }
  };

  return (
    <div style={{height:"100vh", width:"100vw",backgroundColor:'#2a003f',display:'flex'}}>

    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center text-white">🔐 Login</h2> <br /><br />
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" className="form-control my-2"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="form-control my-2"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-primary w-100">Login</button>
      </form>
      <div className="text-center mt-3">
       <span className='text-white'>New User?</span> <button className="btn btn-link" onClick={() => navigate('/register')}>Register Here</button> <br />
        <p style={{ marginTop: '10px' }}>
          <span className='text-white'>Forgot Password?</span> <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;
