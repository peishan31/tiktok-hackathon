import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import "./topbarprofile.css";
import { useHistory } from 'react-router-dom';

function TopNavBarForIndividualWishlist ({ name }) {
  const iconBlack = {
    color: 'black',
    marginRight: '10px',
  }

  const history = useHistory();

  const handleGoBack = () => {
    // Go back to the previous page
    history.goBack();
  };
  return (
    <div className="top-navbar-profile">
      <FontAwesomeIcon icon={faLessThan} className='icon' style={iconBlack} onClick={handleGoBack} />
      <h2>{name}</h2>
      <FontAwesomeIcon icon={faEllipsis} className='icon' />
    </div>
  );
};

export default TopNavBarForIndividualWishlist;
