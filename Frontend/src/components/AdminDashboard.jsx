import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      navigate("/");
      return;
    }

    axios.get("http://localhost:8080/api/admin/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Failed to fetch stats", err));
  }, [navigate, user]);

  return (
    <div className="container mt-4">
      <h2 className='fw-bold text-center'>👑 Admin Dashboard</h2>
     
      <button className="btn btn-danger mb-4 float-end" onClick={()=>navigate("/")}>Logout</button>
      <button className="btn btn-info mb-3 float-end me-4" onClick={() => navigate("/admin/files")}>
        View All Files
      </button>

      


      <h4 className='p-4'>📊 Upload Count Per User</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Total Files Uploaded</th>
          </tr>
        </thead>
        <tbody>
          {stats.length > 0 ? (
            stats.map((s, index) => (
              <tr key={index}>
                <td>{s.email}</td>
                <td>{s.fileCount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No uploads yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
