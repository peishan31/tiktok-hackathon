import VideoCard from '../components/VideoCard';
import BottomNavbarWhite from '../components/BottomNavbarWhite';
import TopNavbarProfile from '../components/TopNavBarCloseFriendList';
import React, { useEffect, useState, useRef } from 'react';
import './profile.css';
import CenteredTabs from './FriendsTabs';


function FriendsList() {
  return (
    <div className="app">
      <div className="container">
      <TopNavbarProfile className="top-navbar-profile" />
        <div className='profile'>
          <div className="minHeight">
          <CenteredTabs />
          </div>
          <BottomNavbarWhite className="bottom-navbar-white" />

        </div>
      </div>
    </div>
  );
}

export default FriendsList;
