import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './Popup.css';
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

const Popup = ({ message, onClose, onAdd }) => {
  const [wishlists, setWishlists] = useState([]);
  const userId = '1';

  async function getWishlist() {
    const wishlistCollection = collection(db, 'wishlists');
    const q = query(wishlistCollection, where('userid', '==', userId));

    try {
      const querySnapshot = await getDocs(q);
      const wishlistData = [];
      querySnapshot.forEach((doc) => {
        // Initialize the isChecked property to false
        const itemData = { ...doc.data(), isChecked: false };
        wishlistData.push(itemData);
      });
      setWishlists(wishlistData);
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }

  useEffect(() => {
    getWishlist()
      .then(() => {
        console.log(wishlists, 'wishlist');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []); // Include 'wishlist' in the dependency array

  const handleAddClick = () => {
    // Here, you can use the isChecked property to determine which checkboxes are checked
    const selectedCheckboxes = wishlists.filter((item) => item.isChecked);
    onAdd(selectedCheckboxes);
  };

  const handleCheckboxChange = (clickedItem) => {
    setWishlists((prevData) =>
      prevData.map((item) =>
        item.name === clickedItem.name
          ? { ...item, isChecked: !item.isChecked } // Toggle isChecked when the checkbox is clicked
          : item
      )
    );
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <div className="button-container">
          <p className="msg">{message}</p>
          <button className="iconPopup" onClick={handleAddClick}>
            Add
          </button>
          <button className="cancelBtn" onClick={onClose}>
            Cancel
          </button>
        </div>
        <br></br>
        {wishlists.map((item) => (
          <><label key={item.name}>
            <input
              type="checkbox"
              checked={item.isChecked}
              onChange={() => handleCheckboxChange(item)} />
            {item.name}
          </label><br></br></>
        ))}
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="iconPopupNext"
          onClick={handleAddClick}
        />
      </div>
    </div>
  );
};

export default Popup;
