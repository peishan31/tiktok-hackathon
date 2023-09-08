import BottomNavbarWhite from '../components/BottomNavbarWhite';
import TopNavbar from '../components/DefaultTopNavbar';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query, deleteDoc, where, doc, addDoc, setDoc, orderBy,limit } from "firebase/firestore/lite";
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

function Threads() {

  const categoryStyle = {
    display: 'flex', 
    
    justifyContent: 'space-between',
    marginBottom: '10px'
  }

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {

    const fetchCategories = async () => {
      const categoryCollectionRef = collection(db, 'categories'); 
      const q = query(categoryCollectionRef, orderBy('categoryName'));
      try {
        const querySnapshot = await getDocs(q);
        const categoriesData = [];

        querySnapshot.forEach((doc) => {
          categoriesData.push({ id: doc.id, ...doc.data() });
        });

        setCategories(categoriesData);
        setLoadingCategories(false);
        console.log("Categories:", categoriesData); 
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoadingCategories(false);
      }
    };

    fetchCategories(); 
  }, []);


  const linkStyle = {
        textDecoration: 'none',
        color: 'inherit',
    };

  return (
    <div className="app">
      <div className="container" style={{backgroundColor: '#fff'}}>
        <TopNavbar className="top-navbar" title="Threads"/>
        <Box sx={{ px: 2 }}>
          <div className="navbar">
            <h5 style={{ marginBottom: '10px', fontSize: 'large', marginTop: '10px' }}>Trending Now</h5>
            <ul className="scrollable-container nav-list">
              <li className="nav-item">
                <Link to="/topics/V7IvSI0Ae3pvbXS5lnbt">
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    sx={{ 
                      borderColor: 'black', 
                      color: 'black', 
                      borderRight: '5px solid red', 
                      borderLeft: '5px solid turquoise',
                      textTransform: "none"
                    }}>
                    Fashion
                  </Button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/topics/HM2Pn47uWPfuJprE1LRU">
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    sx={{ 
                      borderColor: 'black', 
                      color: 'black', 
                      borderRight: '5px solid red', 
                      borderLeft: '5px solid turquoise',
                      textTransform: "none"
                    }}>
                    Accessories
                  </Button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/topics/9AJvS5R8q3aceLDhVGna">
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    sx={{ 
                      borderColor: 'black', 
                      color: 'black', 
                      borderRight: '5px solid red', 
                      borderLeft: '5px solid turquoise',
                      textTransform: "none"
                    }}>
                    Groceries
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
          <h5 style={{ marginBottom: '10px', fontSize: 'large', marginTop: '20px' }}>All Categories</h5>
            {loadingCategories ? (
                <div style={{ textAlign: 'center' }}>
                  <CircularProgress size={24} sx={{ color: 'red', mx: 'auto', my: 2 }} />
                </div>
              ) : (
                <div>
                  {categories.map((category, index) => (
                    <Link
                      to={`/topics/${category.id}`}
                      key={index}
                      style={linkStyle}
                    >
                      <div style={categoryStyle} key={index}>
                        <Typography variant="body1">{category.categoryName}</Typography>
                        <ArrowForwardIcon style={{ color: 'gray' }} />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
          </Box>
          <BottomNavbarWhite className="bottom-navbar-white" />
      </div>
    </div>
  );
}

export default Threads;
