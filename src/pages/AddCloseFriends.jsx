import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan, faUserPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import BottomNavbarWhite from '../components/BottomNavbarWhite';
import TopNavbarProfile from '../components/TopNavBarAddCloseFriend';
import db from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { useEffect, useState, useRef } from 'react';
import getUsersData from "./getUsersData"; // Adjust the import path as needed
import TheCard from './AddCloseFriendsPage';

function AddCloseFriends() {
    const userId = "1";
      const [closeFriendslist, setCloseFriendslist] = useState([]);
    var closeFriendsID = [];
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

    return (
        <div className="app">
            <div className="container">
                <TopNavbarProfile className="top-navbar-profile" />
                <div className='profile'>
                <TheCard parentToChild={closeFriendslist} />
                    <BottomNavbarWhite className="bottom-navbar-white" />
                </div>
            </div>
        </div>
    );
};

export default AddCloseFriends;
