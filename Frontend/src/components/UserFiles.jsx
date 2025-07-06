import React, { useEffect, useState, fetchMyFiles } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserFiles = () => {
  const [files, setFiles] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFiles, setFilteredFiles] = useState([]);

  const base64Encrypt = (keyword) => {
    return btoa(keyword.trim());
  };

  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredFiles(files);
      return;
    }

    const keywords = searchTerm.split(',').map(k => base64Encrypt(k));

    const matchedFiles = files.filter(file =>
      keywords.every(k => file.encryptedKeywords.includes(k))
    );

    setFilteredFiles(matchedFiles);
  };




  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    axios.get(`http://localhost:8080/api/user-files?email=${user.email}`)
      .then(res => {
        setFiles(res.data);
        setFilteredFiles(res.data); // default show all
      }).catch(err => console.error("Failed to fetch files", err));
  }, [user, navigate]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        await axios.delete(`http://localhost:8080/api/delete-file/${id}`);
        alert("File deleted successfully!");
        fetchMyFiles(); // refresh
      } catch (err) {
        console.error("Delete failed", err);
        alert("Failed to delete file.");
      }
    }
  };

  const handleDownload = async (id) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/download/${id}`, {
      responseType: 'blob' // important for binary file
    });

    const blob = new Blob([res.data]);
    const downloadUrl = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = "file"; // optional: can improve by attaching filename from server
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (err) {
    alert("Download failed");
    console.error(err);
  }
};

  return (
    <div className="container mt-4">
      <h2>📁 Uploaded Files</h2>
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/user")}>⬅ Back</button>

      <div className="mb-3 d-flex">
        <input
          type="text"
          placeholder="Enter keywords (comma separated)"
          className="form-control me-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>


      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Filename</th>
            <th>Encrypted Keywords</th>
            <th>Action</th>
            <th>Downloads</th>
          </tr>

        </thead>
        <tbody>
          {filteredFiles.length > 0 ? (
            filteredFiles.map(file => (
              <tr key={file.id}>
                <td>{file.filename}</td>
                <td>{file.encryptedKeywords}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(file.id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button className="btn btn-sm btn-success me-2" onClick={() => handleDownload(file.id)}>
                    Download
                  </button>
                  
                </td>


              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No matching files found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserFiles;
