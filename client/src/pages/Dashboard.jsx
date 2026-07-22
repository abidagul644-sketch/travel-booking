import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [activeSearch, setActiveSearch] = useState('');
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

  const handleSearch = () => {
    setActiveSearch(searchTerm);
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.destination.toLowerCase().includes(activeSearch.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Explore The World 🌍</h1>
          <p>Book Your Dream Vacation, {user?.name}!</p>
        </div>
      </div>

      <div className="search-bar-wrap">
        <div className="search-bar">
          <div className="search-field">
            <label>📍 Destination</label>
            <input
              type="text"
              placeholder="Where to?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="search-field">
            <label>📅 Check In</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="search-field">
            <label>📅 Check Out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div className="search-field small">
            <label>👨 Adults</label>
            <input
              type="number"
              min="1"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
            />
          </div>
          <div className="search-field small">
            <label>👶 Children</label>
            <input
              type="number"
              min="0"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
            />
          </div>
          <button className="btn-search" onClick={handleSearch}>🔍 Search</button>
        </div>
      </div>

      <div className="dashboard-container">
        {bookingMsg && <p style={{ textAlign: 'center', color: '#7C3AED', fontWeight: 'bold', marginBottom: '15px' }}>{bookingMsg}</p>}

        <h3 className="section-title">Available Travel Packages</h3>

        <div className="packages-grid">
          {filteredPackages.length === 0 && <p>No packages found for "{activeSearch}"</p>}
          {filteredPackages.map((pkg) => (
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