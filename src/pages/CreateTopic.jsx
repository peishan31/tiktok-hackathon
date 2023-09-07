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
    const categoryId = getCategoryId;

    const handleSubmit = async () => {
        console.log('Title:', title);
        console.log('Content:', content); 

        const topicData = {
            topicTitle: title,
            topicContent: content,
            topicShoppingImage: "",
            author: "jyp",
            authorImage: "",
            timestamp: new Date() 
        };

        try {
            const topicCollectionRef = collection(
                db,
                'categories',
                categoryId,
                'topics'
            );
        
            await addDoc(topicCollectionRef, topicData);
        
            console.log("topic added successfully!");
        
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };

    return (
        <div className="app">
            <div className="container" style={{backgroundColor: '#fff'}}>
                <TopNavbar className="top-navbar" title="Create Post"/>
                <Box sx={{ px: 2 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoFocus
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        onClick={handleSubmit}
                        sx={{
                            marginBottom: "8px",
                            borderColor: "#EA403F",
                            color: "#EA403F",
                            '&:hover': {
                                backgroundColor: "#EA403F",
                                color: "white",
                                borderColor: "#EA403F",
                            }
                        }}
                        >
                        Add shop link (Optional)
                        </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: "#EA403F",  
                            color: "white",             
                            borderColor: "#EA403F",    
                            '&:hover': {
                                backgroundColor: "transparent",  
                                color: "#EA403F",               
                                borderColor: "#EA403F",          
                            }
                        }}
                        >
                        Create
                        </Button>
                </Box>
                <BottomNavbarWhite className="bottom-navbar-white" />
            </div>
        </div>
    );
}

export default CreateTopic;
