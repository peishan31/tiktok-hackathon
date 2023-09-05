import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import "./topbarprofile.css";

const TopNavBarForIndividualWishlist = () => {
    const iconBlack = {
        color: 'black', 
        marginRight: '10px',
      }
  return (
    <div className="top-navbar-profile">
      <FontAwesomeIcon icon={faLessThan} className='icon' style={iconBlack}/>
      <h2>Food</h2>
      <FontAwesomeIcon icon={faEllipsis} className='icon'/>
    </div>
  );
};

export default TopNavBarForIndividualWishlist;
