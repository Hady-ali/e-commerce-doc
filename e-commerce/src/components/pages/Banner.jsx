"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CSS/Banner.css";
import { Link } from "react-router-dom";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="slick-arrow next-arrow"
      onClick={onClick}
      aria-label="Next"
    >
      &gt;
    </button>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="slick-arrow prev-arrow"
      onClick={onClick}
      aria-label="Previous"
    >
      &lt;
    </button>
  );
};

export default function Banner() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="banner-container">
      <Slider {...settings}>
        {/* Slide 1 */}
        <div className="slide">
          <img
            src="/images/storage-sale.jpg"
            alt="Storage Sale"
            className="slide-bg"
          />
          {/* // <div className="slide-content">
          //   <div className="offer-tag">Up to 20% off</div>
          //   <h2>Portable Data Storage</h2>
          //   <p>SSDs, USB Drives & External Hard Disks</p>
          //   <button className="banner-btn">Shop Now</button>
          // </div> */}
          <div className="slide-content">
            <div className="offer-tag">Up to 30% OFF</div>
            <h1>Ultimate Storage Solutions</h1>
            <p>High-speed SSDs with massive storage capacity</p>
            <Link to="/card" ><button className="banner-btn">Shop Now</button></Link>
            <div className="banner-features">
              <span>Fast Shipping</span>
              <span>3-Year Warranty</span>
              <span>Competitive Prices</span>
            </div>
          </div>
          {" "}
        </div>

        {/* Slide 2 */}
        <div className="slide">
          <img
            src="/images/tech-deals.jpg"
            alt="Tech Deals"
            className="slide-bg"
          />
          {/* //           <div className="slide-content">
//             <h2>Low Prices</h2>
//             <p>Premium quality at affordable rates</p>
//             <button className="banner-btn">View Offers</button>
//           </div> */}

          <div className="slide-content right-align">
            <div className="offer-tag">Exclusive Offer</div>
            <h2>Storage Combo Deals</h2>
            <p>Get SSD + Flash Drive with extra discount</p>
            <Link to="/card" ><button className="banner-btn">View Offers</button></Link>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="slide">
          <img
            src="/images/new-products.jpg"
            alt="New Products"
            className="slide-bg"
          />
          {/* //           <div className="slide-content">
//             <div className="offer-tag">New Collection</div>
//             <h2>Latest Storage Solutions</h2>
//             <p>High-speed, high-capacity devices</p>
//             <button className="banner-btn">Explore</button>
//           </div> */}

          <div className="slide-content dark-theme">
            <div className="offer-tag">New Arrivals</div>
            <h2>Cutting-Edge Technology</h2>
            <p>Discover the latest storage devices of 2023</p>
            <Link to="/card"><button className="banner-btn">Explore More</button> </Link> 
          </div>
        </div>
      </Slider>
    </div>
  );
}