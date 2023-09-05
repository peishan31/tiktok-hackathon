import VideoCard from '../components/VideoCard';
import BottomNavbar from '../components/BottomNavbar';
import TopNavbar from '../components/TopNavBarForShop';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query, deleteDoc, where, doc, addDoc, setDoc, orderBy,limit } from "firebase/firestore/lite";
import imageSrc from '../images/yoyicProductPg.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './ProductList.css';
import Popup from './Popup';
import PopupMessage from './PopupMessage';

function Wishlist() {
  const userId = "1"; // Specify the user ID
  const [wishlistMessage, setWishlistMessage] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleAdd = (checkboxValues) => {
    var list = [];
    console.log("Checkbox values:", checkboxValues);
    checkboxValues.map((value) => {
      list.push(value.name);
    })
    setShowPopup(false);
    addToWishlist(list);
  };

  const getWishlist = async () => {
    const wishlistsCollection = collection(db, 'wishlists');
    const q = query(wishlistsCollection, where('userid', '==', userId));

    try {
      const querySnapshot = await getDocs(q);
      for (const wishlistDoc of querySnapshot.docs) {
        // Reference to the "products" subcollection within each wishlist
        const productCollectionRef = collection(wishlistDoc.ref, 'products');

        // Query the "products" subcollection to find the "Yoyic" product
        const productQuery = query(
          productCollectionRef,
          where('pName', '==', 'Yoyic')
        );
        const productQuerySnapshot = await getDocs(productQuery);
        if (productQuerySnapshot.size > 0) {
          setIsLiked(true);
        } 
      }
    } catch (error) {
      console.error('Error deleting Yoyic product from wishlists:', error);
    }
  }

  useEffect(() => {
    getWishlist()
      .then(() => {
        console.log(isLiked, "liked?");
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []); // Include 'wishlist' in the dependency array

  const deleteDocumentsWithFieldValue = async () => {
    const wishlistsCollection = collection(db, 'wishlists');
    const q = query(wishlistsCollection, where('userid', '==', userId));

    try {
      const querySnapshot = await getDocs(q);
      for (const wishlistDoc of querySnapshot.docs) {
        // Reference to the "products" subcollection within each wishlist
        const productCollectionRef = collection(wishlistDoc.ref, 'products');

        // Query the "products" subcollection to find the "Yoyic" product
        const productQuery = query(
          productCollectionRef,
          where('pName', '==', 'Yoyic')
        );
        const productQuerySnapshot = await getDocs(productQuery);

        // Loop through the matching product documents and delete them
        productQuerySnapshot.forEach(async (productDoc) => {
          await deleteDoc(productDoc.ref);
          console.log('Yoyic product deleted from a wishlist.');
          setIsLiked(false);
          setWishlistMessage('Deleted from wishlist');
        });
      }
    } catch (error) {
      console.error('Error deleting Yoyic product from wishlists:', error);
    }
  };

  const addToWishlist = async (checkBoxCategories) => {
    try {
      const wishlistCollectionRef = collection(db, 'wishlists');
  
      for (const cat of checkBoxCategories) {
        const q = query(wishlistCollectionRef, where('name', '==', cat));
  
        try {
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
            const wishlistDocRef = querySnapshot.docs[0].ref;
  
            // Get the current highest numeric ID in the subcollection
            const productCollectionRef = collection(wishlistDocRef, 'products');
            const highestIdSnapshot = await getDocs(
              query(productCollectionRef, orderBy('id', 'desc'), limit(1))
            );
  
            let newId = 1; // Default value for the first document
  
            if (!highestIdSnapshot.empty) {
              // Increment the ID if documents already exist
              const lastDocument = highestIdSnapshot.docs[0].data();
              // newId = lastDocument.id + 1;
              newId = 1;
            }
  
            const newProductData = {
              pName: 'Yoyic',
              // Add other fields as needed
            };
  
            // Add the document with the specified numeric ID
            const productDocRef = doc(productCollectionRef, newId.toString());
  
            await setDoc(productDocRef, newProductData);
  
            console.log('New product added to the subcollection with ID:', newId);
            setIsLiked(true);
            setWishlistMessage('Added to wishlist');
          } else {
            console.log('No document matching the condition found.');
          }
        } catch (error) {
          console.error('Error adding product to subcollection:', error);
        }
      }
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleLikeClick = () => {
    if (isLiked == true) {
      deleteDocumentsWithFieldValue();
    } else {
      handleShowPopup();
    }
  };
  
  return (
    <div className="app">
      <div className="container">
        <TopNavbar className="top-navbar" />
        <PopupMessage message={wishlistMessage} />
        <img className="image" src={imageSrc} alt="Your Image" />
        <FontAwesomeIcon icon={faHeart} className="iconOnImg" onClick={handleLikeClick} style={{ cursor: 'pointer', color: isLiked ? 'red' : 'gray' }} />
        {showPopup && (
          <Popup
            message="Add to Wishlist"
            onClose={() => setShowPopup(false)}
            onAdd={handleAdd}
          />
        )}
        <BottomNavbar className="bottom-navbar" />
      </div>
    </div>
  );
}

export default Wishlist;