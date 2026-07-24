import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem('token');
      navigate(token ? '/dashboard' : '/login');
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-icon-wrap">
          <div className="splash-icon">✈️</div>
        </div>
        <h1 className="splash-title">TravelEase</h1>
        <p className="splash-tagline">Explore · Book · Enjoy</p>
        <div className="splash-loader"></div>
      </div>
    </div>
  );
}

export default Splash;