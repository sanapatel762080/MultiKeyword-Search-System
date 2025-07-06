import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import dayjs from 'dayjs';



const MyUploadedFiles = () => {
  const [files, setFiles] = useState([]);
  const [searchText, setSearchText] = useState('');

  const email = localStorage.getItem("email"); // ✅ direct fetch

  useEffect(() => {
    if (email) {
      fetchMyFiles(email);
    }
  }, [email]);

  const fetchMyFiles = async (email) => {
    try {
      const res = await axios.get("http://localhost:8080/api/user/my-files", {
        params: { email }
      });
      setFiles(res.data);
    } catch (err) {
      console.error("Failed to fetch files", err);
    }
  };

  if (!email) {
    return <Navigate to="/login" />;
  }

  const filteredFiles = files.filter(file =>
    file.filename.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3>📄 My Uploaded Files</h3>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by filename"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {filteredFiles.length === 0 ? (
        <p>No files found.</p>
      ) : (
        filteredFiles.map(file => (
          <div key={file.id} className="card mb-3 p-3">
            <h5>{file.filename}</h5>
            <p><strong>Uploaded by:</strong> {file.uploadedBy}</p>

<p><strong>Uploaded on:</strong> {dayjs(file.uploadDate).format('DD MMM YYYY, hh:mm A')}</p>
            <p className="text-muted">🔒 Only accessible via keyword search</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyUploadedFiles;
