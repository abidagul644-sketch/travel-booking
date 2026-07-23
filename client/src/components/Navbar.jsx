import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>✈️ TravelEase</div>
      <ul>
        <li onClick={() => navigate('/dashboard')}>Home</li>
        <li onClick={() => navigate('/dashboard')}>Packages</li>
        <li onClick={() => navigate('/wishlist')}>Wishlist</li>
        <li onClick={() => navigate('/bookings')}>My Bookings</li>
        <li onClick={() => navigate('/admin')}>Admin</li>
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️' : '🌙'}
        </div>

        {user ? (
          <div className="profile-dropdown-wrap">
            <div className="profile-icon" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {user.name?.charAt(0).toUpperCase() || '👤'}
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <p className="dropdown-header">{user.name}</p>
                <div className="dropdown-item" onClick={() => { navigate('/profile'); setDropdownOpen(false); }}>👤 My Profile</div>
                <div className="dropdown-item" onClick={() => { navigate('/bookings'); setDropdownOpen(false); }}>📄 Bookings</div>
                <div className="dropdown-item" onClick={() => { navigate('/wishlist'); setDropdownOpen(false); }}>❤️ Wishlist</div>
                <div className="dropdown-item logout" onClick={handleLogout}>🚪 Logout</div>
              </div>
            )}
          </div>
        ) : (
          <button className="btn-logout" onClick={() => navigate('/login')}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;