import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan, faUserPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import "./topbarprofile.css";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useUsername } from "../usernameContext";


const TopNavbarProfile = () => {
    const { username } = useUsername();
    const userName = username.value2; // Specify the user ID
    const history = useHistory();

    const handleGoBack = () => {
        // Go back to the previous page
        history.goBack();
    };

    return (
        <div className="top-navbar-profile">
            <FontAwesomeIcon icon={faLessThan} className='icon' onClick={handleGoBack} />
            <h2>{userName}   <FontAwesomeIcon icon={faCaretDown} className='icon' /></h2>
            <Link to="/addCloseFriends">
            <FontAwesomeIcon icon={faUserPlus} className='icon'/>
            </Link>
        </div>
    );
};

export default TopNavbarProfile;
