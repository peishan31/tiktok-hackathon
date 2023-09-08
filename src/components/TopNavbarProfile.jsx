import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faEllipsis, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import "./topbarprofile.css";
import { useUsername } from "../usernameContext";

const TopNavbarProfile = ({followerUsername}) => {
  const { username } = useUsername();
  const userName = username.value2; // Specify the user ID
  console.log(followerUsername);
  if(followerUsername){
    return(
          <div className="top-navbar-profile">
      <FontAwesomeIcon icon={faUserGroup} className='icon'/>
      <h2>{followerUsername}   <FontAwesomeIcon icon={faCaretDown} className='icon'/></h2>  {console.log(followerUsername)}

      <FontAwesomeIcon icon={faEllipsis} className='icon'/>
    </div>
    );

  }else{
  return (
    <div className="top-navbar-profile">
      <FontAwesomeIcon icon={faUserGroup} className='icon'/>
      <h2>{userName}   <FontAwesomeIcon icon={faCaretDown} className='icon'/></h2>
      <FontAwesomeIcon icon={faEllipsis} className='icon'/>
    </div>
  );
  }

};

export default TopNavbarProfile;
