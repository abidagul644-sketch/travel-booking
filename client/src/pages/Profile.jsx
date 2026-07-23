import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';

function Profile() {
  const { showToast } = useToast();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/auth/profile/${user.id}`, {
        name, phone, address
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      showToast('Profile updated!', 'success');
    } catch (error) {
      showToast('Update failed', 'error');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/auth/change-password/${user.id}`, {
        currentPassword, newPassword
      });
      setPasswordMsg('✅ Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      showToast('Password changed!', 'success');
    } catch (error) {
      setPasswordMsg(error.response?.data?.message || '❌ Failed to change password');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container" style={{ marginTop: '30px', maxWidth: '650px' }}>
        <h3 className="section-title">My Profile</h3>

        <div className="profile-card" style={{ marginBottom: '25px' }}>
          <div className="profile-avatar">{user?.name?.charAt(0).toUpperCase() || '👤'}</div>
          <h2>{user?.name}</h2>
          <p className="package-meta">📧 {user?.email}</p>
        </div>

        <div className="admin-form-card" style={{ marginBottom: '20px' }}>
          <h4>Edit Profile</h4>
          <form onSubmit={handleUpdateProfile}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Email (cannot be changed)</label>
              <input type="email" value={user?.email} disabled style={{ background: '#f1f5f9' }} />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="03XX-XXXXXXX" />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="City, Country" />
            </div>
            <button type="submit" className="btn-primary">Save Changes</button>
          </form>
        </div>

        <div className="admin-form-card">
          <h4>Change Password</h4>
          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn-primary">Change Password</button>
            {passwordMsg && <p style={{ marginTop: '10px', fontSize: '14px' }}>{passwordMsg}</p>}
          </form>
        </div>
      </div>
      <div className="footer">
        <p>© 2026 TravelEase. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Profile;