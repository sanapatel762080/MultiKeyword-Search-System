import React, { useEffect, useState, fetchFiles } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminFiles = () => {
    const [files, setFiles] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    // ✅ 1. Fetch all files (for admin)
    const fetchFiles = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/all-files");
            setFiles(res.data);
        } catch (err) {
            console.error("Failed to fetch files", err);
        }
    };

    // ✅ 2. Call it on first load
    useEffect(() => {
        if (!user || user.role !== "ADMIN") {
            navigate("/");
            return;
        }
        fetchFiles();
    }, [user, navigate]);

    // ✅ 3. Delete file and refresh list
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this file?")) {
            try {
                await axios.delete(`http://localhost:8080/api/delete-file/${id}`);
                alert("File deleted successfully!");
                fetchFiles(); // 🔁 refresh list
            } catch (err) {
                alert("Failed to delete.");
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
            <h2 className='text-center'>📊 All Uploaded Files (Admin View)</h2>
            <button className="btn btn-secondary mb-3" onClick={() => navigate("/admin")}>⬅ Back</button>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Filename</th>
                        <th>Encrypted Keywords</th>
                        <th>Uploaded By</th>
                        <th>Action</th>
                        <th>Downloads</th>
                    </tr>
                </thead>
                <tbody>
                    {files.length > 0 ? (
                        files.map(file => (
                            <tr key={file.id}>
                                <td>{file.filename}</td>
                                <td>{file.encryptedKeywords}</td>
                                <td>{file.uploadedBy}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(file.id)}>
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
                            <td colSpan="4">No files found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminFiles;
