import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';

function AdminDashboard() {
  const { showToast } = useToast();
  const [packages, setPackages] = useState([]);
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');

  const fetchPackages = async () => {
    const res = await axios.get('http://localhost:5000/api/packages');
    setPackages(res.data);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/packages', { destination, description, price, duration });
      showToast('Package added!', 'success');
      setDestination(''); setDescription(''); setPrice(''); setDuration('');
      fetchPackages();
    } catch (error) {
      showToast('Failed to add package', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/packages/${id}`);
      showToast('Package deleted', 'success');
      fetchPackages();
    } catch (error) {
      showToast('Failed to delete', 'error');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container" style={{ marginTop: '30px' }}>
        <h3 className="section-title">Admin Dashboard 🛠️</h3>

        <div className="admin-stats">
          <div className="stat-card">
            <p className="stat-number">{packages.length}</p>
            <p className="stat-label">Total Packages</p>
          </div>
        </div>

        <div className="admin-grid">
          <div className="admin-form-card">
            <h4>Add New Package</h4>
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label>Destination</label>
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Price (Rs)</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input type="text" placeholder="e.g. 4 Days / 3 Nights" value={duration} onChange={(e) => setDuration(e.target.value)} required />
              </div>
              <button type="submit" className="btn-primary">Add Package</button>
            </form>
          </div>

          <div className="admin-table-card">
            <h4>Manage Packages</h4>
            {packages.map((pkg) => (
              <div key={pkg._id} className="admin-package-row">
                <div>
                  <strong>{pkg.destination}</strong>
                  <p className="package-meta">Rs {pkg.price} — {pkg.duration}</p>
                </div>
                <button className="btn-cancel" onClick={() => handleDelete(pkg._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;