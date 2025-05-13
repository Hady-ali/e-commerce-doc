
import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser, FaSearch, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { auth } from "../../firebase.config";
import { getAuth, signOut } from "firebase/auth";
import { clearUser } from "../../redux/userSlice";
import { logOutUser } from "../../redux/SapSlice"
import {CiLogin} from "react-icons/ci"
import "./CSS/Header.css";

const Header = () => {
  const cartItems = useSelector((state) => state.cart?.products || []);
  // const user = useSelector((state) => state.user?.currentUser || null);
  const user = useSelector((state) => state.user?.userInfo || null);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const logOut = () => {
    const auth = getAuth();
      signOut(auth).then(() => {
        dispatch(logOutUser());
      }).catch((error) => {
        // An error happened.
        console.log(error);
        
      });

  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.nav') && !e.target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
      }
      if (showDropdown && !e.target.closest('.user-profile-container')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, showDropdown]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      setIsMenuOpen(false);
      setShowDropdown(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setIsMenuOpen(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const getUserInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          <p>Snap<span>Buy</span></p>
        </Link>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search products"
          />
          <button type="submit" className="search-button" aria-label="Search">
            <FaSearch />
          </button>
        </form>

        <button 
          className="menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <nav className={`nav ${isMenuOpen ? "open" : ""}`} aria-hidden={!isMenuOpen}>
          <Link to="/" className="nav-item" onClick={() => setIsMenuOpen(false)}>
            <FaHome className="nav-icon" />
            <span>Home</span>
          </Link>

          {user ? (
            <div className="user-profile-container">
              <div 
                className="nav-item user-profile" 
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={showDropdown}
              >
                <div className="avatar-container">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="User Avatar" 
                      className="user-avatar"
                      onError={(e) => {
                        e.target.src = '';
                        e.target.className = 'user-initials';
                        e.target.textContent = getUserInitials(user.displayName || user.email);
                      }}
                    />
                  ) : (
                    <div className="user-initials">
                      {getUserInitials(user.displayName || user.email)}
                    </div>
                  )}
                </div>
                {!isMobile && (
                  <span className="username-text">
                    {user.displayName || user.email.split('@')[0]}
                  </span>
                )}
              </div>
              
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt="User" 
                        className="dropdown-avatar"
                        onError={(e) => {
                          e.target.src = '';
                          e.target.className = 'dropdown-initials';
                          e.target.textContent = getUserInitials(user.displayName || user.email);
                        }}
                      />
                    ) : (
                      <div className="dropdown-initials">
                        {getUserInitials(user.displayName || user.email)}
                      </div>
                    )}
                    <div className="dropdown-user-info">
                      <strong>{user.displayName || user.email.split('@')[0]}</strong>
                      <small>{user.email}</small>
                    </div>
                  </div>
                  <button 
                    className="dropdown-item logout-btn" 
                    onClick={handleLogout}
                    aria-label="Logout"
                  >
                    <FaSignOutAlt className="dropdown-icon" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-item" onClick={() => setIsMenuOpen(false)}>
              <FaUser className="nav-icon" />
              <span>Login</span>
            </Link>
          )}
          {/* ////////////////////////////////////// */}
          {user ? <>
          <p>{user.userName}</p>
          </> : <>Login</>}
          <Link to="/cart" className="nav-item cart-link" onClick={() => setIsMenuOpen(false)}>
            <FaShoppingCart className="nav-icon" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="cart-badge">{Math.min(cartItems.length, 99)}</span>
            )}
          </Link>

          {isMobile && (
            <form className="mobile-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Mobile search"
              />
              <button type="submit" className="search-button" aria-label="Search">
                <FaSearch />
              </button>
            </form>
          )}

          {userInfo && (
            <p onClick={logOut}><CiLogin/></p>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;