import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import TextField from '@mui/material/TextField';
import './CreateComment.css';
import db from '../config/firebase';
import {
    collection,
    getDocs,
    query,
    deleteDoc,
    where,
    doc,
    addDoc,
} from 'firebase/firestore/lite';

const CreateComment = ({ message, onClose, onAdd, categoryID, topicID }) => {

    const [comment, setComment] = useState('');

    const handleCommentSubmit = async () => {

        console.log('Comment submitted:', comment);
        // name, date, comment
        // const categoryID = "HM2Pn47uWPfuJprE1LRU"; 
        // const topicID = "zafrkyidkHUozPJOegWi";  

        const timeZone = 'Asia/Singapore';

        const commentData = {
            author: "jyp",
            authorImage: "",
            comment: comment,
            timestamp: new Date()
        };
        try {
            const commentCollectionRef = collection(
                db,
                'categories',
                categoryID,
                'topics',
                topicID,
                'comments'
            );
        
            await addDoc(commentCollectionRef, commentData);
        
            console.log("Comment added successfully!");
            // respond back to topic page to reinitialise the comments
            onAdd();
        
        } catch (error) {
            console.error("Error adding comment: ", error);
        }

        setComment('');
        onClose();
    };
    
    const handleCancel = () => {
        setComment(''); // Clear the comment input when Cancel is clicked
        onClose();
    };

    return (
    <div className="popup">
        <div className="popup-content">
            <div className="button-container">
            <p className="msg">{message}</p>
            {comment && (
                <button className="iconPopup" onClick={handleCommentSubmit}>
                    Comment
                </button>
            )}
            
            <button className="cancelBtn" onClick={handleCancel}>
                Cancel
            </button>
            </div>
            <br>
            </br>
            <div className="comment-content">
                <TextField
                    multiline
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    variant="outlined"
                    className="comment-input"
                    rows={4}
                    fullWidth
                />
            </div>
        </div>
    </div>
    );
};

export default CreateComment;
