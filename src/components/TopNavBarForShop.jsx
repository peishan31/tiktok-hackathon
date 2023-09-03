import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const TopNavbar = () => {
  return (
    <div className="top-navbar">
      <FontAwesomeIcon icon={faCircleArrowLeft} className='icon'/>
      <h2>Tiktok Shop</h2>
      <FontAwesomeIcon icon={faCartShopping} className='icon'/>
    </div>
  );
};

export default TopNavbar;
