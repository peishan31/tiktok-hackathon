import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const TopNavbar = () => {

  const navbarStyle = {
    backgroundColor: '#fff', 
    display: 'flex',
    alignItems: 'center'
  }

  const iconBlack = {
    color: 'black', 
    marginRight: '10px',
  }

  const textBlack = { 
    color: 'black'
  }

  const history = useHistory();

  const handleGoBack = () => {
    // Go back to the previous page
    history.goBack();
  };


  return (
    <div className="top-navbar" style={navbarStyle}>
      <FontAwesomeIcon icon={faLessThan} className='icon' style={iconBlack} onClick={handleGoBack}/>
      <h2 style={textBlack}>Tiktok Shop</h2>
      <FontAwesomeIcon icon={faCartShopping} className='icon' style={iconBlack}/>
    </div>
  );
};

export default TopNavbar;
