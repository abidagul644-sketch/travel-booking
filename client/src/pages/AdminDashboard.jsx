import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import { API_URL } from '../config';

function AdminDashboard() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [packages, setPackages] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');

  const fetchAll = async () => {
    try {
      const [pkgRes, usersRes, bookingsRes] = await Promise.all([
        axios.get(`${API_URL}/api/packages`),
        axios.get(`${API_URL}/api/auth/users`),
        axios.get(`${API_URL}/api/bookings/all`)
      ]);
      setPackages(pkgRes.data);
      setUsers(usersRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.log('Error fetching admin data:', error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/packages`, { destination, description, price, duration });
      showToast('Package added!', 'success');
      setDestination(''); setDescription(''); setPrice(''); setDuration('');
      fetchAll();
    } catch (error) {
      showToast('Failed to add package', 'error');
    }
  };

  const handleDeletePackage = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/packages/${id}`);
      showToast('Package deleted', 'success');
      fetchAll();
    } catch (error) {
      showToast('Failed to delete', 'error');
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      await axios.put(`${API_URL}/api/bookings/cancel/${id}`);
      showToast('Booking cancelled', 'success');
      fetchAll();
    } catch (error) {
      showToast('Failed to cancel', 'error');
    }
  };

  const revenue = bookings.filter((b) => b.paymentStatus === 'Paid').reduce((sum, b) => sum + Number(b.price), 0);

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">✈️ TravelEase</div>
        <nav className="admin-nav">
          <div className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>📊 Dashboard</div>
          <div className={`admin-nav-item ${activeTab === 'packages' ? 'active' : ''}`} onClick={() => setActiveTab('packages')}>📦 Packages</div>
          <div className={`admin-nav-item ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>📅 Bookings</div>
          <div className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>👥 Users</div>
        </nav>
        <div className="admin-nav-item" style={{ marginTop: 'auto', color: '#f87171' }} onClick={() => navigate('/dashboard')}>← Back to Site</div>
      </aside>

      <main className="admin-main">
        {activeTab === 'dashboard' && (
          <>
            <h2 className="section-title">Dashboard</h2>
            <div className="admin-stats">
              <div className="stat-card">
                <p className="stat-number">{users.length}</p>
                <p className="stat-label">👥 Users</p>
              </div>
              <div className="stat-card">
                <p className="stat-number">{packages.length}</p>
                <p className="stat-label">📦 Packages</p>
              </div>
              <div className="stat-card">
                <p className="stat-number">{bookings.length}</p>
                <p className="stat-label">📅 Bookings</p>
              </div>
              <div className="stat-card">
                <p className="stat-number">Rs {revenue.toLocaleString()}</p>
                <p className="stat-label">💰 Revenue</p>
              </div>
            </div>

            <div className="admin-table-card" style={{ marginTop: '25px' }}>
              <h4>Recent Bookings</h4>
              {bookings.slice(0, 5).map((b) => (
                <div key={b._id} className="admin-package-row">
                  <div className="admin-package-info">
                    <strong>{b.destination}</strong>
                    <p className="package-meta">{b.user?.name || 'Unknown'} — Rs {b.price}</p>
                  </div>
                  <span className={`status-badge ${b.status === 'Cancelled' ? 'cancelled' : 'confirmed'}`}>{b.status}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'packages' && (
          <>
            <h2 className="section-title">Manage Packages</h2>
            <div className="admin-grid">
              <div className="admin-form-card">
                <h4>➕ Add New Package</h4>
                <form onSubmit={handleAdd}>
                  <div className="form-group">
                    <label>Destination</label>
                    <input type="text" placeholder="e.g. Paris, France" value={destination} onChange={(e) => setDestination(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input type="text" placeholder="Short trip description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Price (Rs)</label>
                    <input type="number" placeholder="e.g. 15000" value={price} onChange={(e) => setPrice(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input type="text" placeholder="e.g. 4 Days / 3 Nights" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                  </div>
                  <button type="submit" className="btn-primary">Add Package</button>
                </form>
              </div>

              <div className="admin-table-card">
                <h4>📋 All Packages</h4>
                {packages.length === 0 && <p className="package-meta">No packages yet.</p>}
                {packages.map((pkg) => (
                  <div key={pkg._id} className="admin-package-row">
                    <div className="admin-package-info">
                      <strong>{pkg.destination}</strong>
                      <p className="package-meta">Rs {Number(pkg.price).toLocaleString()} · {pkg.duration}</p>
                    </div>
                    <button className="btn-cancel" onClick={() => handleDeletePackage(pkg._id)}>🗑️ Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'bookings' && (
          <>
            <h2 className="section-title">All Bookings</h2>
            <div className="admin-table-card">
              {bookings.length === 0 && <p className="package-meta">No bookings yet.</p>}
              {bookings.map((b) => (
                <div key={b._id} className="admin-package-row">
                  <div className="admin-package-info">
                    <strong>{b.destination}</strong>
                    <p className="package-meta">👤 {b.user?.name || 'Unknown'} ({b.user?.email || 'N/A'})</p>
                    <p className="package-meta">Rs {b.price} · Payment: {b.paymentStatus}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={`status-badge ${b.status === 'Cancelled' ? 'cancelled' : 'confirmed'}`}>{b.status}</span>
                    {b.status !== 'Cancelled' && (
                      <button className="btn-cancel" onClick={() => handleCancelBooking(b._id)}>Cancel</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <>
            <h2 className="section-title">Registered Users</h2>
            <div className="admin-table-card">
              {users.length === 0 && <p className="package-meta">No users yet.</p>}
              {users.map((u) => (
                <div key={u._id} className="admin-package-row">
                  <div className="admin-package-info">
                    <strong>{u.name}</strong>
                    <p className="package-meta">{u.email} · Joined {new Date(u.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className="status-badge confirmed">Active</span>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;