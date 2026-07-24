import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';
import { API_URL } from '../config';

function Wishlist() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const user = JSON.parse(localStorage.getItem('user'));
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/wishlist/${user.id}`);
      setWishlist(res.data);
    } catch (error) {
      console.log('Error fetching wishlist:', error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (packageId) => {
    try {
      await axios.delete(`${API_URL}/api/wishlist/${packageId}`, { data: { userId: user.id } });
      showToast('Removed from wishlist', 'success');
      fetchWishlist();
    } catch (error) {
      showToast('Failed to remove', 'error');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container" style={{ marginTop: '30px' }}>
        <h3 className="section-title">My Wishlist ❤️</h3>

        <div className="packages-grid">
          {wishlist.length === 0 && <p>Your wishlist is empty.</p>}
          {wishlist.map((item) => (
            item.package && (
              <div key={item._id} className="package-card">
                <div className="package-image-wrap">
                  <img src={`https://picsum.photos/400/300?random=${item.package._id}`} alt={item.package.destination} />
                </div>
                <div className="wishlist-heart" onClick={() => removeFromWishlist(item.package._id)}>❤️</div>
                <div className="package-body">
                  <h4>{item.package.destination}</h4>
                  <p className="package-meta">🕒 {item.package.duration}</p>
                  <p className="package-price">Rs {item.package.price}</p>
                  <button className="btn-book" onClick={() => navigate(`/package/${item.package._id}`)}>View Details</button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
      <div className="footer">
        <p>© 2026 TravelEase. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Wishlist;