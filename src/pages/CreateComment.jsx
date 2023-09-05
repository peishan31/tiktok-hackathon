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

const CreateComment = ({ message, onClose, onAdd }) => {

    const [comment, setComment] = useState('');

    const handleCommentSubmit = () => {
        
        console.log('Comment submitted:', comment);
        setComment('');
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
                <button className="iconPopup">
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
