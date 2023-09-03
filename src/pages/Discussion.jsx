import VideoCard from '../components/VideoCard';
import BottomNavbar from '../components/BottomNavbar';
import TopNavbar from '../components/DefaultTopNavbar';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from "firebase/firestore/lite";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faMessage, faComments, faCartShopping, faShoppingBasket, faListUl, faStickyNote, faBookmark, faHeart, faMoneyCheckDollar, faMapLocation, faInfo, faLessThan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function Discussion() {

  return (
    <div className="app">
      <div className="container">
        /*Navbar start*/
        <TopNavbar className="top-navbar" title="Threads"/>
        /*Navbar end*/
        <div>
          testing
        </div>
        <BottomNavbar className="bottom-navbar" />
      </div>
    </div>
  );
}

export default Discussion;
