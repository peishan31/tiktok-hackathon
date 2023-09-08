import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faEllipsis, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import "./topbarprofile.css";
import { useUsername } from "../usernameContext";

const TopNavbarProfile = () => {
  const { username } = useUsername();
  const userName = username.value2; // Specify the user ID
  return (
    <div className="top-navbar-profile">
      <FontAwesomeIcon icon={faUserGroup} className='icon'/>
      <h2>{userName}   <FontAwesomeIcon icon={faCaretDown} className='icon'/></h2>
      <FontAwesomeIcon icon={faEllipsis} className='icon'/>
    </div>
  );
};

export default TopNavbarProfile;
