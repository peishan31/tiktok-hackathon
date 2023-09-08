import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './Popup.css';
import {db} from '../config/firebase';
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
  const [wishlistNames, setWishlistNames] = useState([]);
  const [newWishlistName, setNewWishlistName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewWishlistName(''); // Clear the input field when closing the modal
  };

  const addWishlist = async () => {
    if (newWishlistName) {
      try {
        // Create a reference to the "wishlists" collection
        const wishlistCollectionRef = collection(db, 'wishlists');

        // Define the data for the new wishlist document
        const newWishlist = {
          name: newWishlistName, // Replace with the actual wishlist name
          userid: userId, // Replace with the actual user ID
          numOfProds: "0",
          visible: "Private"
        };

        // Use the addDoc function to add the document to the collection
        const docRef = await addDoc(wishlistCollectionRef, newWishlist);
        console.log('New wishlist document added with ID:', docRef.id);
        getWishlist().then(() => {
          console.log("checkbox updated");
        })
      } catch (error) {
        console.error('Error adding new wishlist document:', error);
      }
      setWishlistNames([...wishlistNames, newWishlistName]);
      closeModal(); // Close the modal after adding a wishlist
    }
  };

  return (
    <div className="popup popUpStyle">
      <div className="popup-content">
        <div className="button-container">
          <p className="msg">{message}</p>
          <button className="iconPopup" onClick={openModal}>
            New
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
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h4>New wishlist</h4>
              <input
                type="text"
                placeholder="Enter wishlist name"
                value={newWishlistName}
                onChange={(e) => setNewWishlistName(e.target.value)}
              />
              <button onClick={addWishlist}>Create</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
