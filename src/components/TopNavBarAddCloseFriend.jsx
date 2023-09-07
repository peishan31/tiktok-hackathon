import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan, faCheck, faCaretDown } from '@fortawesome/free-solid-svg-icons';
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
            <h2>JYP   <FontAwesomeIcon icon={faCaretDown} className='icon' /></h2>
            <FontAwesomeIcon icon={faCheck} className='icon' onClick={handleGoBack} />
            {/* <Link to="/addCloseFriends">
            </Link> */}
        </div>
    );
};

export default TopNavbarProfile;
