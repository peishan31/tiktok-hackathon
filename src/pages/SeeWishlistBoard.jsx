import VideoCard from '../components/VideoCard';
import BottomNavbar from '../components/BottomNavbar';
import TopNavBarForIndividualWishlist from '../components/TopNavBarForIndividualWishlist';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query, deleteDoc, where, doc, addDoc, setDoc, orderBy,limit, getDoc } from "firebase/firestore/lite";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './ProductList.css';
import BottomNavbarWhite from '../components/BottomNavbarWhite';
import ProductCard from './ProductCard';
import './seeWishlistBoard.css'
import { useParams } from 'react-router-dom';

function SeeWishlistBoard() {
  const { getWishlistName, getUserId } = useParams();
  const userId = getUserId; // Specify the user ID
  const wishlistName = getWishlistName;
  var likedProdId = [];
  const [products, setProducts] = useState([]);

  const getWishlist = async () => {
    const wishlistsCollection = collection(db, 'wishlists');
    const q = query(wishlistsCollection, where('userid', '==', userId), where('name', '==', wishlistName));
    try {
      const querySnapshot = await getDocs(q);
      for (const wishlistDoc of querySnapshot.docs) {
        // Reference to the "products" subcollection within each wishlist
        const productCollectionRef = collection(wishlistDoc.ref, 'products');
  
        // Get the product documents in the "products" subcollection
        const productQuerySnapshot = await getDocs(productCollectionRef);
  
        // Extract and store the document IDs in an array
        const productDocumentIds = productQuerySnapshot.docs.map((doc) => doc.id);
  
        // Now, you can use productDocumentIds for further processing or storage
        console.log('Product Document IDs for Wishlist:', productDocumentIds);
        likedProdId = productDocumentIds;
      }
    } catch (error) {
      console.error('Error retrieving wishlist data:', error);
    }
  };

  useEffect(() => {
    getWishlist()
      .then(() => {
        fetchProducts();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []); // Include 'wishlist' in the dependency array
  

    const fetchProducts = async () => {
      const productData = [];
      for (const docId of likedProdId) {
        const productRef = doc(db, 'products', docId);
        
        try {
          const productSnapshot = await getDoc(productRef);
          if (productSnapshot.exists()) {
            const product = productSnapshot.data();
            productData.push(product);
          } else {
            console.log(`Document with ID ${docId} does not exist.`);
          }
        } catch (error) {
          console.error(`Error fetching document with ID ${docId}:`, error);
        }
      }

      setProducts(productData);
    };


  return (
    <div className="app">
      <div className="container">
        <TopNavBarForIndividualWishlist className="top-navbar" />
        <div className="product-card-container">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <BottomNavbarWhite className="bottom-navbar-white" />
      
      </div>
    </div>
  );
}

export default SeeWishlistBoard;
