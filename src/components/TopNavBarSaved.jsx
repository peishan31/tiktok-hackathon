import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import "./topbarprofile.css";

const TopNavBarSaved = () => {
  return (
    <div className="top-navbar-profile">
      <FontAwesomeIcon icon={faChevronLeft} className='icon'/>
      <h2>Wishlist</h2>
      <FontAwesomeIcon icon={faChevronLeft} className='icon' style={{color: "white"}}/>
    </div>
  );
};

export default TopNavBarSaved;
