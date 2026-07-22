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
    <div style={{ maxWidth: '900px', margin: '50px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Welcome, {user?.name || 'Traveler'}! 🌍</h2>
        <button onClick={handleLogout} style={{ padding: '10px 20px' }}>Logout</button>
      </div>

      <h3 style={{ marginTop: '30px' }}>Available Travel Packages</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {packages.map((pkg) => (
          <div key={pkg._id} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px' }}>
            <h4>{pkg.destination}</h4>
            <p>{pkg.description}</p>
            <p><strong>Duration:</strong> {pkg.duration}</p>
            <p><strong>Price:</strong> Rs {pkg.price}</p>
            <button style={{ padding: '8px 16px', width: '100%' }}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;