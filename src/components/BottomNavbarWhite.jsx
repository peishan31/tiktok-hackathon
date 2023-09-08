import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus, faInbox, fa7,faUser, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import './bottomNavBarWhite.css';
function BottomNavbarWhite() {
  // Define a state variable to keep track of the active item
  const [activeItem, setActiveItem] = useState('home'); // Default active item

  // Function to handle item clicks and update the active state
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
  
  return (
      <div className="bottom-navbar whiteColorNav">
        <Link to="/" className="link" onClick={() => handleItemClick('home')}>
        <div className={`nav-item icon ${activeItem === 'home' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faHouse} className='blackIcon' />
          <span className="item-name active itemNameBlack">Home</span>
        </div>
        </Link>
        <Link to="/shop" className="link" onClick={() => handleItemClick('shop')}>
        <div className={`nav-item icon ${activeItem === 'shop' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faShoppingBasket} className='blackIcon' />
          <span className="item-name itemNameBlack">Shop</span>
        </div>
        </Link>
        <div className="nav-item">
          <FontAwesomeIcon icon={faPlus} className="icon plusIcon"/>
          <span className="item-name itemNameBlack">Create</span>
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon={fa7} className="notification" />
          <FontAwesomeIcon icon={faInbox} className="icon blackIcon" />
          <span className="item-name itemNameBlack">Inbox</span>
        </div>
        <Link to="/profile" className="link" onClick={() => handleItemClick('profile')}>
        <div className={`nav-item icon ${activeItem === 'profile' ? 'active' : ''}`} >
          <FontAwesomeIcon icon={faUser} className='blackIcon'/>
          <span className="item-name itemNameBlack">Profile</span>
        </div>
        </Link>
      </div>
  );
}

export default BottomNavbarWhite;