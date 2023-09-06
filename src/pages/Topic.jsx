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
import Popup from './Popup';
import CreateComment from './CreateComment';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { collection, getDoc, getDocs, query, deleteDoc, where, doc, addDoc, setDoc, orderBy,limit } from "firebase/firestore/lite";

function Topic() {
    
    const { getCategoryId, getTopicId } = useParams();
    const categoryId = getCategoryId;
    const topicId = getTopicId;
    const [topic, setTopic] = useState({});
    const [comments, setComments] = useState([]);

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

    const [showPopup, setShowPopup] = useState(false);

    const handleShowPopup = () => {
        console.log("triggered true")
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        console.log("triggered false")
        setShowPopup(false);
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
                const commentsQuerySnapshot = await getDocs(commentsCollectionRef);
                const comments = [];

                commentsQuerySnapshot.forEach((commentDoc) => {
                    comments.push({ id: commentDoc.id, ...commentDoc.data() });
                });
                console.log("Fetched comments for the topic:", JSON.stringify(comments));
                setComments(comments);
            }
            catch (error) {
                console.error('Error fetching subdocuments:', error);
            }
        };
        fetchSubdocuments();
    }, []);

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
                        <Card key={topic.id} variant="outlined" style={{ marginBottom: '10px' }}>
                            <CardHeader
                                avatar={<Avatar alt={topic.author} src={topic.authorImage} />}
                                title={topic.author}
                                subheader={topic.timestamp ? topic.timestamp.toDate().toLocaleString() : ''}
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
                                        subheader={topic.timestamp ? topic.timestamp.toDate().toLocaleString() : ''}
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
                            />
                        )}
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default Topic;
