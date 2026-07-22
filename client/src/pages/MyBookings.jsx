import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyBookings() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bookings/${user.id}`);
        setBookings(res.data);
      } catch (error) {
        console.log('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Bookings 📄</h2>
        <button onClick={() => navigate('/dashboard')} className="btn-primary" style={{ width: 'auto', padding: '10px 20px' }}>Back to Dashboard</button>
      </div>

      <div className="packages-grid">
        {bookings.length === 0 && <p style={{ color: 'white' }}>No bookings yet.</p>}
        {bookings.map((booking) => (
          <div key={booking._id} className="package-card">
            <h4>{booking.destination}</h4>
            <p><strong>Duration:</strong> {booking.duration}</p>
            <p className="package-price">Rs {booking.price}</p>
            <p><strong>Status:</strong> {booking.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;