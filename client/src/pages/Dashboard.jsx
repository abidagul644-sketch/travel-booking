import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [packages, setPackages] = useState([]);
  const [bookingMsg, setBookingMsg] = useState('');

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

  const handleBooking = async (pkg) => {
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        userId: user.id,
        packageId: pkg._id,
        destination: pkg.destination,
        price: pkg.price,
        duration: pkg.duration
      });
      setBookingMsg(`✅ ${pkg.destination} booked successfully!`);
      setTimeout(() => setBookingMsg(''), 3000);
    } catch (error) {
      setBookingMsg('❌ Booking failed. Try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user?.name || 'Traveler'}! 🌍</h2>
        <div>
          <button onClick={() => navigate('/bookings')} className="btn-primary" style={{ marginRight: '10px', width: 'auto', padding: '10px 20px' }}>My Bookings</button>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </div>

      {bookingMsg && <p style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', marginBottom: '15px' }}>{bookingMsg}</p>}

      <h3 className="section-title">Available Travel Packages</h3>

      <div className="packages-grid">
        {packages.map((pkg) => (
          <div key={pkg._id} className="package-card">
            <h4>{pkg.destination}</h4>
            <p>{pkg.description}</p>
            <p><strong>Duration:</strong> {pkg.duration}</p>
            <p className="package-price">Rs {pkg.price}</p>
            <button className="btn-book" onClick={() => handleBooking(pkg)}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;