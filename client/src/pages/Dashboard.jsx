import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useToast } from '../context/ToastContext';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const { showToast } = useToast();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [activeSearch, setActiveSearch] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/packages');
        setPackages(res.data);
      } catch (error) {
        console.log('Error fetching packages:', error);
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    };
    fetchPackages();

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/wishlist/${user.id}`);
        setWishlist(res.data.map((item) => item.package._id));
      } catch (error) {
        console.log('Error fetching wishlist:', error);
      }
    };
    fetchWishlist();
  }, []);

  const toggleWishlist = async (pkg) => {
    try {
      if (wishlist.includes(pkg._id)) {
        await axios.delete(`http://localhost:5000/api/wishlist/${pkg._id}`, { data: { userId: user.id } });
        setWishlist(wishlist.filter((id) => id !== pkg._id));
        showToast('Removed from wishlist', 'success');
      } else {
        await axios.post('http://localhost:5000/api/wishlist', { userId: user.id, packageId: pkg._id });
        setWishlist([...wishlist, pkg._id]);
        showToast('Added to wishlist!', 'success');
      }
    } catch (error) {
      showToast('Something went wrong', 'error');
    }
  };

  const isWishlisted = (id) => wishlist.includes(id);

  const handleSearch = () => {
    setLoading(true);
    setActiveSearch(searchTerm);
    setCurrentPage(1);
    setTimeout(() => setLoading(false), 500);
  };

  const toggleDuration = (dur) => {
    if (selectedDurations.includes(dur)) {
      setSelectedDurations(selectedDurations.filter((d) => d !== dur));
    } else {
      setSelectedDurations([...selectedDurations, dur]);
    }
    setCurrentPage(1);
  };

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.destination.toLowerCase().includes(activeSearch.toLowerCase());
    const matchesPrice = pkg.price <= maxPrice;
    const matchesDuration = selectedDurations.length === 0 || selectedDurations.includes(pkg.duration);
    return matchesSearch && matchesPrice && matchesDuration;
  });

  const uniqueDurations = [...new Set(packages.map((p) => p.duration))];

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPackages = filteredPackages.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <Navbar />

      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Explore The World 🌍</h1>
          <p>Book Your Dream Vacation, {user?.name}!</p>
        </div>
      </div>

      <div className="search-bar-wrap">
        <div className="search-bar">
          <div className="search-field">
            <label>📍 Destination</label>
            <input type="text" placeholder="Where to?" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="search-field">
            <label>📅 Check In</label>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </div>
          <div className="search-field">
            <label>📅 Check Out</label>
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </div>
          <div className="search-field small">
            <label>👨 Adults</label>
            <input type="number" min="1" value={adults} onChange={(e) => setAdults(e.target.value)} />
          </div>
          <div className="search-field small">
            <label>👶 Children</label>
            <input type="number" min="0" value={children} onChange={(e) => setChildren(e.target.value)} />
          </div>
          <button className="btn-search" onClick={handleSearch}>🔍 Search</button>
        </div>
      </div>

      <div className="dashboard-container">
        <h3 className="section-title">Available Travel Packages</h3>

        <div className="dashboard-layout">
          <aside className="filters-sidebar">
            <h4>Filters</h4>

            <div className="filter-group">
              <label>Max Price: Rs {maxPrice}</label>
              <input
                type="range"
                min="5000"
                max="100000"
                step="1000"
                value={maxPrice}
                onChange={(e) => { setMaxPrice(Number(e.target.value)); setCurrentPage(1); }}
              />
            </div>

            <div className="filter-group">
              <label>Duration</label>
              {uniqueDurations.map((dur) => (
                <div key={dur} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedDurations.includes(dur)}
                    onChange={() => toggleDuration(dur)}
                  />
                  <span>{dur}</span>
                </div>
              ))}
            </div>

            <div className="filter-group">
              <label>Rating</label>
              <div className="filter-checkbox"><input type="checkbox" /> <span>⭐ 4.5 & up</span></div>
            </div>

            <div className="filter-group">
              <label>Trip Type</label>
              <div className="filter-tags">
                <span className="filter-tag">Popular</span>
                <span className="filter-tag">Luxury</span>
                <span className="filter-tag">Family</span>
                <span className="filter-tag">Adventure</span>
                <span className="filter-tag">Budget</span>
              </div>
            </div>
          </aside>

          <div>
            {loading ? (
              <div className="packages-grid">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="skeleton-card">
                    <div className="skeleton-img"></div>
                    <div className="skeleton-line" style={{ width: '70%' }}></div>
                    <div className="skeleton-line" style={{ width: '50%' }}></div>
                    <div className="skeleton-line" style={{ width: '40%' }}></div>
                  </div>
                ))}
              </div>
            ) : paginatedPackages.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🧳</div>
                <h3>No Packages Found</h3>
                <p>Try adjusting your search or filters to find your perfect trip.</p>
              </div>
            ) : (
              <>
                <div className="packages-grid">
                  {paginatedPackages.map((pkg) => (
                    <div key={pkg._id} className="package-card">
                      <div className="package-image-wrap">
                        <img src={`https://picsum.photos/400/300?random=${pkg._id}`} alt={pkg.destination} />
                      </div>
                      <div className="wishlist-heart" onClick={() => toggleWishlist(pkg)}>
                        {isWishlisted(pkg._id) ? '❤️' : '🤍'}
                      </div>
                      <div className="package-body">
                        <h4>{pkg.destination}</h4>
                        <div className="package-rating">⭐⭐⭐⭐⭐ 4.8</div>
                        <p className="package-meta">📍 {pkg.destination}</p>
                        <p className="package-meta">🕒 {pkg.duration}</p>
                        <p className="package-meta">🏨 3-Star Hotel Included</p>
                        <div className="package-tags">
                          <span className="tag">🍽 Breakfast</span>
                          <span className="tag">🚗 Free Pickup</span>
                        </div>
                        <p className="package-price">Rs {pkg.price}</p>
                        <button className="btn-book" onClick={() => navigate(`/package/${pkg._id}`)}>View Details</button>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      ← Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;