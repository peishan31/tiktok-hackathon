import VideoCard from '../components/VideoCard';
import BottomNavbar from '../components/BottomNavbar';
import TopNavbar from '../components/TopNavBarForShop';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from "firebase/firestore/lite";

function Wishlist() {
  return (
    <div className="app">
      <div className="container">
        <TopNavbar className="top-navbar" />

        <BottomNavbar className="bottom-navbar" />
      </div>
    </div>
  );
}

export default Wishlist;
