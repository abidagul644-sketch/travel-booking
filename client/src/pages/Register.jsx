import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/auth/register`, { name, email, password });
      setMessage('Registered successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="split-auth">
      <div className="split-auth-image">
        <div className="split-auth-overlay"></div>
        <div className="split-auth-content">
          <div className="auth-logo-white">✈️ TravelEase</div>
          <h2>Start Your Journey Today</h2>
          <p>Join thousands of travellers booking their dream vacations with us.</p>
        </div>
      </div>

      <div className="split-auth-form">
        <div className="split-auth-form-inner">
          <div className="split-auth-badge">✨ Join Us Today</div>
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join us and start planning your dream vacation</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your full name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="password-input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a password"
                />
                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>
            <button type="submit" className="btn-primary">Register</button>
            {message && <p className="error-msg" style={{ color: '#7C3AED' }}>{message}</p>}
          </form>
          <p className="link-text">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;