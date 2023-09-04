import BottomNavbarWhite from '../components/BottomNavbarWhite';
import TopNavBarSaved from '../components/TopNavBarSaved';
import db from "../config/firebase";
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from "firebase/firestore/lite";
import './profile.css';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SavedTabs from './SavedTabs';
import Wishlists from './Wishlists';

function SavedItems() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setLoading] = useState(true);


  async function getWishlist() {
    const wishlistCollection = collection(db, "wishlist");
    const wishlistSnapshot = await getDocs(wishlistCollection);
    const getWishList = await wishlistSnapshot.docs.map((doc) => doc.data());
    setWishlist(getWishList);
  }

  const fetchPost = async () => {
       
    // await getDocs(collection(db, "wishlists"))
    //     .then((querySnapshot)=>{               
    //         const newData = querySnapshot.docs
    //             .map((doc) => {
                  
    //               doc.data(); 
    //               doc.id;
                  
    //             });
    //         setWishlist(newData);                
    //         console.log(newData);
    //         setLoading(false);
    //     })

        let categories = [];
        await getDocs(collection(db, "wishlists"))
        .then((querySnapshot)=>{               
            const list = querySnapshot.docs
                .map((doc) => {
                  let prods = [];
                  getDocs(collection(db, "wishlists/" + doc.id + "/products"))
                    .then((q)=>{               
                        prods = q.docs
                        .map((d) => {
                          prods.push(d.data());                      
                        });
                      })
                  categories.push([doc.data(), prods]);                  
                  })
              });
              setWishlist(categories);                
              console.log(categories);
              setLoading(false);
        
   }

  useEffect(() => {
    fetchPost();
  }
  , []); // Include 'wishlist' in the dependency array
  if (isLoading) {
    <div className="app">
      <div className="container">
      <TopNavBarSaved className="top-navbar-profile" />
        <div className='profile'>
          <span>Loading...</span>
        </div>
        <BottomNavbarWhite className="bottom-navbar-white" />
      </div>
    </div>
  }
  else{
      return (
    <div className="app">
      <div className="container">
      <TopNavBarSaved className="top-navbar-profile" />
        <div className='profile'>
        <button className='editprofile'>Edit Profile</button>           
          <Wishlists parentToChild={wishlist} />
        </div>
        <BottomNavbarWhite className="bottom-navbar-white" />
      </div>
    </div>
  );
  }

}

export default SavedItems;
