import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleVerifyEmail = (e) => {
    e.preventDefault();
    setStep(2);
    setMessage('');
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('❌ Passwords do not match');
      return;
    }
    try {
      await axios.post(`${API_URL}/api/auth/reset-password`, { email, newPassword });
      setMessage('✅ Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1800);
    } catch (error) {
      setMessage(error.response?.data?.message || '❌ Something went wrong');
      setStep(1);
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password 🔑</h2>

      {step === 1 && (
        <form onSubmit={handleVerifyEmail}>
          <p className="package-meta" style={{ marginBottom: '15px' }}>
            Enter your account email to continue.
          </p>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary">Continue</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleReset}>
          <p className="package-meta" style={{ marginBottom: '15px' }}>
            Set a new password for <strong>{email}</strong>
          </p>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength="6" />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength="6" />
          </div>
          <button type="submit" className="btn-primary">Reset Password</button>
        </form>
      )}

      {message && <p className="error-msg" style={{ color: message.includes('✅') ? '#16a34a' : '#e74c3c' }}>{message}</p>}

      <p className="link-text">
        Remembered your password? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;