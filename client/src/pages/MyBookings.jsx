import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { API_URL } from '../config';

function MyBookings() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/bookings/${user.id}`);
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
      await axios.put(`${API_URL}/api/bookings/cancel/${id}`);
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

        {bookings.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🧳</div>
            <h3>No Bookings Yet</h3>
            <p>Start exploring packages and book your dream vacation!</p>
          </div>
        )}

        <div className="bookings-cards">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <div className="booking-card-top">
                <div>
                  <p className="booking-id">#{booking._id.slice(-6).toUpperCase()}</p>
                  <h4>{booking.destination}</h4>
                </div>
                <span className={`status-badge ${booking.status === 'Cancelled' ? 'cancelled' : 'confirmed'}`}>
                  {booking.status}
                </span>
              </div>

              <div className="booking-card-details">
                <div className="booking-detail-item">
                  <span className="detail-label">📅 Travel Date</span>
                  <span className="detail-value">{booking.travelDate || 'Not set'}</span>
                </div>
                <div className="booking-detail-item">
                  <span className="detail-label">👥 Guests</span>
                  <span className="detail-value">{booking.travelers || 1}</span>
                </div>
                <div className="booking-detail-item">
                  <span className="detail-label">💳 Payment</span>
                  <span className={`status-badge small ${booking.paymentStatus === 'Paid' ? 'confirmed' : 'cancelled'}`}>
                    {booking.paymentStatus}
                  </span>
                </div>
                <div className="booking-detail-item">
                  <span className="detail-label">💰 Amount</span>
                  <span className="detail-value price">Rs {booking.price}</span>
                </div>
              </div>

              {booking.status !== 'Cancelled' && (
                <button className="btn-cancel full-width" onClick={() => handleCancel(booking._id)}>
                  Cancel Booking
                </button>
              )}
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