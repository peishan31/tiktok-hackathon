import BottomNavbar from '../components/BottomNavbar';
import TopNavbar from '../components/DefaultTopNavbar';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { Box, Typography, TextField, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Category.css';
import profilepic from '../images/profilepic.png';
import item1 from '../images/item1.png';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

function SpecificCategoryPost() {

    const [searchQuery, setSearchQuery] = useState('');

    const handleClearSearch = () => {
        setSearchQuery('');
    };
    
    const handleSearch = () => {
        // TODO: Implement the search functionality here
        console.log('Search query:', searchQuery);
    };

    const postContent =
    {
        id: 1,
        userProfileImage: profilepic,
        username: 'JohnDoe',
        postTitle: '😍Amazing Product!',
        comments: 2,
        productImage: item1,
        date: '5 July 2023 8:30am',
    };

    const commentContent = [
        {
            id: 1,
            userProfileImage: profilepic,
            username: 'JohnDoe',
            postTitle: '😍Amazing Product!',
            date: '5 July 2023 8:30am',
        },
        {
            id: 2,
            username: 'JaneSmith',
            postTitle: '😎Check out this cool item!',
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
                <TopNavbar className="top-navbar" title="Fashion"/>
                <Box sx={{ px: 2 }}>
                    <div className="navbar">
                        <h5 style={{ marginBottom: '10px' }}>Keywords</h5>
                        <ul className="scrollable-container nav-list">
                        <li className="nav-item">
                            <Button variant="outlined" color="primary" sx={{ borderColor: 'black', color: 'black' }}>
                                All
                            </Button>
                        </li>
                        <li className="nav-item">
                            <Button variant="outlined" color="primary" sx={{ borderColor: 'black', color: 'black' }}>
                                Cheap
                            </Button>
                        </li>
                        <li className="nav-item">
                            <Button variant="outlined" color="primary" sx={{ borderColor: 'black', color: 'black' }}>
                                Affordables
                            </Button>
                        </li>
                        </ul>
                    </div>
                    <div className="post-container" style={{ marginTop: '10px'}}>
                        <Card key={postContent.id} variant="outlined" style={{ marginBottom: '10px' }}>
                            <CardHeader
                                avatar={<Avatar alt={postContent.username} src={postContent.userProfileImage} />}
                                title={postContent.username}
                                subheader={postContent.date}
                                style={{ paddingRight: '16px' }}
                            />
                            <CardContent>
                                <Typography variant="body1" style={{ marginTop: '-20px', fontWeight: 'bold' }}>{postContent.postTitle}</Typography>
                                {postContent.productImage && (
                                <img
                                    src={postContent.productImage}
                                    alt="Product"
                                    style={{ maxWidth: '40%', marginTop: '10px' }}
                                />
                                )}
                            </CardContent>
                        </Card>
                        <div style={{ marginTop: '10px', textAlign: 'center' }}>
                            <Typography variant="caption">
                                {postContent.comments} comments
                            </Typography>
                        </div>
                    </div>
                    <div className="comments-container" style={{ marginTop: '1px'}}>
                        {commentContent.map((card) => (
                            <Card key={card.id} variant="outlined" style={{ marginBottom: '10px' }}>
                            <CardHeader
                                avatar={<Avatar alt={card.username} src={card.userProfileImage} />}
                                title={card.username}
                                subheader={card.date} 
                                style={{ paddingRight: '16px' }}
                            />
                            <CardContent>
                                <Typography variant="body1" style={{ marginTop: '-20px', fontSize: '15px' }}>{card.postTitle}</Typography>
                            </CardContent>
                            </Card>
                        ))}
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default SpecificCategoryPost;
