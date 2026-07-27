import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';
import { API_URL } from '../config';

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
      const res = await axios.get(`${API_URL}/api/bookings/single/${bookingId}`);
      setBooking(res.data);
    };
    fetchBooking();
  }, [bookingId]);

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(async () => {
      try {
        await axios.put(`${API_URL}/api/bookings/pay/${bookingId}`);
        setProcessing(false);
        setSuccess(true);
        showToast('Payment successful!', 'success');
        setTimeout(() => navigate('/bookings'), 2200);
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
        <div className="booking-flow-container">
          <div className="booking-steps">
            <div className="booking-step done"><div className="step-circle">✓</div><span>Trip Details</span></div>
            <div className="step-line done"></div>
            <div className="booking-step done"><div className="step-circle">✓</div><span>Payment</span></div>
            <div className="step-line done"></div>
            <div className="booking-step active"><div className="step-circle">✓</div><span>Confirmed</span></div>
          </div>
          <div className="payment-success">
            <div className="success-icon">✅</div>
            <h2>Payment Successful!</h2>
            <p>Your booking to <strong>{booking.destination}</strong> is confirmed.</p>
            <p className="package-meta" style={{ marginTop: '10px' }}>Booking ID: #{booking._id.slice(-6).toUpperCase()}</p>
            <p className="package-meta">Redirecting to My Bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="booking-flow-container">
        <div className="booking-steps">
          <div className="booking-step done"><div className="step-circle">✓</div><span>Trip Details</span></div>
          <div className="step-line done"></div>
          <div className="booking-step active"><div className="step-circle">2</div><span>Payment</span></div>
          <div className="step-line"></div>
          <div className="booking-step"><div className="step-circle">3</div><span>Confirmed</span></div>
        </div>

        <div className="booking-flow-card">
          <div className="price-breakdown" style={{ marginBottom: '20px' }}>
            <div className="price-row">
              <span>{booking.destination}</span>
              <span className="package-meta">{booking.duration}</span>
            </div>
            <div className="price-row total">
              <span>Amount to Pay</span>
              <span>Rs {booking.price}</span>
            </div>
          </div>

          <div className="card-preview">
            <div className="card-preview-top">
              <span>💳</span>
              <span>VISA</span>
            </div>
            <div className="card-preview-number">{cardNumber || '•••• •••• •••• ••••'}</div>
            <div className="card-preview-bottom">
              <div>
                <p className="card-preview-label">Card Holder</p>
                <p>{cardName || 'YOUR NAME'}</p>
              </div>
              <div>
                <p className="card-preview-label">Expires</p>
                <p>{expiry || 'MM/YY'}</p>
              </div>
            </div>
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
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                required
                maxLength="19"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Expiry Date</label>
                <input type="text" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} required placeholder="MM/YY" maxLength="5" />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>CVV</label>
                <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))} required placeholder="123" maxLength="3" />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={processing}>
              {processing ? '🔒 Processing...' : `🔒 Pay Rs ${booking.price}`}
            </button>
          </form>
          <p className="demo-note">🔒 This is a demo payment page. No real transaction occurs.</p>
        </div>
      </div>
    </div>
  );
}

export default Payment;