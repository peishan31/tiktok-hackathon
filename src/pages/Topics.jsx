import BottomNavbarWhite from '../components/BottomNavbarWhite';
import TopNavbar from '../components/DefaultTopNavbar';
import { db } from "../config/firebase";
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
import CircularProgress from '@mui/material/CircularProgress';

function Category() {

    const { getCategoryId } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const categoryId = getCategoryId;
    const [isLoading, setIsLoading] = useState(true);

    const handleClearSearch = () => {
        setSearchQuery('');
    };
    
    const handleSearch = () => {
        console.log('Search query:', searchQuery);

        // Filter the topics based on the searchQuery
        const filtered = topics.filter((topic) =>
            topic.topicTitle.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredTopics(filtered); // Update the filteredTopics state with the filtered results
    };

    const [category, setCategory] = useState([]);
    const [topics, setTopics] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState([]);

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
                setFilteredTopics(topicsDocumentsData);
                setIsLoading(false); 
            }
            catch (error) {
                console.error('Error fetching subdocuments:', error);
                setIsLoading(false);
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
                <div className="minHeight">
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
                        {isLoading ? (
                            <div style={{ textAlign: 'center' }}>
                                <CircularProgress size={24} sx={{ color: 'red', mx: 'auto', my: 2 }} />
                            </div>
                            ) : (
                            <div className="results-container" style={{ marginTop: '10px' }}>
                                {filteredTopics.length === 0 ? (
                                <p style={{ textAlign: "center" }}>No topics yet. Click '+' to contribute!</p>
                                ) : (
                                <div>
                                    {filteredTopics.map((topic) => (
                                    <Link
                                        to={`/topics/${categoryId}/${topic.id}`}
                                        style={linkStyle}
                                        key={topic.id}
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
                                            {topic.commentCount <= 1 ? `${topic.commentCount} comment` : `${topic.commentCount} comments`}
                                            </Typography>
                                        </CardContent>
                                        </Card>
                                    </Link>
                                    ))}
                                </div>
                                )}
                            </div>
                            )}
                        </div>
                    </Box>
                </div>
                <BottomNavbarWhite className="bottom-navbar-white" />
            </div>
        </div>
    );
}

export default Category;
