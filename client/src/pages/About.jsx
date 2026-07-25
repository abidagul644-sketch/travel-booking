import Navbar from '../components/Navbar';

function About() {
  return (
    <div>
      <Navbar />
      <div className="dashboard-container" style={{ marginTop: '30px', maxWidth: '700px' }}>
        <h3 className="section-title">About Us ✈️</h3>
        <div className="profile-card" style={{ textAlign: 'left', padding: '30px' }}>
          <p className="package-meta" style={{ lineHeight: '1.8', fontSize: '15px' }}>
            TravelEase is a modern travel booking platform dedicated to making your dream vacations a reality.
            We offer carefully curated travel packages to destinations around the world, combining comfort,
            adventure, and affordability. Our mission is to simplify travel planning so you can focus on
            making memories.
          </p>
        </div>
      </div>
      <div className="footer">
        <p>© 2026 TravelEase. All rights reserved.</p>
      </div>
    </div>
  );
}

export default About;