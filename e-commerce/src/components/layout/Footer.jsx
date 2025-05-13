import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import "./CSS/Footer.css";

const Footer = () => {
  return (
    <footer className="creative-footer">
      <div className="footer-container">
        {/* Logo and About Section */}
        <div className="footer-section about-section">
          <div className="footer-logo">
            <span className="logo-main">Snap</span>
            <span className="logo-accent">Buy</span>
          </div>
          <p className="footer-about">
            We provide the best products with top quality and fast delivery.
            Your satisfaction is our priority.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section links-section">
          <h4 className="section-title">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Shop</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact-section">
          <h4 className="section-title">Contact Us</h4>
          <div className="contact-info">
            <div className="contact-item">
              <MdLocationOn className="contact-icon" />
              <span>123 Main Street, City, Country</span>
            </div>
            <div className="contact-item">
              <MdEmail className="contact-icon" />
              <a href="mailto:SnapBuy@gmail.com">SnapBuy@gmail.com</a>
            </div>
            <div className="contact-item">
              <MdPhone className="contact-icon" />
              <a href="tel:+123456789">+1 234 567 89</a>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="footer-section newsletter-section">
          <h4 className="section-title">Newsletter</h4>
          <p className="prg">Subscribe to get updates on new products and offers</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          © {new Date().getFullYear()} SnapBuy. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
