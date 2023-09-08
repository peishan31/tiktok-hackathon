import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faEllipsis, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import "./topbarprofile.css";

const TopNavbarProfile = () => {
  return (
    <div className="top-navbar-profile">
      <FontAwesomeIcon icon={faUserGroup} className='icon'/>
      <h2>jacob_w   <FontAwesomeIcon icon={faCaretDown} className='icon'/></h2>
      <FontAwesomeIcon icon={faEllipsis} className='icon'/>
    </div>
  );
};

export default TopNavbarProfile;
