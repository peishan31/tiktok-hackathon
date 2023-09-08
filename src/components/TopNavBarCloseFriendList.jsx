import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan, faUserPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import "./topbarprofile.css";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TopNavbarProfile = () => {
    const history = useHistory();

    const handleGoBack = () => {
        // Go back to the previous page
        history.goBack();
    };

    return (
        <div className="top-navbar-profile">
            <FontAwesomeIcon icon={faLessThan} className='icon' onClick={handleGoBack} />
            <h2>jacob_w   <FontAwesomeIcon icon={faCaretDown} className='icon' /></h2>
            <Link to="/addCloseFriends">
            <FontAwesomeIcon icon={faUserPlus} className='icon'/>
            </Link>
        </div>
    );
};

export default TopNavbarProfile;
