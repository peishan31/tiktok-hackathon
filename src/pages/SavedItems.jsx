import BottomNavbarWhite from '../components/BottomNavbarWhite';
import TopNavBarSaved from '../components/TopNavBarSaved';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from "firebase/firestore/lite";
import './profile.css';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SavedTabs from './SavedTabs';

function SavedItems() {
  return (
    <div className="app">
      <div className="container">
      <TopNavBarSaved className="top-navbar-profile" />
        <div className='profile'>
        </div>
        <BottomNavbarWhite className="bottom-navbar-white" />
      </div>
    </div>
  );
}

export default SavedItems;
