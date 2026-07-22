import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Dashboard() {
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
    <div>
      <Navbar />

      <div className="hero">
        <h1>Explore The World 🌍</h1>
        <p>Discover amazing destinations at unbeatable prices, {user?.name}!</p>
      </div>

      <div className="dashboard-container">
        {bookingMsg && <p style={{ textAlign: 'center', color: '#2563EB', fontWeight: 'bold', marginBottom: '15px' }}>{bookingMsg}</p>}

        <h3 className="section-title">Available Travel Packages</h3>

        <div className="packages-grid">
          {packages.map((pkg) => (
            <div key={pkg._id} className="package-card">
              <div className="package-image-wrap">
                <img
                  src={`https://picsum.photos/400/300?random=${pkg._id}`}
                  alt={pkg.destination}
                />
              </div>
              <div className="wishlist-heart">🤍</div>
              <div className="package-body">
                <h4>{pkg.destination}</h4>
                <div className="package-rating">⭐⭐⭐⭐⭐ (4.8)</div>
                <p className="package-meta">📍 {pkg.destination}</p>
                <p className="package-meta">🕒 {pkg.duration}</p>
                <p className="package-price">Rs {pkg.price}</p>
                <button className="btn-book" onClick={() => handleBooking(pkg)}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer">
        <p>© 2026 TravelEase. All rights reserved.</p>
        <p style={{ marginTop: '8px' }}>Privacy | Terms | Contact | Facebook | Instagram</p>
      </div>
    </div>
  );
}

export default Dashboard;