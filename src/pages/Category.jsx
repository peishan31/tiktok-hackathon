import BottomNavbar from '../components/BottomNavbar';
import TopNavbar from '../components/DefaultTopNavbar';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { Box, Typography, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Category.css';

function Category() {

    const [searchQuery, setSearchQuery] = useState('');

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    const handleSearch = () => {
        // TODO: Implement the search functionality here
        console.log('Search query:', searchQuery);
    };

    return (
        <div className="app">
        <div className="container" style={{backgroundColor: '#fff'}}>
            <TopNavbar className="top-navbar" title="Threads"/>
            <Box sx={{ px: 2 }}>
                <h5 style={{ marginBottom: '10px' }}>Fashion</h5>
                <h5 style={{ marginBottom: '10px' }}>Search Topic</h5>
                <div className="tiktok-search">
                    <div className="search-input-container">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    </div>
                    {searchQuery && (
                    <button className="clear-button" onClick={() => setSearchQuery('')}>
                        <CloseIcon fontSize="small" />
                    </button>
                    )}
                    <button className="search-button" onClick={handleSearch}>
                    Search
                    </button>
                </div>
            </Box>
        </div>
        </div>
    );
}

export default Category;
