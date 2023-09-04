import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus, faInbox, fa7,faUser, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function BottomNavbar() {
  // Define a state variable to keep track of the active item
  const [activeItem, setActiveItem] = useState('home'); // Default active item

  // Function to handle item clicks and update the active state
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
  
  return (
      <div className="bottom-navbar">
        <Link to="/" onClick={() => handleItemClick('home')}>
        <div className={`nav-item icon ${activeItem === 'home' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faHouse}  />
          <span className="item-name active">Home</span>
        </div>
        </Link>
        <Link to="/shop" onClick={() => handleItemClick('shop')}>
        <div className={`nav-item icon ${activeItem === 'shop' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faShoppingBasket} />
          <span className="item-name">Shop</span>
        </div>
        </Link>
        <div className="nav-item">
          <FontAwesomeIcon icon={faPlus} className="icon plus" />
          <span className="item-name">Create</span>
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon={fa7} className="notification" />
          <FontAwesomeIcon icon={faInbox} className="icon" />
          <span className="item-name">Inbox</span>
        </div>
        <Link to="/profile" onClick={() => handleItemClick('profile')}>
        <div className={`nav-item icon ${activeItem === 'profile' ? 'active' : ''}`} >
          <FontAwesomeIcon icon={faUser}/>
          <span className="item-name">Profile</span>
        </div>
        </Link>
      </div>
  );
}

export default BottomNavbar;