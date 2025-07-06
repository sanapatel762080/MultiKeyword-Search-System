import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [keywords, setKeywords] = useState('');
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !keywords) {
      alert("File and keywords are required.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("keywords", keywords.toLowerCase().trim());
    formData.append("email", user.email);

    const cleaned = keywords
      .split(',')
      .map(k => k.trim().toLowerCase())
      .join(',');
    formData.append("keywords", cleaned);


    try {
      const res = await axios.post("http://localhost:8080/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert(res.data);
      setFile(null);
      setKeywords('');
      navigate("/user"); // 🔁 Redirect to uploaded files page

    } catch (err) {
      alert("Upload failed.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className='fw-bold text-primary text-center'>Welcome</h2>
      <p className='text-center text-info fw-bold'>You are logged in as <b>User</b></p>
      <button className="btn btn-danger mb-4 float-end" onClick={handleLogout}>Logout</button>

      <Link to="/user/my-files"
        className="btn btn-outline-primary mx-2 float-end">
        📄 My Files
      </Link>

      <Link to="/user/search">
        <button className="btn btn-outline-primary float-end">
          🔍 Search Files
        </button>
      </Link>


      <h4>📤 Upload File with Keywords</h4>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="form-control my-2" />
        <input type="text" placeholder="Enter keywords (comma separated)"
          value={keywords} onChange={(e) => setKeywords(e.target.value)} className="form-control my-2" />
        <button className="btn btn-primary align-self-center">Upload</button>
      </form>
    </div>
  );
};

export default UserDashboard;
