import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const TopNavbar = ({title}) => {

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

  return (
    <div className="top-navbar" style={navbarStyle}>
      <FontAwesomeIcon icon={faLessThan} className='icon' style={iconBlack}/>
      <h2 style={textBlack}>{title}</h2>
      &nbsp;
    </div>
  );
};

export default TopNavbar;
