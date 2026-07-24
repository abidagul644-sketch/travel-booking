import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';
import { API_URL } from '../config';

function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const { showToast } = useToast();
  const [pkg, setPkg] = useState(null);
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState(1);

  useEffect(() => {
    const fetchPackage = async () => {
      const res = await axios.get(`${API_URL}/api/packages/${id}`);
      setPkg(res.data);
    };
    fetchPackage();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/bookings`, {
        userId: user.id,
        packageId: pkg._id,
        destination: pkg.destination,
        price: pkg.price * travelers,
        duration: pkg.duration,
        travelDate,
        travelers
      });
      navigate(`/payment/${res.data._id}`);
    } catch (error) {
      showToast('Booking failed. Try again.', 'error');
    }
  };

  if (!pkg) return <div><Navbar /><p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p></div>;

  return (
    <div>
      <Navbar />
      <div className="payment-container">
        <div className="payment-card">
          <h3>Complete Your Booking</h3>
          <div className="payment-summary">
            <p><strong>{pkg.destination}</strong></p>
            <p className="package-meta">{pkg.duration}</p>
            <p className="package-price">Rs {pkg.price} / person</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>📅 Travel Date</label>
              <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>👥 Number of Travelers</label>
              <input type="number" min="1" value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} required />
            </div>

            <div className="payment-summary" style={{ marginTop: '15px' }}>
              <p className="package-meta">Total Amount</p>
              <p className="package-price">Rs {pkg.price * travelers}</p>
            </div>

            <button type="submit" className="btn-primary">Continue to Payment</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;