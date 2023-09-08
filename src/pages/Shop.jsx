import VideoCard from '../components/VideoCard';
import BottomNavbar from '../components/BottomNavbar';
import BottomNavbarWhite from '../components/BottomNavbarWhite';
import TopNavbar from '../components/TopNavBarForShop';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from "firebase/firestore/lite";
import './Navbar.css'; // Create a CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faComments, faCartShopping, faShoppingBasket, faStickyNote, faBookmark, faHeart, faMoneyCheckDollar, faMapLocation } from '@fortawesome/free-solid-svg-icons';
import imageSrc from '../images/shopHomePageImg.jpeg'; // Replace with the actual path to your image file
import { Link } from 'react-router-dom';

function Shop() {
  
  return (
    <div className="app">
      <div className="container">
        <TopNavbar className="top-navbar" />
        <div className="navbar">
          <ul className="scrollable-container nav-list">
            <Link to="/seeWishlistBoard" className="no-link-style">
            <li className="nav-item">
              <span><FontAwesomeIcon icon={faShoppingBasket} className="icon active nav-icon" /></span>
              <span className="nav-text">Orders</span></li>
              </Link>
            <li className="nav-item">
              <span><FontAwesomeIcon icon={faComments} className="icon active nav-icon" /></span>
              <span className="nav-text">Reviews</span></li>
            <li className="nav-item">
              <span><FontAwesomeIcon icon={faCartShopping} className="icon active nav-icon" /></span>
              <span className="nav-text">Cart</span></li>
            <li className="nav-item">
              <span><FontAwesomeIcon icon={faStickyNote} className="icon active nav-icon" /></span>
              <span className="nav-text">Coupon</span></li>
            <Link to="/threads" className="no-link-style">
            <li className="nav-item">
              <span><FontAwesomeIcon icon={faMessage} className="icon active nav-icon" /></span>
              <span className="nav-text">Threads</span></li>
            </Link>
            <Link to="/profile" className="no-link-style">
              <li className="nav-item">
                <span><FontAwesomeIcon icon={faHeart} className="icon active nav-icon" /></span>
                <span className="nav-text">Wishlist</span></li>
            </Link>
            <li className="nav-item">
              <span><FontAwesomeIcon icon={faBookmark} className="icon active nav-icon" /></span>
              <span className="nav-text">Favourites</span></li>
            <li className="nav-item">
              <span><FontAwesomeIcon icon={faMapLocation} className="icon active nav-icon" /></span>
              <span className="nav-text">Address book</span></li>
            <li className="nav-item">
              <span><FontAwesomeIcon icon={faMoneyCheckDollar} className="icon active nav-icon" /></span>
              <span className="nav-text">Payment methods</span></li>
          </ul>
        </div>
        <div>
          <Link to="/productList">
          <img src={imageSrc} alt="Description of the image" className="custom-image" />
          </Link>
        </div>
        {/* <BottomNavbar className="bottom-navbar" /> */}
        <BottomNavbarWhite className='bottom-navbar-white' />
      </div>
    </div>
  );
}

export default Shop;
