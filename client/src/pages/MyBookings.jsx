import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function MyBookings() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/bookings/${user.id}`);
      setBookings(res.data);
    } catch (error) {
      console.log('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/cancel/${id}`);
      fetchBookings();
    } catch (error) {
      console.log('Error cancelling booking:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container" style={{ marginTop: '30px' }}>
        <h3 className="section-title">My Bookings 📄</h3>

        {bookings.length === 0 && <p>No bookings yet.</p>}

        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-row">
              <div>
                <p className="booking-label">Booking ID</p>
                <p className="booking-value">#{booking._id.slice(-6).toUpperCase()}</p>
              </div>
              <div>
                <p className="booking-label">Destination</p>
                <p className="booking-value">{booking.destination}</p>
              </div>
              <div>
                <p className="booking-label">Travel Date</p>
                <p className="booking-value">{booking.travelDate || 'N/A'}</p>
              </div>
              <div>
                <p className="booking-label">Guests</p>
                <p className="booking-value">👥 {booking.travelers || 1}</p>
              </div>
              <div>
                <p className="booking-label">Payment</p>
                <span className={`status-badge ${booking.paymentStatus === 'Paid' ? 'confirmed' : 'cancelled'}`}>
                  {booking.paymentStatus}
                </span>
              </div>
              <div>
                <p className="booking-label">Status</p>
                <span className={`status-badge ${booking.status === 'Cancelled' ? 'cancelled' : 'confirmed'}`}>
                  {booking.status}
                </span>
              </div>
              <div>
                {booking.status !== 'Cancelled' && (
                  <button className="btn-cancel" onClick={() => handleCancel(booking._id)}>Cancel</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="footer">
        <p>© 2026 TravelEase. All rights reserved.</p>
      </div>
    </div>
  );
}

export default MyBookings;