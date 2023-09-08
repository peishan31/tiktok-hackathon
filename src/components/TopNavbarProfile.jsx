import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup,faLessThan, faEllipsis, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import "./topbarprofile.css";
import { useUsername } from "../usernameContext";
import { useHistory } from 'react-router-dom';

const TopNavbarProfile = ({followerUsername}) => {
  const { username } = useUsername();
  const userName = username.value2; // Specify the user ID
  console.log(followerUsername);

  
  const history = useHistory();

  const handleGoBack = () => {
    // Go back to the previous page
    history.goBack();
  };

  const iconBlack = {
    color: 'black', 
    marginRight: '10px',
  }

  if(followerUsername){
    return(
          <div className="top-navbar-profile">
      <FontAwesomeIcon icon={faLessThan} className='icon' style={iconBlack}  onClick={handleGoBack}/>
      <h2>{userName}   <FontAwesomeIcon icon={faCaretDown} className='icon'/></h2>  {console.log(followerUsername)}

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
