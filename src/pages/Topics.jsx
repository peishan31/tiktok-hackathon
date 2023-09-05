import BottomNavbar from '../components/BottomNavbar';
import TopNavbar from '../components/DefaultTopNavbar';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { Box, Typography, TextField, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Topics.css';
import profilepic from '../images/profilepic.png';
import item1 from '../images/item1.png';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

function Category() {

    const [searchQuery, setSearchQuery] = useState('');

    const handleClearSearch = () => {
        setSearchQuery('');
    };
    
    const handleSearch = () => {
        // TODO: Implement the search functionality here
        console.log('Search query:', searchQuery);
    };

    const cardContent = [
        {
            id: 1,
            userProfileImage: profilepic,
            username: 'JohnDoe',
            postTitle: '😍Amazing Product!',
            comments: 2,
            productImage: item1,
            date: '5 July 2023 8:30am',
        },
        {
            id: 2,
            userProfileImage: '../images/item1.png',
            username: 'JaneSmith',
            postTitle: '😎Check out this cool item!',
            comments: 5,
            productImage: "",
            date: '3 July 2023 10:30am',
        }
    ];

    const linkStyle = {
        textDecoration: 'none', // Remove underline
        color: 'inherit', // Inherit the color from parent
    };

    const tiktokRedColor = '#EA403F';

    return (
        <div className="app">
            <div className="container" style={{backgroundColor: '#fff'}}>
                <TopNavbar className="top-navbar" title="Threads"/>
                <Box sx={{ px: 2 }}>
                    <h5 style={{ marginBottom: '10px', fontSize: 'large', marginTop: '10px' }}>Fashion</h5>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h5 style={{ marginBottom: '10px', marginTop: '10px' }}>Search Topic</h5>
                        <Link
                            to="/CreatePost"
                            style={linkStyle}
                        >
                            <IconButton 
                                color="secondary"
                                sx={{ padding: '8px', color: tiktokRedColor }}
                                >
                                <AddIcon />
                            </IconButton>
                        </Link>
                    </div>
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
                    <div className="results-container" style={{ marginTop: '10px'}}>
                        <Link
                            to="/topic"
                            style={linkStyle}
                        >
                        {cardContent.map((card) => (
                            <Card key={card.id} variant="outlined" style={{ marginBottom: '10px' }}>
                            <CardHeader
                                avatar={<Avatar alt={card.username} src={card.userProfileImage} />}
                                title={card.username}
                                subheader={card.date} 
                                style={{ paddingRight: '16px' }}
                            />
                            <CardContent>
                                <Typography variant="body1" style={{ marginTop: '-20px', fontWeight: 'bold' }}>{card.postTitle}</Typography>
                                {card.productImage ? (
                                    <img
                                    src={card.productImage}
                                    alt="Product"
                                    style={{ maxWidth: '40%', marginTop: '10px' }}
                                    />
                                ) : null}
                                <br />
                                <Typography variant="caption" style={{ marginTop: '10px' }}>
                                {card.comments} comments
                                </Typography>
                            </CardContent>
                            </Card>
                        ))}
                        </Link>
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default Category;
