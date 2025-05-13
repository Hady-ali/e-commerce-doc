import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./CSS/Header.css";

const Header = () => {
  const products = useSelector((state) => state.appReducer.products);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Effect for scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect for closing menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.nav') && !e.target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          <p>Snap<span>Buy</span></p>
        </Link>

        {/* Search Bar - Visible on desktop */}
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>

        {/* Mobile Menu Toggle */}
        <button 
          className="menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Navigation Links */}
        <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-item" onClick={() => setIsMenuOpen(false)}>
            <FaHome className="nav-icon" />
            <span>Home</span>
          </Link>

          <Link to="/reg" className="nav-item" onClick={() => setIsMenuOpen(false)}>
            <FaUser className="nav-icon" />
            <span>Register</span>
          </Link>

          <Link to="/card" className="nav-item cart-link" onClick={() => setIsMenuOpen(false)}>
            <FaShoppingCart className="nav-icon" />
            <span>Cart</span>
            {products.length > 0 && (
              <span className="cart-badge">{products.length}</span>
            )}
          </Link>

          {/* Mobile Search - Visible only on mobile */}
          <form className="mobile-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              <FaSearch />
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
};

export default Header;







// import { Link } from "react-router-dom";
// import { FaHome, FaShoppingCart, FaUser, FaSearch, FaSignOutAlt } from "react-icons/fa";
// import { FiMenu, FiX } from "react-icons/fi";
// import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
// import { auth } from "../../firebase.config";
// import { signOut } from "firebase/auth";
// import { clearUser } from "../../redux/userSlice";
// import "./CSS/Header.css";

// const Header = () => {
//   // const products = useSelector((state) => state.cart.products);
//   // const user = useSelector((state) => state.user.currentUser);

//   //  const cartItems = useSelector((state) => state.cart.products);
  
//   const cartItems = useSelector((state) => state.cart?.products || []);
//   const user = useSelector((state) => state.user?.currentUser || null);
//   const dispatch = useDispatch();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (isMenuOpen && !e.target.closest('.nav') && !e.target.closest('.menu-toggle')) {
//         setIsMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isMenuOpen]);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       dispatch(clearUser());
//       setIsMenuOpen(false);
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log("Searching for:", searchQuery);
//   };

//   return (
//     <header className={`header ${scrolled ? "scrolled" : ""}`}>
//       <div className="container">
//         <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
//           <p>Snap<span>Buy</span></p>
//         </Link>

//         <form className="search-bar" onSubmit={handleSearch}>
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button type="submit" className="search-button">
//             <FaSearch />
//           </button>
//         </form>

//         <button 
//           className="menu-toggle" 
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           aria-label="Toggle menu"
//         >
//           {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//         </button>

//         <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
//           <Link to="/" className="nav-item" onClick={() => setIsMenuOpen(false)}>
//             <FaHome className="nav-icon" />
//             <span>Home</span>
//           </Link>

//           {user ? (
//             <>
//               <div className="nav-item user-profile">
//                 <FaUser className="nav-icon" />
//                 <span>{user.displayName || user.email}</span>
//               </div>
//               <button className="nav-item" onClick={handleLogout}>
//                 <FaSignOutAlt className="nav-icon" />
//                 <span>Logout</span>
//               </button>
//             </>
//           ) : (
//             <Link to="/login" className="nav-item" onClick={() => setIsMenuOpen(false)}>
//               <FaUser className="nav-icon" />
//               <span>Login</span>
//             </Link>
//           )}

//           {/* <Link to="/card" className="nav-item cart-link" onClick={() => setIsMenuOpen(false)}>
//             <FaShoppingCart className="nav-icon" />
//             <span>Cart</span>
//             {cartItems.length > 0 && (
//               <span className="cart-badge">{cartItems.length}</span>
//             )}
//           </Link> */}

//               <Link to="/card" className="nav-item cart-link">
//                 <FaShoppingCart className="nav-icon" />
//                 <span>Cart</span>
//                 {cartItems.length > 0 && (
//                   <span className="cart-badge">{cartItems.length}</span>
//                 )}
//               </Link>

//           <form className="mobile-search" onSubmit={handleSearch}>
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button type="submit" className="search-button">
//               <FaSearch />
//             </button>
//           </form>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;




















// _______________________





















// import { Link } from "react-router-dom";
// import { FaHome, FaShoppingCart, FaUser, FaSearch, FaSignOutAlt } from "react-icons/fa";
// import { FiMenu, FiX } from "react-icons/fi";
// import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
// import { auth } from "../../firebase.config";
// import { signOut } from "firebase/auth";
// import { clearUser } from "../../redux/userSlice";
// import "./CSS/Header.css";

// const Header = () => {
//   const cartItems = useSelector((state) => state.cart?.products || []);
//   const user = useSelector((state) => state.user?.currentUser || null);
//   const dispatch = useDispatch();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (isMenuOpen && !e.target.closest('.nav') && !e.target.closest('.menu-toggle')) {
//         setIsMenuOpen(false);
//       }
//       if (showDropdown && !e.target.closest('.user-profile')) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isMenuOpen, showDropdown]);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       dispatch(clearUser());
//       setIsMenuOpen(false);
//       setShowDropdown(false);
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log("Searching for:", searchQuery);
//   };

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   return (
//     <header className={`header ${scrolled ? "scrolled" : ""}`}>
//       <div className="container">
//         <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
//           <p>Snap<span>Buy</span></p>
//         </Link>

//         <form className="search-bar" onSubmit={handleSearch}>
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button type="submit" className="search-button">
//             <FaSearch />
//           </button>
//         </form>

//         <button 
//           className="menu-toggle" 
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           aria-label="Toggle menu"
//         >
//           {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//         </button>

//         <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
//           <Link to="/" className="nav-item" onClick={() => setIsMenuOpen(false)}>
//             <FaHome className="nav-icon" />
//             <span>Home</span>
//           </Link>

//           {user ? (
//             <div className="user-profile-container">
//               <div 
//                 className="nav-item user-profile" 
//                 onClick={toggleDropdown}
//               >
//                 <div className="avatar-container">
//                   <img 
//                     src={user.photoURL || 'https://i.imgur.com/6VBx3io.png'} 
//                     alt="User Avatar" 
//                     className="user-avatar"
//                   />
//                 </div>
//                 <span>{user.displayName || user.email}</span>
//               </div>
              
//               {showDropdown && (
//                 <div className="dropdown-menu">
//                   <div className="dropdown-header">
//                     <img 
//                       src={user.photoURL || 'https://i.imgur.com/6VBx3io.png'} 
//                       alt="User" 
//                       className="dropdown-avatar"
//                     />
//                     <div className="dropdown-user-info">
//                       <strong>{user.displayName || user.email}</strong>
//                       <small>{user.email}</small>
//                     </div>
//                   </div>
//                   <button 
//                     className="dropdown-item logout-btn" 
//                     onClick={handleLogout}
//                   >
//                     <FaSignOutAlt className="dropdown-icon" />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link to="/login" className="nav-item" onClick={() => setIsMenuOpen(false)}>
//               <FaUser className="nav-icon" />
//               <span>Login</span>
//             </Link>
//           )}

//           <Link to="/card" className="nav-item cart-link">
//             <FaShoppingCart className="nav-icon" />
//             <span>Cart</span>
//             {cartItems.length > 0 && (
//               <span className="cart-badge">{cartItems.length}</span>
//             )}
//           </Link>

//           <form className="mobile-search" onSubmit={handleSearch}>
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button type="submit" className="search-button">
//               <FaSearch />
//             </button>
//           </form>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
















