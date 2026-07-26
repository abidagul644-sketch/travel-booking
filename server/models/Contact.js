import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useToast } from '../context/ToastContext';
import { API_URL } from '../config';

const faqs = [
  { q: 'How can I cancel my booking?', a: 'You can cancel your booking anytime from the "My Bookings" page by clicking the Cancel button next to your trip.' },
  { q: 'How do I get my refund?', a: 'Refunds are processed within 5-7 business days to your original payment method after cancellation.' },
  { q: 'Is online payment secure?', a: 'Yes, all payments are processed securely and your information is never shared with third parties.' }
];

function Contact() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/contacts`, { name, email, phone, subject, message });
      showToast('Message sent! We will get back to you soon.', 'success');
      setName(''); setEmail(''); setPhone(''); setSubject(''); setMessage('');
    } catch (error) {
      showToast('Failed to send message. Try again.', 'error');
    }
  };

  return (
    <div>
      <Navbar />

      <div className="page-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1>Contact Us 📞</h1>
          <p>We'd love to hear from you — our team is available 24/7</p>
        </div>
      </div>

      <div className="about-container">
        <div className="contact-grid">
          <div className="contact-info-list">
            <div className="contact-info-card">
              <div className="why-icon">📍</div>
              <div>
                <h4>Address</h4>
                <p className="package-meta">Peshawar, Pakistan</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="why-icon">📧</div>
              <div>
                <h4>Email</h4>
                <p className="package-meta">support@travelease.com</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="why-icon">📞</div>
              <div>
                <h4>Phone</h4>
                <p className="package-meta">+92 300 1234567</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="why-icon">🕒</div>
              <div>
                <h4>Working Hours</h4>
                <p className="package-meta">Mon – Sat, 9:00 AM – 8:00 PM</p>
              </div>
            </div>
          </div>

          <div className="admin-form-card">
            <h4>Send Us a Message</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Optional" />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows="4"></textarea>
              </div>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          </div>
        </div>

        <section className="about-section">
          <h3 className="section-title">Office Location</h3>
          <div className="map-wrap">
            <iframe
              title="office-map"
              width="100%"
              height="300"
              style={{ border: 0 }}
              src="https://www.google.com/maps?q=Peshawar,Pakistan&output=embed"
              loading="lazy"
            ></iframe>
          </div>
        </section>

        <section className="about-section">
          <h3 className="section-title">Frequently Asked Questions</h3>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span>{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && <div className="faq-answer">{faq.a}</div>}
              </div>
            ))}
          </div>
        </section>

        <section className="about-section">
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">💳</div>
              <h4>Payment Support</h4>
            </div>
            <div className="why-card">
              <div className="why-icon">✈️</div>
              <h4>Booking Support</h4>
            </div>
            <div className="why-card">
              <div className="why-icon">📧</div>
              <h4>Email Support</h4>
            </div>
            <div className="why-card">
              <div className="why-icon">🕒</div>
              <h4>24/7 Live Support</h4>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;