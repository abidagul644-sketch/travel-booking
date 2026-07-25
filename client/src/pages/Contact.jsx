import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';

function Contact() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Message sent! We will get back to you soon.', 'success');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container" style={{ marginTop: '30px', maxWidth: '600px' }}>
        <h3 className="section-title">Contact Us 📧</h3>
        <div className="admin-form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Your Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="How can we help?" />
            </div>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
      </div>
      <div className="footer">
        <p>© 2026 TravelEase. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Contact;