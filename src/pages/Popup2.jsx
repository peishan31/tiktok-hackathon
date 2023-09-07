import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './Popup2.css';
import TextField from '@mui/material/TextField';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import db from "../config/firebase";
import { collection, getDocs, query, deleteDoc, where, doc, addDoc, setDoc } from "firebase/firestore/lite";

Modal.setAppElement('#root'); // Set the root element for accessibility

const Popup2 = ({ isOpen, onClose, itemDetails}) => {
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(()=>{
    //call your increment function here

      setSelectedOption(itemDetails[0].visible);

    console.log(itemDetails);
},[itemDetails])

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleCancel = () => {
    onClose(false);
  };

  const handleSave = () => {
    setDoc(doc(db, "wishlists", itemDetails[2]), {
      visible: selectedOption,
      name: document.getElementById("listName").value
    }, { merge: true });
    window.location.reload(false);
    onClose(true, selectedOption); // Pass the selected option to the parent component
  };

  const handleDel = () => {
    deleteDoc(doc(db, "wishlists", itemDetails[2]));
    window.location.reload(false);

  }
if(isOpen){


  return (
    <Modal className={"popup-modal"} overlayClassName={'popup-overlay'} isOpen={isOpen} onRequestClose={handleCancel} contentLabel="Popup">
      <div style={{position:'relative'}}>
      <h3 style={{marginTop: '0', textAlign:'center'}}>Edit Settings</h3>
      <button style={{right: '0', top:'-10px', position: 'absolute', border: 'none'}}
      onClick={handleDel}>
        <FontAwesomeIcon style={{fontSize: "18px"}} icon={faTrashCan} className='icon'/>
      </button>
      </div>

      <div style={{width: '100%', marginBottom: '10px'}}>
        <TextField style={{width: '100%'}} id="listName" label="Wishlist Title" variant="standard" defaultValue={itemDetails[0].name} />
      </div>
      <div>
        <h5 style={{margin: '0px 0px 10px 0px'}}>Privacy</h5>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="Private"
            checked={selectedOption === 'Private'}
            onChange={handleOptionChange}
          />
          Private
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="Close"
            checked={selectedOption === 'Close'}
            onChange={handleOptionChange}
          />
          Close Friends
        </label>
      </div>
      <div style={{marginBottom: '10px'}}>
        <label>
          <input
            type="radio"
            value="Public"
            checked={selectedOption === 'Public'}
            onChange={handleOptionChange}
          />
          Public
        </label>
      </div>
      <div>
        <button onClick={handleCancel}>Cancel</button>
        <button style={{float: 'right'}}onClick={handleSave}>Save</button>
      </div>
    </Modal>
  );
}
};

export default Popup2;