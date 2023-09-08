import BottomNavbarWhite from '../components/BottomNavbarWhite';
import TopNavbar from '../components/DefaultTopNavbar';
import db from '../config/firebase';
import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import {
    Box,
    Typography,
    TextField,
    Card,
    CardContent,
    CardHeader,
    Avatar,
} from '@mui/material';
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
import {
    collection,
    getDoc,
    getDocs,
    query,
    deleteDoc,
    where,
    doc,
    addDoc,
    setDoc,
    orderBy,
    limit,
} from 'firebase/firestore/lite';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import CommentIcon from '@material-ui/icons/Comment';
import AddCommentIcon from '@mui/icons-material/AddComment';

function Topic() {
    const { getCategoryId, getTopicId } = useParams();
    const categoryId = getCategoryId;
    const topicId = getTopicId;
    const [topic, setTopic] = useState({});
    const [comments, setComments] = useState([]);
    const [filteredComments, setFilteredComments] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [negativeKeywords, setNegativeKeywords] = useState([]);
    const [positiveKeywords, setPositiveKeywords] = useState([]);
    const initialHighlightedButtons = {
        default: false,
        positive: {},
        negative: {},
    };
    const [highlightedButtons, setHighlightedButtons] = useState({
        default: true,
        positive: {},
        negative: {},
    });

    const buttonStyles = {
        default: {
            borderColor: 'black',
            color: 'black',
            textTransform: 'none',
        },
        highlight: {
            borderColor: 'black',
            color: 'black',
            backgroundColor: 'lightgrey',
            // borderRight: '5px solid red',
            // borderLeft: '5px solid turquoise',
            textTransform: 'none',
        },
    };

    const bottomCommentButtonStyle = {
        position: 'fixed',
        bottom: '18px',
        left: '50%', // Horizontally center the navbar
        transform: 'translateX(-10%)', // Center it precisely
        width: '377px', // Set a fixed width in pixels
        marginLeft: '-150px', // Use negative margin to center it horizontally
        display: 'flex',
        justifyContent: 'space-around',
    };

    const handleShowPopup = () => {
        console.log('triggered true');
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        console.log('triggered false');
        setShowPopup(false);
    };

    const handleButtonClick = (buttonType, keyword) => {
        setIsLoading(true);
        setHighlightedButtons(initialHighlightedButtons); // Reset all buttons to default state

        setHighlightedButtons((prevHighlightedButtons) => {
            const updatedButtons = { ...prevHighlightedButtons };

            if (buttonType === 'negative') {
                // Toggle the state for the specific negative button
                updatedButtons.negative[keyword] =
                    !prevHighlightedButtons.negative[keyword];
            } else if (buttonType === 'positive') {
                // Toggle the state for the specific positive button
                updatedButtons.positive[keyword] =
                    !prevHighlightedButtons.positive[keyword];
            }
            // else {
            //     // Toggle the state for default and positive buttons
            //     updatedButtons[buttonType] = !prevHighlightedButtons[buttonType];
            // }

            return updatedButtons;
        });

        // search selected keyword in comments
        console.log('Clicked keyword:', keyword);

        const filtered = comments.filter((comment) => {
            console.log('filtered: ', comment.comment);
            return comment.comment
                .toLowerCase()
                .includes(keyword.toLowerCase());
        });
        setFilteredComments(filtered); // Update the filteredTopics state with the filtered results
        console.log('filtered results: ', filtered);
        setIsLoading(false);
    };

    const handleReset = () => {
        setIsLoading(true);
        initialHighlightedButtons.default = true;
        setHighlightedButtons(initialHighlightedButtons); // Reset all buttons to default state

        const filtered = comments;
        setFilteredComments(filtered);
        setIsLoading(false);
    };

    const updateComments = async () => {
        console.log('comments added! trigger update');
        getCommentsFromFirestore();
    };

    useEffect(() => {
        const fetchSubdocuments = async () => {
            try {
                const categoryDocRef = doc(db, 'categories', categoryId);
                const categoryDocSnapshot = await getDoc(categoryDocRef);
                if (!categoryDocSnapshot.exists()) {
                    console.log('Category document does not exist.');
                    return;
                }

                // Fetch subdocuments to get a specific topic
                const topicsCollectionRef = collection(
                    categoryDocRef,
                    'topics'
                );
                const querySnapshot = await getDocs(topicsCollectionRef);

                let foundTopic = null;

                querySnapshot.forEach((doc) => {
                    const topicData = { id: doc.id, ...doc.data() };
                    if (topicData.id === topicId) {
                        foundTopic = topicData;
                    }
                });

                if (!foundTopic) {
                    console.log('Topic not found.');
                    return;
                }

                setTopic(foundTopic);
                console.log('Fetched topic:', JSON.stringify(foundTopic));

                getCommentsFromFirestore();

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching subdocuments:', error);
                setIsLoading(false);
            }
        };
        fetchSubdocuments();
    }, []);

    const getCommentsFromFirestore = async () => {
        try {
            setIsLoading(true);
            // Fetch subdocuments frm topic to get comments
            const commentsCollectionRef = collection(
                db,
                'categories',
                categoryId,
                'topics',
                topicId,
                'comments'
            );
            const commentsQuerySnapshot = await getDocs(
                query(commentsCollectionRef, orderBy('timestamp', 'desc'))
            );
            const comments = [];

            commentsQuerySnapshot.forEach((commentDoc) => {
                comments.push({ id: commentDoc.id, ...commentDoc.data() });
            });
            console.log(
                'Fetched comments for the topic:',
                JSON.stringify(comments)
            );

            // store comments.comment in a list and send it to /analyzeComments
            const commentList = [];
            comments.forEach((comment) => {
                commentList.push(comment.comment);
            });
            console.log('commentList:', commentList);

            const response = await axios.post(
                'http://localhost:5000/analyzeComments',
                { commentsList: commentList }
            );
            console.log('response:', response.data);
            if (response.data) {
                setNegativeKeywords(response.data.negative_keywords);
                setPositiveKeywords(response.data.positive_keywords);
            }

            setComments(comments);
            setFilteredComments(comments);
            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className='app'>
            <div className='container' style={{ backgroundColor: '#fff' }}>
                <div className='minHeight'>
                    <TopNavbar className='top-navbar' title='Threads' />

                    {isLoading ? ( // Conditional rendering based on isLoading
                        <div style={{ textAlign: 'center' }}>
                            <CircularProgress
                                size={24}
                                sx={{ color: 'red', mx: 'auto', my: 2 }}
                            />
                        </div>
                    ) : (
                        <div>
                            <Box sx={{ px: 2 }}>
                                <div className='navbar'>
                                    <h5 style={{ marginBottom: '10px' }}>
                                        Filter:
                                    </h5>
                                    <ul className='scrollable-container nav-list'>
                                        {/* <li className="nav-item">
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
                    </li> */}
                                        <li className='nav-item'>
                                            <Button
                                                variant='outlined'
                                                color='primary'
                                                style={
                                                    highlightedButtons[
                                                        'default'
                                                    ]
                                                        ? buttonStyles.highlight
                                                        : buttonStyles.default
                                                }
                                                onClick={() => handleReset()}
                                            >
                                                Default
                                            </Button>
                                        </li>

                                        {/* {positiveKeywords &&
                    positiveKeywords.map((keyword) => (
                        <li className='nav-item' key={keyword.keyword}>
                        <Button
                            variant='outlined'
                            color='primary'
                            style={highlightedButtons['positive'] ? buttonStyles.highlight : buttonStyles.default}
                            onClick={() => handleButtonClick('positive', keyword.keyword)}
                        >
                            {keyword.keyword} ({keyword.count})
                        </Button>
                        </li>
                    ))} */}
                                        {positiveKeywords &&
                                            positiveKeywords.map((keyword) => (
                                                <li
                                                    className='nav-item'
                                                    key={keyword.keyword}
                                                >
                                                    <Button
                                                        variant='outlined'
                                                        color='primary'
                                                        style={
                                                            highlightedButtons
                                                                .positive[
                                                                keyword.keyword
                                                            ]
                                                                ? buttonStyles.highlight
                                                                : buttonStyles.default
                                                        }
                                                        onClick={() =>
                                                            handleButtonClick(
                                                                'positive',
                                                                keyword.keyword
                                                            )
                                                        }
                                                    >
                                                        {keyword.keyword} (
                                                        {keyword.count})
                                                    </Button>
                                                </li>
                                            ))}

                                        {negativeKeywords &&
                                            negativeKeywords.map((keyword) => (
                                                <li
                                                    className='nav-item'
                                                    key={keyword.keyword}
                                                >
                                                    <Button
                                                        variant='outlined'
                                                        color='primary'
                                                        style={
                                                            highlightedButtons
                                                                .negative[
                                                                keyword.keyword
                                                            ]
                                                                ? buttonStyles.highlight
                                                                : buttonStyles.default
                                                        }
                                                        onClick={() =>
                                                            handleButtonClick(
                                                                'negative',
                                                                keyword.keyword
                                                            )
                                                        }
                                                    >
                                                        {keyword.keyword} (
                                                        {keyword.count})
                                                    </Button>
                                                </li>
                                            ))}
                                    </ul>
                                </div>

                                <div
                                    className='post-container'
                                    style={{ marginTop: '10px' }}
                                >
                                    <Card
                                        key={topic.id}
                                        variant='outlined'
                                        style={{ marginBottom: '10px' }}
                                    >
                                        <CardHeader
                                            avatar={
                                                <Avatar
                                                    alt={topic.author}
                                                    src={topic.authorImage}
                                                />
                                            }
                                            title={topic.author}
                                            subheader={
                                                topic.timestamp
                                                    ? topic.timestamp
                                                          .toDate()
                                                          .toLocaleString(
                                                              'en-US',
                                                              {
                                                                  timeZone:
                                                                      'Asia/Singapore',
                                                              }
                                                          )
                                                    : ''
                                            }
                                            style={{ paddingRight: '16px' }}
                                        />
                                        <CardContent>
                                            <Typography
                                                variant='body1'
                                                style={{
                                                    marginTop: '-20px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {topic.topicTitle}
                                            </Typography>
                                            <Typography
                                                variant='body1'
                                                style={{ marginTop: '3px' }}
                                            >
                                                {topic.topicContent}
                                            </Typography>
                                            {topic.topicShoppingImage && (
                                                <img
                                                    src={
                                                        topic.topicShoppingImage
                                                    }
                                                    alt='Product'
                                                    style={{
                                                        maxWidth: '40%',
                                                        marginTop: '10px',
                                                    }}
                                                />
                                            )}
                                        </CardContent>
                                    </Card>
                                    <div
                                        style={{
                                            marginTop: '10px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Typography variant='caption'>
                                            {filteredComments.length <= 1
                                                ? `${filteredComments.length} comment`
                                                : `${filteredComments.length} comments`}
                                        </Typography>
                                    </div>
                                </div>
                                <div
                                    className='comments-container'
                                    style={{ marginTop: '1px' }}
                                >
                                    {comments.length === 0 ? (
                                        <p style={{ textAlign: 'center' }}>
                                            No comments yet...
                                        </p>
                                    ) : (
                                        <div>
                                            {filteredComments.map((comment) => (
                                                <Card
                                                    key={comment.id}
                                                    variant='outlined'
                                                    style={{
                                                        marginBottom: '10px',
                                                    }}
                                                >
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar
                                                                alt={
                                                                    comment.author
                                                                }
                                                                src={
                                                                    comment.authorImage
                                                                }
                                                            />
                                                        }
                                                        title={comment.author}
                                                        style={{
                                                            paddingRight:
                                                                '16px',
                                                        }}
                                                        subheader={
                                                            comment.timestamp
                                                                ? comment.timestamp
                                                                      .toDate()
                                                                      .toLocaleString()
                                                                : ''
                                                        }
                                                    />
                                                    <CardContent>
                                                        <Typography
                                                            variant='body1'
                                                            style={{
                                                                marginTop:
                                                                    '-20px',
                                                                fontSize:
                                                                    '15px',
                                                            }}
                                                        >
                                                            {comment.comment}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div
                                    // style={{
                                    //     display: 'flex',
                                    //     justifyContent: 'flex-end',
                                    //     marginBottom: '10px'
                                    // }}
                                    style={bottomCommentButtonStyle}
                                >
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        sx={{
                                            borderColor: 'red',
                                            // border: 'none',
                                            color: 'red',
                                            // backgroundColor: 'white',
                                            textTransform: 'none',
                                            zIndex: 999999999,
                                            bottom: '85px',
                                            left: '37%', // Horizontally center the navbar
                                            '&:hover': {
                                                color: 'red',
                                                borderColor: 'red',
                                            },
                                        }}
                                        onClick={handleShowPopup}
                                    >
                                        <AddCommentIcon />
                                    </Button>
                                </div>
                                {showPopup && (
                                    <CreateComment
                                        message='Post Comment'
                                        onClose={handleClosePopup}
                                        onAdd={updateComments}
                                        categoryID={categoryId}
                                        topicID={topicId}
                                    />
                                )}
                            </Box>
                        </div>
                    )}
                </div>
                <BottomNavbarWhite className='bottom-navbar-white' />
            </div>
        </div>
    );
}

export default Topic;
