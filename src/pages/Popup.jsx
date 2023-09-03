import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './Popup.css'

const Popup = ({ message, onClose, onAdd }) => {
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);

    const handleAddClick = () => {
        // Call the callback function with the checkbox values
        onAdd(checkbox1, checkbox2);
    };
    return (
        <div className="popup">
            <div className="popup-content">
                <div className='button-container'>
                    <p className='msg'>{message}</p>
                    {/* <FontAwesomeIcon icon={faPlus} className="iconPopup"  onClick={handleAddClick} /> */}
                    <button className="iconPopup">Add</button>
                    <button className="cancelBtn" onClick={onClose}>Cancel</button>
                </div>
                <br></br>
                <label>
                    <input
                        type="checkbox"
                        checked={checkbox1}
                        onChange={() => setCheckbox1(!checkbox1)}
                        />
                    My Wishlist
                </label> <br></br>
                <label>
                    <input
                        type="checkbox"
                        checked={checkbox2}
                        onChange={() => setCheckbox2(!checkbox2)}
                    />
                    Outing Fits
                </label>
                <FontAwesomeIcon icon={faCheckCircle} className="iconPopupNext"  onClick={handleAddClick} />
            </div>
        </div>
    );
};

export default Popup;
