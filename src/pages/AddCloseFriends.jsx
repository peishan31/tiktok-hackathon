import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan, faUserPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import BottomNavbarWhite from '../components/BottomNavbarWhite';
import TopNavbarProfile from '../components/TopNavBarAddCloseFriend';
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { useEffect, useRef } from 'react';
import getUsersData from "./getUsersData"; // Adjust the import path as needed
import TheCard from './AddCloseFriendsPage';
import { useUser } from "../userContext";

function AddCloseFriends() {
  const { user } = useUser();
  const userId = user.value; // Specify the user ID
  const [closeFriendslist, setCloseFriendslist] = useState([]);
  var closeFriendsID = [];

  // Initialize the AddCloseFriendsList state
  const [AddCloseFriendsList, setAddCloseFriendsList] = useState([]);

  const fetchPost = async () => {
    try {
      const wishlistsCollection = collection(db, 'followers');
      const q = query(wishlistsCollection, where('userid', '==', userId), where('closeFriend', '==', false));

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => {
        var data = doc.data()
        closeFriendsID.push(data.followerid);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    let userDataArray;

    fetchPost()
      .then((data) => {
        console.log(closeFriendsID);
        return getUsersData(closeFriendsID, db);
      })
      .then((data) => {
        userDataArray = data;
        if (userDataArray !== null) {
          console.log("User data for close friends:", userDataArray);
          setCloseFriendslist(userDataArray);
          // Do something with the user data
        } else {
          // Handle the case where data retrieval failed
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any other errors that might occur during data retrieval
      });

  }, []); // Include 'wishlist' in the dependency array

  // Function to handle checkbox changes
  const handleCheckboxChange = (friendId, isChecked) => {
    const friendIndex = AddCloseFriendsList.findIndex((friend) => friend.friendId === friendId);

    if (friendIndex !== -1) {
      // If the friend exists, update their isChecked value
      AddCloseFriendsList[friendIndex].isChecked = isChecked;
  
      // You can log the updated AddCloseFriendsList if needed
      console.log(AddCloseFriendsList);
    } else {
        AddCloseFriendsList.push({friendId,isChecked});
    }

    console.log(AddCloseFriendsList);
  };

  // Function to handle the update button click
  const handleUpdateButtonClick = () => {
    // Pass AddCloseFriendsList to the NavBar component
    console.log(AddCloseFriendsList);
  };

  return (
    <div className="app">
      <div className="container">
        {/* Pass handleUpdateButtonClick to the TopNavbarProfile component */}
        <TopNavbarProfile className="top-navbar-profile" AddCloseFriendsList={AddCloseFriendsList} />
        <div className='profile'>
          <div className='minHeight'>
            <h5 style={{"margin-left":"10px"}}>Add close friends</h5>
          <TheCard parentToChild={closeFriendslist} onCheckboxChange={handleCheckboxChange} />
          </div>
          <BottomNavbarWhite className="bottom-navbar-white" />
        </div>
      </div>
    </div>
  );
}

export default AddCloseFriends;
