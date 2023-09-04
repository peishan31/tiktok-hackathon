import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserFriends, faPlus, faInbox, fa7,faUser, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
function BottomNavbarWhite() {
  return (
      <div className="bottom-navbar-white">
        <Link to="/">
        <div className="nav-item">
          <FontAwesomeIcon icon={faHouse} className="icon active" />
          <span className="item-name active">Home</span>
        </div>
        </Link>
        <Link to="/shop">
        <div className="nav-item">
          <FontAwesomeIcon icon={faShoppingBasket} className="icon" />
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
        <Link to="/profile">
        <div className="nav-item">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <span className="item-name">Profile</span>
        </div>
        </Link>
      </div>
  );
}

export default BottomNavbarWhite;