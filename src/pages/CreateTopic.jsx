import BottomNavbarWhite from '../components/BottomNavbarWhite';
import TopNavbar from '../components/DefaultTopNavbar';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import { Box, TextField, Button, Container, CssBaseline, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import {
    collection,
    getDocs,
    query,
    deleteDoc,
    where,
    doc,
    addDoc,
} from 'firebase/firestore/lite';

function CreateTopic() {
    const { getCategoryId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const categoryId = getCategoryId;
    const [addShopLinkBtnClicked, setAddShopLinkBtnClicked] = useState(false);
    
    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        setTitleError(value.trim() === '' ? 'Title is required' : '');
    };
    
    const handleContentChange = (e) => {
        const value = e.target.value;
        setContent(value);
        setContentError(value.trim() === '' ? 'Content is required' : '');
    };

    const handleSubmit = async () => {
        console.log('Title:', title);
        console.log('Content:', content); 

        if (title.trim() === '') {
            setTitleError('Title is required');
            return;
        }

        if (content.trim() === '') {
            setContentError('Content is required');
            return;
        }

        const topicData = {
            topicTitle: title,
            topicContent: content,
            topicShoppingImage: "",
            author: "jacob_w",
            authorImage: "https://res.cloudinary.com/dlizbxmyz/image/upload/v1694066132/dp_ailrcc.png",
            timestamp: new Date() 
        };

        if (addShopLinkBtnClicked) {
            topicData.topicShoppingImage = "https://res.cloudinary.com/dlizbxmyz/image/upload/v1693982765/item1_fyy44t.png";
        }

        try {
            const topicCollectionRef = collection(
                db,
                'categories',
                categoryId,
                'topics'
            );
        
            await addDoc(topicCollectionRef, topicData);
        
            console.log("topic added successfully!");
            // Navigate back to the previous page
            window.history.back();
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };

    const handleAddShopLink = async () => {
        setAddShopLinkBtnClicked(true); 
    };

    return (
        <div className="app">
            <div className="container" style={{backgroundColor: '#fff'}}>
                <div className="minHeight">
                    <TopNavbar className="top-navbar" title="Create Topic"/>
                    <Box sx={{ px: 2 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoFocus
                            value={title}
                            onChange={handleTitleChange}
                            error={!!titleError}
                            helperText={titleError}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            rows={4}
                            id="content"
                            label="Content"
                            name="content"
                            value={content}
                            onChange={handleContentChange}
                            error={!!contentError}
                            helperText={contentError}
                        />
                        {
                            addShopLinkBtnClicked ? (
                                <img 
                                    src="https://res.cloudinary.com/dlizbxmyz/image/upload/v1693982765/item1_fyy44t.png" 
                                    alt="Shop Link"
                                    style={{ maxWidth: '40%', marginTop: '10px' }}
                                />
                            ):(
                                <Button
                                fullWidth
                                variant="outlined"
                                onClick={handleAddShopLink}
                                sx={{
                                    marginBottom: "8px",
                                    borderColor: "black",
                                    color: "black",
                                    textTransform: "none",
                                    '&:hover': {
                                        backgroundColor: "black",
                                        color: "white",
                                        borderColor: "black",
                                    },
                                    marginTop: "8px"
                                }}
                                >
                                Add shop link (Optional)
                                </Button>
                            )
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={{
                                backgroundColor: "black",  
                                color: "white",             
                                borderColor: "black",  
                                textTransform: "none",  
                                '&:hover': {
                                    backgroundColor: "white",  
                                    color: "black",               
                                    borderColor: "black",          
                                },
                                marginTop: "8px"
                            }}
                            >
                            Create
                            </Button>
                    </Box>
                </div>
                <BottomNavbarWhite className="bottom-navbar-white" />
            </div>
        </div>
    );
}

export default CreateTopic;
