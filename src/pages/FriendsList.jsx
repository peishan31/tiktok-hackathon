import VideoCard from '../components/VideoCard';
import BottomNavbarWhite from '../components/BottomNavbarWhite';
import TopNavbarProfile from '../components/TopNavBarCloseFriendList';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from "firebase/firestore/lite";
import './profile.css';
import profilepic from '../images/profilepic.png';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CenteredTabs from './FriendsTabs';
import { Link } from 'react-router-dom';


function FriendsList() {
  return (
    <div className="app">
      <div className="container">
      <TopNavbarProfile className="top-navbar-profile" />
        <div className='profile'>
          <CenteredTabs />
          <BottomNavbarWhite className="bottom-navbar-white" />

        </div>
      </div>
    </div>
  );
}

export default FriendsList;
