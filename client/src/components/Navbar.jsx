import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">✈️ TravelEase</div>
      <ul>
        <li>Home</li>
        <li>Packages</li>
        <li onClick={() => navigate('/bookings')}>My Bookings</li>
      </ul>
      {user ? (
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      ) : (
        <button className="btn-logout" onClick={() => navigate('/login')}>Login</button>
      )}
    </nav>
  );
}

export default Navbar;