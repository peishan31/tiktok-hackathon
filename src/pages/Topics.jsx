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
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { collection, getDoc, getDocs, query, deleteDoc, where, doc, addDoc, setDoc, orderBy,limit } from "firebase/firestore/lite";

function Category() {

    const { getCategoryId } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const categoryId = getCategoryId;

    const handleClearSearch = () => {
        setSearchQuery('');
    };
    
    const handleSearch = () => {
        // TODO: Implement the search functionality here
        console.log('Search query:', searchQuery);
    };

    // const cardContent = [
    //     {
    //         id: 1,
    //         userProfileImage: profilepic,
    //         username: 'JohnDoe',
    //         postTitle: '😍Amazing Product!',
    //         comments: 2,
    //         productImage: item1,
    //         date: '5 July 2023 8:30am',
    //     },
    //     {
    //         id: 2,
    //         userProfileImage: '../images/item1.png',
    //         username: 'JaneSmith',
    //         postTitle: '😎Check out this cool item!',
    //         comments: 5,
    //         productImage: "",
    //         date: '3 July 2023 10:30am',
    //     }
    // ];

    const [category, setCategory] = useState([]);
    const [topics, setTopics] = useState([]);

    useEffect(() => {

        const fetchSubdocuments = async () => {

            try {
                
                const categoryDocRef = doc(db, 'categories', categoryId);
                const categoryDocSnapshot = await getDoc(categoryDocRef);
                if (!categoryDocSnapshot.exists()) {
                    console.log("Category document does not exist.");
                    return;
                }
                // Fetch category document
                const categoryData = { id: categoryDocSnapshot.id, ...categoryDocSnapshot.data() };
                console.log("Category Data:", JSON.stringify(categoryData));
                setCategory(categoryData);

                // Fetch subdocuments -> Topics, ordered by timestamp
                const topicsCollectionRef = collection(categoryDocRef, 'topics');
                const querySnapshot = await getDocs(query(topicsCollectionRef, orderBy('timestamp', 'desc'))); 
                const topicsDocumentsData = [];

                for (const doc of querySnapshot.docs) {
                    const topicData = { id: doc.id, ...doc.data() };

                    // Fetch subdocuments -> Comments (for counting no. of comments)
                    const commentsCollectionRef = collection(doc.ref, 'comments');
                    const commentsQuerySnapshot = await getDocs(commentsCollectionRef);
                    const commentCount = commentsQuerySnapshot.size; // Count the comments

                    topicData.commentCount = commentCount; // Add comment count to topic data
                    topicsDocumentsData.push(topicData);
                }
                console.log("topicsDocumentsData:", JSON.stringify(topicsDocumentsData));
                setTopics(topicsDocumentsData);
            }
            catch (error) {
                console.error('Error fetching subdocuments:', error);
            }
        }
        fetchSubdocuments();
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
                    <h5 style={{ marginBottom: '10px', fontSize: 'large', marginTop: '10px' }}>{category.categoryName}</h5>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h5 style={{ marginBottom: '10px', marginTop: '10px' }}>Search Topic</h5>
                        <Link
                            to={`/createTopic/${categoryId}`}
                            style={linkStyle}
                        >
                            <IconButton 
                                color="secondary"
                                sx={{ padding: '8px', color: 'red' }}
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
                    {topics.length === 0 ? (
                        <p style={{textAlign: "center"}}>No topics yet. Click '+' to contribute!</p>
                    ) : (
                        <div>
                            {topics.map((topic) => (
                                <Link
                                    to={`/topics/${categoryId}/${topic.id}`}
                                    style={linkStyle}
                                >
                                    <Card key={topic.id} variant="outlined" style={{ marginBottom: '10px' }}>
                                        <CardHeader
                                            avatar={<Avatar alt={topic.author} src={topic.authorImage} />}
                                            title={topic.author}
                                            style={{ paddingRight: '16px' }}
                                            subheader={topic.timestamp ? topic.timestamp.toDate().toLocaleString() : ''}
                                        />
                                        <CardContent>
                                            <Typography variant="body1" style={{ marginTop: '-20px', fontWeight: 'bold' }}>{topic.topicTitle}</Typography>
                                                {topic.topicShoppingImage ? (
                                                    <img
                                                    src={topic.topicShoppingImage}
                                                    alt="Product"
                                                    style={{ maxWidth: '40%', marginTop: '10px' }}
                                                    />
                                                ) : null}
                                                <br />
                                                <Typography variant="caption" style={{ marginTop: '10px' }}>
                                                {topic.commentCount === 0 ? `${topic.commentCount} comment` : `${topic.commentCount} comments`}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}

                        
                        {/* Old Hardcoded*/}
                        {/* <Link
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
                        </Link> */}
                        {/* Old Hardcoded End*/}
                    </div>
                </Box>
                <BottomNavbarWhite className="bottom-navbar-white" />
            </div>
        </div>
    );
}

export default Category;
