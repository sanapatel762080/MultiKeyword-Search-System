import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const requestOtp = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/forgot-password/request-otp?email=${email}`);
      setMsg(res.data);
      setStep(2);
    } catch (err) {
      setMsg("Email not found");
    }
  };

  const resetPassword = async () => {
    try {
      const res = await axios.put(`http://localhost:8080/api/forgot-password/reset`, null, {
        params: { email, otp, newPassword }
      });
      setMsg(res.data);
    } catch (err) {
      setMsg("OTP invalid or reset failed");
    }
  };

  return (
    <div className="container mt-4">
    <button className="btn btn-secondary mb-3 float-end" onClick={() => navigate("/")}>⬅ Back</button>

      <h3>🔐 Forgot Password</h3>
      {step === 1 && (
        <>
          <input type="email" className="form-control mb-2" placeholder="Enter Email"
            value={email} onChange={e => setEmail(e.target.value)} />
          <button className="btn btn-primary" onClick={requestOtp}>Get OTP</button>
        </>
      )}
      {step === 2 && (
        <>
          <input type="text" className="form-control mb-2" placeholder="Enter OTP"
            value={otp} onChange={e => setOtp(e.target.value)} />
          <input type="password" className="form-control mb-2" placeholder="New Password"
            value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          <button className="btn btn-success" onClick={resetPassword}>Reset Password</button>
        </>
      )}
      {msg && <div className="alert alert-info mt-2">{msg}</div>}
    </div>
  );
};

export default ForgotPassword;
