import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app'; // Import initializeApp specifically
import { collection, getDocs,doc, getDoc } from "firebase/firestore/lite";
import {db} from "../config/firebase";

const UserProfileImage = ({ docId }) => {
    const [profileImg, setProfileImg] = useState(null);
  
    useEffect(() => {
      const collectionName = 'users';
      const userDocRef = doc(db, collectionName, docId);
  
      getDoc(userDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            const profileImgValue = userData.profileImg;
            setProfileImg(profileImgValue);
          } else {
            console.log('Document does not exist.');
          }
        })
        .catch((error) => {
          console.error('Error getting document:', error);
        });
    }, [docId]);
  
    return (
      <div>
        {profileImg ? (
          <img src={profileImg} alt="Profile" 
          style={{
            width: '150px', // Set the desired width
            height: '150px', // Set the desired height
            borderRadius: '50%', // Make the image round
            objectFit: 'cover', // Ensure the image covers the entire container
            marginLeft: '30%'
          }}/>
        ) : (
          <p>Loading profile image...</p>
        )}
      </div>
    );
  };
  
  export default UserProfileImage;