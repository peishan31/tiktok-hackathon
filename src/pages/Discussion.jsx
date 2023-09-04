import BottomNavbar from '../components/BottomNavbar';
import TopNavbar from '../components/DefaultTopNavbar';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

function Discussion() {

  const categoryStyle = {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: '10px'
  }

  const categories = [
    'Accessories',
    'Automotive & Motorcycles',
    'Baby & Kids',
    'Beauty & Personal Care',
    'Books & Stationery',
    'Electronics',
    'Fashion',
    'Groceries',
    'Health & Wellness',
    'Home & Living',
    'Jewelry',
    "Men's Clothing",
    'Mobile & Gadgets',
    'Motors',
    'Pets',
    'Sports & Outdoors',
    'Toys & Games',
    'TV, Audio / Video, Gaming & Wearables',
    "Women's Clothing",
    'Watches',
  ];

  return (
    <div className="app">
      <div className="container" style={{backgroundColor: '#fff'}}>
        <TopNavbar className="top-navbar" title="Threads"/>
        <Box sx={{ px: 2 }}>
          <div className="navbar">
            <h5 style={{ marginBottom: '10px' }}>Trending Now</h5>
            <ul className="scrollable-container nav-list">
              <li className="nav-item">
                <Button variant="outlined" color="primary" sx={{ borderColor: 'black', color: 'black' }}>
                  👚Fashion
                </Button>
              </li>
              <li className="nav-item">
                <Button variant="outlined" color="primary" sx={{ borderColor: 'black', color: 'black' }}>
                  💄Beauty & Personal Care
                </Button>
              </li>
              <li className="nav-item">
                <Button variant="outlined" color="primary" sx={{ borderColor: 'black', color: 'black' }}>
                  😋Groceries
                </Button>
              </li>
            </ul>
          </div>
          <h5 style={{ marginBottom: '10px' }}>All Categories</h5>
            {categories.map((category, index) => (
              <Link
                to={`/category/${encodeURIComponent(category)}`}s
                key={index}
              >
                <div style={categoryStyle} key={index}>
                  <Typography variant="body1">{category}</Typography>
                  <ArrowForwardIcon style={{ color: 'gray' }} />
                </div>
              </Link>
            ))}
          </Box>
      </div>
    </div>
  );
}

export default Discussion;
