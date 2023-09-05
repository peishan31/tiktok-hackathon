import VideoCard from '../components/VideoCard';
import BottomNavbarWhite from '../components/BottomNavbarWhite';
import TopNavbarProfile from '../components/TopNavbarProfile';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from "firebase/firestore/lite";
import './profile.css';
import profilepic from '../images/profilepic.png';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CenteredTabs from './CenteredTabs';
import { Link } from 'react-router-dom';


function Profile() {
  return (
    <div className="app">
      <div className="container">
      <TopNavbarProfile className="top-navbar-profile" />
        <div className='profile'>
          <img src={profilepic}></img>
          <div className="center">
            <button className='editprofile'>Edit Profile</button>           
            <Link to="/SavedItems">
            <button><FontAwesomeIcon icon={faBookmark} className='icon'/> </button>
            </Link>
          </div>
          <CenteredTabs />
          <BottomNavbarWhite className="bottom-navbar-white" />

        </div>
        
      </div>
    </div>
  );
}

export default Profile;
