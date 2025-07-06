import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


const SearchFiles = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
 const loggedInUserEmail = localStorage.getItem("email");
const navigate = useNavigate();

  const handleSearch = async () => {
  try {
    const res = await axios.post('http://localhost:8080/api/user/search', null, {
      params: { keyword: keyword,email: loggedInUserEmail }  // ✅ this must match backend param name!
    });
    setResults(res.data);
  } catch (err) {
    console.error("Search failed", err);
    alert("No files found or error occurred.");
  }
};

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/api/user/delete/${id}`, {
  params: { email: loggedInUserEmail }
});
alert("File deleted successfully!");


    // Optional: remove from frontend list
    setResults(results.filter(file => file.id !== id));
  } catch (err) {
    console.error("Delete failed", err);
    alert("Failed to delete the file.");
  }
};


  return (
    <div className="container mt-4">
      <h3>🔍 Search Files by Keyword</h3>
      <div className="d-flex mb-2">

      <input
        type="text"
        className="form-control me-2"
        placeholder="Enter keyword(s), comma-separated"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        />
      <button className="btn btn-outline-info float-end me-2" onClick={handleSearch}>Search</button>
      <button className="btn btn-secondary" onClick={() => navigate("/user")}>⬅ Back</button>

        </div>

      <div className="mt-4">
        {results.length > 0 ? (
          results.map(file => (
  <div key={file.id} className="card mb-3 p-3">
    <h5>{file.filename}</h5>
    <p><strong>Uploaded by:</strong> {file.uploadedBy}</p>

    <div className="d-flex gap-2">
      <a
        href={`http://localhost:8080/api/user/download/${file.id}`}
        className="btn btn-success"
        target="_blank"
        rel="noopener noreferrer"
      >
        📥 Download
      </a>

      <button
        className="btn btn-danger"
        onClick={() => handleDelete(file.id)}
      >
        ❌ Delete
      </button>
    </div>
  </div>
))


) : (
          <p>No files found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchFiles;
