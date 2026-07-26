import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <div className="page-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1>About TravelEase ✈️</h1>
          <p>Your Trusted Travel Companion</p>
        </div>
      </div>

      <div className="about-container">
        <section className="about-section">
          <h3 className="section-title">Who We Are</h3>
          <p className="about-text">
            TravelEase is an online travel booking platform that helps users discover destinations,
            compare travel packages, and book trips with confidence. Our goal is to make travel
            planning simple, secure, and affordable for every kind of traveller.
          </p>
        </section>

        <section className="about-section">
          <div className="mission-vision-grid">
            <div className="mv-card">
              <div className="mv-icon">🌍</div>
              <h4>Mission</h4>
              <p>To simplify travel planning for everyone, everywhere.</p>
            </div>
            <div className="mv-card">
              <div className="mv-icon">🚀</div>
              <h4>Vision</h4>
              <p>To become one of the most trusted online travel platforms.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h3 className="section-title">Why Choose Us</h3>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">✈️</div>
              <h4>Best Packages</h4>
              <p>Carefully curated trips at unbeatable prices.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">💳</div>
              <h4>Secure Payments</h4>
              <p>Your transactions are always safe with us.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🕒</div>
              <h4>24/7 Support</h4>
              <p>We're here to help, whenever you need us.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">⭐</div>
              <h4>Trusted by Thousands</h4>
              <p>Loved by travellers all over the world.</p>
            </div>
          </div>
        </section>

        <section className="about-section stats-section">
          <div className="stats-grid">
            <div className="stat-box">
              <p className="stat-num">500+</p>
              <p className="stat-txt">Packages</p>
            </div>
            <div className="stat-box">
              <p className="stat-num">100+</p>
              <p className="stat-txt">Hotels</p>
            </div>
            <div className="stat-box">
              <p className="stat-num">50+</p>
              <p className="stat-txt">Countries</p>
            </div>
            <div className="stat-box">
              <p className="stat-num">10,000+</p>
              <p className="stat-txt">Happy Customers</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h3>Ready to Explore?</h3>
          <p>Book your next vacation today!</p>
          <button className="btn-hero-primary" onClick={() => navigate('/dashboard')}>Explore Packages</button>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default About;