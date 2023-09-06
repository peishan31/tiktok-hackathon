import BottomNavbar from '../components/BottomNavbar';
import TopNavbar from '../components/DefaultTopNavbar';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query, deleteDoc, where, doc, addDoc, setDoc, orderBy,limit } from "firebase/firestore/lite";
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

function Threads() {

  const categoryStyle = {
    display: 'flex', 
    
    justifyContent: 'space-between',
    marginBottom: '10px'
  }

  /*const categories = [
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
  ];*/
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    const fetchCategories = async () => {
      const categoryCollectionRef = collection(db, 'categories'); 

      try {
        const querySnapshot = await getDocs(categoryCollectionRef);
        const categoriesData = [];

        querySnapshot.forEach((doc) => {
          categoriesData.push({ id: doc.id, ...doc.data() });
        });

        setCategories(categoriesData);
        console.log("Categories:", categoriesData); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories(); // Fetch categories when the component mounts
  }, []);


  const linkStyle = {
        textDecoration: 'none', // Remove underline
        color: 'inherit', // Inherit the color from parent
    };

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
            {/* {categories.map((category, index) => (
              <div style={categoryStyle} key={index}>
                <Link to={`/threads/${category.id}`} style={linkStyle}>
                  <Typography variant="body1" sx={{ color: 'black' }}>
                    {category.categoryName}
                  </Typography>
                </Link>
                <Link to={`/threads/${category.id}`} style={linkStyle}>
                  <ArrowForwardIcon sx={{ color: 'gray' }}/>
                </Link>
              </div>
            ))} */}
            {categories.map((category, index) => (
              <Link
                to={`/topics`}
                key={index}
                style={linkStyle}
              >
                <div style={categoryStyle} key={index}>
                  <Typography variant="body1">{category.categoryName}</Typography>
                  <ArrowForwardIcon style={{ color: 'gray' }} />
                </div>
              </Link>
            ))}
          </Box>
      </div>
    </div>
  );
}

export default Threads;
