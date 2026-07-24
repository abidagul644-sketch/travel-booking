import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { API_URL } from '../config';

function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [allPackages, setAllPackages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/packages/${id}`);
        setPkg(res.data);
        setActiveImage(0);

        const allRes = await axios.get(`${API_URL}/api/packages`);
        setAllPackages(allRes.data.filter((p) => p._id !== id));
      } catch (error) {
        console.log('Error fetching package:', error);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleBooking = () => {
    navigate(`/booking-form/${pkg._id}`);
  };

  if (!pkg) return <div><Navbar /><p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p></div>;

  const galleryImages = Array.from({ length: 6 }, (_, i) => `https://picsum.photos/400/300?random=${pkg._id}-${i}`);

  return (
    <div>
      <Navbar />

      <div className="details-hero">
        <img src={galleryImages[activeImage]} alt={pkg.destination} />
      </div>

      <div className="gallery-thumbs">
        {galleryImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className={activeImage === i ? 'thumb active' : 'thumb'}
            onClick={() => setActiveImage(i)}
          />
        ))}
      </div>

      <div className="details-container">
        <button className="btn-back" onClick={() => navigate('/dashboard')}>← Back to Packages</button>

        <div className="details-header">
          <h1>{pkg.destination}</h1>
          <div className="package-rating">⭐⭐⭐⭐⭐ 4.8 (120 Reviews)</div>
        </div>

        <div className="details-grid">
          <div className="details-main">
            <h3>Hotel Information</h3>
            <div className="hotel-info-card">
              <h4>🏨 Grand Plaza Hotel</h4>
              <p className="package-meta">A 3-star hotel located in the heart of {pkg.destination}, offering comfortable rooms and excellent service.</p>
              <div className="package-rating" style={{ marginTop: '8px' }}>⭐⭐⭐⭐ 4.3 Hotel Rating</div>
            </div>

            <h3 style={{ marginTop: '25px' }}>About This Trip</h3>
            <p className="details-description">{pkg.description}</p>

            <h3 style={{ marginTop: '25px' }}>Included Facilities</h3>
            <div className="amenities-grid">
              <div className="amenity">🏨 3-Star Hotel</div>
              <div className="amenity">🍽 Breakfast Included</div>
              <div className="amenity">🚗 Free Airport Pickup</div>
              <div className="amenity">📶 Free WiFi</div>
              <div className="amenity">❄️ Air Conditioning</div>
              <div className="amenity">🧳 Luggage Assistance</div>
            </div>

            <h3 style={{ marginTop: '25px' }}>Tour Plan</h3>
            <div className="tour-plan">
              <div className="tour-day">
                <div className="tour-day-badge">Day 1</div>
                <div>
                  <strong>Arrival & Check-in</strong>
                  <p className="package-meta">Airport pickup, hotel check-in, and evening at leisure.</p>
                </div>
              </div>
              <div className="tour-day">
                <div className="tour-day-badge">Day 2</div>
                <div>
                  <strong>City Sightseeing</strong>
                  <p className="package-meta">Guided tour of popular attractions and local markets.</p>
                </div>
              </div>
              <div className="tour-day">
                <div className="tour-day-badge">Day 3</div>
                <div>
                  <strong>Free Day & Departure</strong>
                  <p className="package-meta">Free time for shopping, then airport drop-off.</p>
                </div>
              </div>
            </div>

            <h3 style={{ marginTop: '25px' }}>Location</h3>
            <div className="map-wrap">
              <iframe
                title="map"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '12px' }}
                src={`https://www.google.com/maps?q=${encodeURIComponent(pkg.destination)}&output=embed`}
                loading="lazy"
              ></iframe>
            </div>

            <h3 style={{ marginTop: '25px' }}>Reviews</h3>
            <div className="review-card">
              <strong>Ayesha K.</strong> — ⭐⭐⭐⭐⭐
              <p>Amazing experience, everything was well organized!</p>
            </div>
            <div className="review-card">
              <strong>Bilal M.</strong> — ⭐⭐⭐⭐
              <p>Great trip, would recommend to friends and family.</p>
            </div>
          </div>

          <div className="details-sidebar">
            <p className="package-meta">🕒 Duration: {pkg.duration}</p>
            <p className="package-meta">📍 Location: {pkg.destination}</p>
            <p className="package-price">Rs {pkg.price}</p>
            <button className="btn-book" onClick={handleBooking}>Book Now</button>
          </div>
        </div>

        {allPackages.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h3 className="section-title">Similar Packages</h3>
            <div className="packages-grid">
              {allPackages.slice(0, 3).map((p) => (
                <div key={p._id} className="package-card">
                  <div className="package-image-wrap">
                    <img src={`https://picsum.photos/400/300?random=${p._id}`} alt={p.destination} />
                  </div>
                  <div className="package-body">
                    <h4>{p.destination}</h4>
                    <p className="package-meta">🕒 {p.duration}</p>
                    <p className="package-price">Rs {p.price}</p>
                    <button className="btn-book" onClick={() => navigate(`/package/${p._id}`)}>View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="footer">
        <p>© 2026 TravelEase. All rights reserved.</p>
      </div>
    </div>
  );
}

export default PackageDetails;