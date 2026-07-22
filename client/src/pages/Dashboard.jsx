import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/packages');
        setPackages(res.data);
      } catch (error) {
        console.log('Error fetching packages:', error);
      }
    };
    fetchPackages();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user?.name || 'Traveler'}! 🌍</h2>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>

      <h3 className="section-title">Available Travel Packages</h3>

      <div className="packages-grid">
        {packages.map((pkg) => (
          <div key={pkg._id} className="package-card">
            <h4>{pkg.destination}</h4>
            <p>{pkg.description}</p>
            <p><strong>Duration:</strong> {pkg.duration}</p>
            <p className="package-price">Rs {pkg.price}</p>
            <button className="btn-book">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;