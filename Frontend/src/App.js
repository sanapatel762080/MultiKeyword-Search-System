import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import UserFiles from './components/UserFiles';
import AdminFiles from './components/AdminFiles';
import ForgotPassword from './components/ForgotPassword';
import SearchFiles from './components/SearchFiles';
import MyUploadedFiles from './components/MyUploadedFiles';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/user" element={
          <ProtectedRoute allowedRole="USER">
            <UserDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute allowedRole="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/user/files" element={
          <ProtectedRoute allowedRole="USER">
            <UserFiles />
          </ProtectedRoute>
        } />

        <Route path="/admin/files" element={
          <ProtectedRoute allowedRole="ADMIN">
            <AdminFiles />
          </ProtectedRoute>
        } />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/search" element={<SearchFiles />} />

        <Route path="/user/my-files" element={<MyUploadedFiles />} />


 

      </Routes>
    </BrowserRouter>
  );
}

export default App;
