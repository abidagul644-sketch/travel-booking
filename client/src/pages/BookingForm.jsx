import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';
import { API_URL } from '../config';
import { getDestinationImage } from '../utils/images';

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
      <div className="booking-flow-container">
        <div className="booking-steps">
          <div className="booking-step active">
            <div className="step-circle">1</div>
            <span>Trip Details</span>
          </div>
          <div className="step-line"></div>
          <div className="booking-step">
            <div className="step-circle">2</div>
            <span>Payment</span>
          </div>
          <div className="step-line"></div>
          <div className="booking-step">
            <div className="step-circle">3</div>
            <span>Confirmed</span>
          </div>
        </div>

        <div className="booking-flow-card">
          <div className="booking-pkg-preview">
            <img src={getDestinationImage(pkg.destination)} alt={pkg.destination} />
            <div>
              <h3>{pkg.destination}</h3>
              <p className="package-meta">🕒 {pkg.duration}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>📅 Travel Date</label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>👥 Number of Travelers</label>
              <input
                type="number"
                min="1"
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                required
              />
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>Rs {pkg.price} × {travelers} traveler{travelers > 1 ? 's' : ''}</span>
                <span>Rs {pkg.price * travelers}</span>
              </div>
              <div className="price-row total">
                <span>Total Amount</span>
                <span>Rs {pkg.price * travelers}</span>
              </div>
            </div>

            <button type="submit" className="btn-primary">Continue to Payment →</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;