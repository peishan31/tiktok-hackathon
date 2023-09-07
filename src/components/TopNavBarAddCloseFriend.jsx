import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan, faCheck, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import "./topbarprofile.css";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import db from "../config/firebase";
import { doc, updateDoc, query, collection, where, getDocs } from 'firebase/firestore/lite';

const TopNavbarProfile = (AddCloseFriendsList) => {
    const userId = '1';
    const history = useHistory();

    const handleGoBack = () => {
        // Go back to the previous page
        history.goBack();
    };

    const handleUpdateButtonClick = async () => {
        // You can access AddCloseFriendsList here and perform any operations you need
        console.log(AddCloseFriendsList.AddCloseFriendsList);
        var storeFollowersIds = [];
        for (var i = 0; i < AddCloseFriendsList.AddCloseFriendsList.length; i++) {
            if (AddCloseFriendsList.AddCloseFriendsList[i].isChecked) {
                storeFollowersIds.push(AddCloseFriendsList.AddCloseFriendsList[i].friendId);
            }
        }
        for (var i = 0; i < storeFollowersIds.length; i++) {
            
        const followersCollection = collection(db, 'followers');

        // Create a query to find the specific document to update
        const q = query(followersCollection, where('userid', '==', userId), where('followerid', '==', storeFollowersIds[i]));
        // Execute the query to find the document
        const querySnapshot = await getDocs(q);

        // Check if the document exists
        if (!querySnapshot.empty) {
            // Get the first document (assuming there's only one matching document)
            const docRef = querySnapshot.docs[0].ref;

            // Update the document's closeFriend field to true
            await updateDoc(docRef, {
                closeFriend: true,
            });

            console.log('Document updated successfully.');
        } else {
            console.log('Document not found.');
        }
    }
    history.goBack();
    };

    return (
        <div className="top-navbar-profile">
            <FontAwesomeIcon icon={faLessThan} className='icon' onClick={handleGoBack} />
            <h2>JYP   <FontAwesomeIcon icon={faCaretDown} className='icon' /></h2>
            <FontAwesomeIcon icon={faCheck} className='icon' onClick={handleUpdateButtonClick} />
            {/* <Link to="/addCloseFriends">
            </Link> */}
        </div>
    );
};

export default TopNavbarProfile;
