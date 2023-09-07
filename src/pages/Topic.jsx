import BottomNavbarWhite from '../components/BottomNavbarWhite';
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
import Popup from './Popup';
import CreateComment from './CreateComment';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { collection, getDoc, getDocs, query, deleteDoc, where, doc, addDoc, setDoc, orderBy,limit } from "firebase/firestore/lite";
import CircularProgress from '@mui/material/CircularProgress';

function Topic() {
    
    const { getCategoryId, getTopicId } = useParams();
    const categoryId = getCategoryId;
    const topicId = getTopicId;
    const [topic, setTopic] = useState({});
    const [comments, setComments] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleShowPopup = () => {
        console.log("triggered true")
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        console.log("triggered false")
        setShowPopup(false);
    };
    
    const updateComments = async () => {
        console.log("comments added! trigger update")
        setIsLoading(true);
        // Fetch subdocuments frm topic to get comments
        const commentsCollectionRef = collection(db, 'categories', categoryId, 'topics', topicId, 'comments');
        const commentsQuerySnapshot = await getDocs(query(commentsCollectionRef, orderBy('timestamp', 'desc')));
        const comments = [];
        setComments([]);
        commentsQuerySnapshot.forEach((commentDoc) => {
            comments.push({ id: commentDoc.id, ...commentDoc.data() });
        });
        console.log("Fetched comments for the topic:", JSON.stringify(comments));
        setComments(comments);
        setIsLoading(false);
    };

    useEffect(() => {

        const fetchSubdocuments = async () => {

            try {

                const categoryDocRef = doc(db, 'categories', categoryId);
                const categoryDocSnapshot = await getDoc(categoryDocRef);
                if (!categoryDocSnapshot.exists()) {
                    console.log("Category document does not exist.");
                    return;
                }

                // Fetch subdocuments to get a specific topic
                const topicsCollectionRef = collection(categoryDocRef, 'topics');
                const querySnapshot = await getDocs(topicsCollectionRef);

                let foundTopic = null;

                querySnapshot.forEach((doc) => {
                    const topicData = { id: doc.id, ...doc.data() };
                    if (topicData.id === topicId) {
                        foundTopic = topicData;
                    }
                });

                if (!foundTopic) {
                    console.log("Topic not found.");
                    return;
                }
                
                setTopic(foundTopic);
                console.log("Fetched topic:", JSON.stringify(foundTopic));
                
                // Fetch subdocuments frm topic to get comments
                const commentsCollectionRef = collection(db, 'categories', categoryId, 'topics', topicId, 'comments');
                const commentsQuerySnapshot = await getDocs(query(commentsCollectionRef, orderBy('timestamp', 'desc')));
                const comments = [];

                commentsQuerySnapshot.forEach((commentDoc) => {
                    comments.push({ id: commentDoc.id, ...commentDoc.data() });
                });
                console.log("Fetched comments for the topic:", JSON.stringify(comments));
                setComments(comments);
                setIsLoading(false);
            }
            catch (error) {
                console.error('Error fetching subdocuments:', error);
                setIsLoading(false);
            }
        };
        fetchSubdocuments();
    }, []);

    return (
        <div className="app">
            <div className="container" style={{backgroundColor: '#fff'}}>
                <TopNavbar className="top-navbar" title="Threads"/>
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
                    {isLoading ? ( // Conditional rendering based on isLoading
                        <div style={{ textAlign: 'center' }}>
                            <CircularProgress size={24} sx={{ color: 'red', mx: 'auto', my: 2 }} />
                        </div>
                    ) : (
                        <div>
                            <div className="post-container" style={{ marginTop: '10px'}}>
                                <Card key={topic.id} variant="outlined" style={{ marginBottom: '10px' }}>
                                    <CardHeader
                                        avatar={<Avatar alt={topic.author} src={topic.authorImage} />}
                                        title={topic.author}
                                        subheader={
                                            topic.timestamp 
                                                ? topic.timestamp
                                                    .toDate()
                                                    .toLocaleString('en-US', { timeZone: 'Asia/Singapore' })
                                                : ''}
                                        style={{ paddingRight: '16px' }}
                                    />
                                    <CardContent>
                                        <Typography variant="body1" style={{ marginTop: '-20px', fontWeight: 'bold' }}>{topic.topicTitle}</Typography>
                                        {topic.topicShoppingImage && (
                                        <img
                                            src={topic.topicShoppingImage}
                                            alt="Product"
                                            style={{ maxWidth: '40%', marginTop: '10px' }}
                                        />
                                        )}
                                    </CardContent>
                                </Card>
                                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                    <Typography variant="caption">
                                        {comments.length === 0 ? `${comments.length} comment` : `${comments.length} comments`} 
                                    </Typography>
                                </div>
                            </div>
                            <div className="comments-container" style={{ marginTop: '1px'}}>
                                {comments.length === 0 ? (
                                    <p style={{textAlign: "center"}}>No comments yet...</p>
                                ):(
                                    <div>
                                        {comments.map((comment) => (
                                            <Card key={comment.id} variant="outlined" style={{ marginBottom: '10px' }}>
                                            <CardHeader
                                                avatar={<Avatar alt={comment.author} src={comment.authorImage} />}
                                                title={comment.author}
                                                style={{ paddingRight: '16px' }}
                                                subheader={
                                                    comment.timestamp 
                                                    ? comment.timestamp.toDate().toLocaleString()
                                                    : ''}
                                            />
                                            <CardContent>
                                                <Typography variant="body1" style={{ marginTop: '-20px', fontSize: '15px' }}>{comment.comment}</Typography>
                                            </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )
                                }
                                
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                                <Button 
                                    variant="outlined" 
                                    color="primary" 
                                    sx={{ borderColor: 'black', color: 'black' }}
                                    onClick={handleShowPopup}
                                >
                                    Post Comment
                                </Button>
                                {showPopup && (
                                    <CreateComment
                                        message="Post Comment"
                                        onClose={handleClosePopup}
                                        onAdd={updateComments}
                                        categoryID={categoryId}
                                        topicID={topicId}
                                    />
                                )}
                            </div>
                        </div>
                        )}
                        
                    </Box>
                    <BottomNavbarWhite className="bottom-navbar-white" />
                </div>
            </div>
            );
}

export default Topic;
