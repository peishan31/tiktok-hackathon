import VideoCard from '../components/VideoCard';
import BottomNavbar from '../components/BottomNavbar';
import TopNavbar from '../components/TopNavBarForShop';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs,query,deleteDoc,where,doc,addDoc } from "firebase/firestore/lite";
import imageSrc from '../images/yoyicProductPg.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './ProductList.css';

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
const [isLiked, setIsLiked] = useState();

async function getWishlist() {
  const wishlistCollection = collection(db, "wishlist");
  const wishlistSnapshot = await getDocs(wishlistCollection);
  const getWishList = wishlistSnapshot.docs.map((doc) => doc.data());
  setWishlist(getWishList);
}

const checkIsLiked = () => {
  const isYoyicInWishlist = wishlist.some((item) => item.productName === 'yoyic');
  setIsLiked(isYoyicInWishlist);
  console.log(isYoyicInWishlist);
};

useEffect(() => {
  getWishlist()
    .then(() => {
      console.log(wishlist);
      checkIsLiked();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}, [wishlist]); // Include 'wishlist' in the dependency array

const deleteDocumentsWithFieldValue = async () => {
    // Create a query to find documents where 'productName' is 'yoyic'
    const q = query(collection(db, 'wishlist'), where('productName', '==', 'yoyic'));

    try {
      const querySnapshot = await getDocs(q);

      // Iterate over the query results and delete each document
      querySnapshot.forEach(async (docSnapshot) => {
        const docRef = doc(db, 'wishlist', docSnapshot.id);
        await deleteDoc(docRef);
        console.log(`Document with ID ${docSnapshot.id} deleted.`);
      });
    } catch (error) {
      console.error('Error deleting documents:', error);
    }
  };

  const addToWishlist = async () => {
    try {
      const wishlistCollectionRef = collection(db, 'wishlist');

      // Create a document with the desired fields
      const newWishlistItem = {
        productName: 'yoyic',
        // Add other fields as needed
      };

      // Add the document to the "wishlist" collection
      const docRef = await addDoc(wishlistCollectionRef, newWishlistItem);
      console.log('Document added with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

    const handleLikeClick = () => {
        if (isLiked == true) {
            deleteDocumentsWithFieldValue();
        } else {
            addToWishlist();
        }
        // Perform any other actions you want on the click event
    };
    return (
        <div className="app">
            <div className="container">
                <TopNavbar className="top-navbar" />
                <img class="image" src={imageSrc} alt="Your Image" />
                <FontAwesomeIcon icon={faHeart} className="iconOnImg" onClick={handleLikeClick} style={{ cursor: 'pointer', color: isLiked ? 'red' : 'gray' }} />
                <BottomNavbar className="bottom-navbar" />
            </div>
        </div>
    );
}

export default Wishlist;
