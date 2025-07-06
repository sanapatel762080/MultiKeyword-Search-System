import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/register", formData);
      alert(res.data);
      if (res.data === "Registration successful") navigate('/');
    } catch (err) {
      alert("Registration failed!");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center">📝 Register</h2>
      <form onSubmit={handleRegister}>
        <input name="name" type="text" placeholder="Full Name" className="form-control my-2"
          value={formData.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="form-control my-2"
          value={formData.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="form-control my-2"
          value={formData.password} onChange={handleChange} required />
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
