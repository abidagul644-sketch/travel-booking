import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';

function Payment() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [booking, setBooking] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      const res = await axios.get(`http://localhost:5000/api/bookings/single/${bookingId}`);
      setBooking(res.data);
    };
    fetchBooking();
  }, [bookingId]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(async () => {
      try {
        await axios.put(`http://localhost:5000/api/bookings/pay/${bookingId}`);
        setProcessing(false);
        setSuccess(true);
        showToast('Payment successful!', 'success');
        setTimeout(() => navigate('/bookings'), 2000);
      } catch (error) {
        setProcessing(false);
        showToast('Payment failed', 'error');
      }
    }, 1500);
  };

  if (!booking) return <div><Navbar /><p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p></div>;

  if (success) {
    return (
      <div>
        <Navbar />
        <div className="payment-success">
          <div className="success-icon">✅</div>
          <h2>Payment Successful!</h2>
          <p>Your booking to {booking.destination} is confirmed.</p>
          <p className="package-meta">Redirecting to My Bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="payment-container">
        <div className="payment-card">
          <h3>Complete Your Payment</h3>
          <div className="payment-summary">
            <p><strong>{booking.destination}</strong></p>
            <p className="package-meta">{booking.duration}</p>
            <p className="package-price">Rs {booking.price}</p>
          </div>

          <form onSubmit={handlePayment}>
            <div className="form-group">
              <label>Cardholder Name</label>
              <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} required placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                maxLength="19"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Expiry Date</label>
                <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} required placeholder="MM/YY" maxLength="5" />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>CVV</label>
                <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} required placeholder="123" maxLength="3" />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={processing}>
              {processing ? 'Processing...' : `Pay Rs ${booking.price}`}
            </button>
          </form>
          <p className="demo-note">🔒 This is a demo payment page. No real transaction occurs.</p>
        </div>
      </div>
    </div>
  );
}

export default Payment;