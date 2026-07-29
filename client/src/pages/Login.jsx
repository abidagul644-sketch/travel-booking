import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { API_URL } from '../config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      showToast('Login successful!', 'success');
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="split-auth">
      <div className="split-auth-image">
        <div className="split-auth-overlay"></div>
        <div className="split-auth-content">
          <div className="auth-logo-white">✈️ TravelEase</div>
          <h2>Explore The World With Confidence</h2>
          <p>Book flights, hotels, and holiday packages — all in one place.</p>
        </div>
      </div>

      <div className="split-auth-form">
        <div className="split-auth-form-inner">
          <h2>Welcome Back 👋</h2>
          <p className="auth-subtitle">Log in to continue planning your next trip</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group"></div>