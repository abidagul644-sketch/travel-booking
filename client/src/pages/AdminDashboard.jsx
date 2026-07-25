import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';
import { API_URL } from '../config';

function AdminDashboard() {
  const { showToast } = useToast();
  const [packages, setPackages] = useState([]);
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');

  const fetchPackages = async () => {
    const res = await axios.get(`${API_URL}/api/packages`);
    setPackages(res.data);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/packages`, { destination, description, price, duration });
      showToast('Package added!', 'success');
      setDestination(''); setDescription(''); setPrice(''); setDuration('');
      fetchPackages();
    } catch (error) {
      showToast('Failed to add package', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/packages/${id}`);
      showToast('Package deleted', 'success');
      fetchPackages();
    } catch (error) {
      showToast('Failed to delete', 'error');
    }
  };

  const totalValue = packages.reduce((sum, p) => sum + Number(p.price), 0);

  return (
    <div>
      <Navbar />
      <div className="dashboard-container" style={{ marginTop: '30px' }}>
        <h3 className="section-title">Admin Dashboard 🛠️</h3>

        <div className="admin-stats">
          <div className="stat-card">
            <p className="stat-number">{packages.length}</p>
            <p className="stat-label">📦 Total Packages</p>
          </div>
          <div className="stat-card">
            <p className="stat-number">Rs {totalValue.toLocaleString()}</p>
            <p className="stat-label">💰 Combined Value</p>
          </div>
        </div>

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
            <h4>📋 Manage Packages</h4>
            {packages.length === 0 && (
              <p className="package-meta" style={{ textAlign: 'center', padding: '20px 0' }}>No packages yet. Add your first one!</p>
            )}
            {packages.map((pkg) => (
              <div key={pkg._id} className="admin-package-row">
                <div className="admin-package-info">
                  <strong>{pkg.destination}</strong>
                  <p className="package-meta">Rs {Number(pkg.price).toLocaleString()} · {pkg.duration}</p>
                </div>
                <button className="btn-cancel" onClick={() => handleDelete(pkg._id)}>🗑️ Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;