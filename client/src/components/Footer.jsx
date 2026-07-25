import { useState } from 'react';
import { useToast } from '../context/ToastContext';

function Footer() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    showToast('Subscribed successfully!', 'success');
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="newsletter-box">
        <div>
          <h4>Subscribe to Our Newsletter</h4>
          <p>Get the latest deals and travel inspiration straight to your inbox.</p>
        </div>
        <form onSubmit={handleSubscribe} className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className="footer-grid">
        <div className="footer-col">
          <h4>✈️ TravelEase</h4>
          <p style={{ cursor: 'default' }}>Making your dream vacations a reality since 2026.</p>
          <div className="footer-social">
            <span>📘</span>
            <span>📷</span>
            <span>🐦</span>
            <span>💼</span>
          </div>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <p>Home</p>
          <p>Packages</p>
          <p>About</p>
          <p>Contact</p>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>FAQ</p>
        </div>
        <div className="footer-col">
          <h4>Get in Touch</h4>
          <p style={{ cursor: 'default' }}>📧 support@travelease.com</p>
          <p style={{ cursor: 'default' }}>📞 +92 300 1234567</p>
          <p style={{ cursor: 'default' }}>📍 Peshawar, Pakistan</p>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 TravelEase. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;