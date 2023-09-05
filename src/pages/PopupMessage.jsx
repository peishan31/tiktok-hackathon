import React, { useState, useEffect } from 'react';
import './PopupMessage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function PopupMessage({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 2000); // Hide the popup after 2 seconds
    }
  }, [message]);

  return (
    <div className={`popupTimer ${visible ? 'show' : ''}`}>
      <FontAwesomeIcon icon={faCircleCheck} className="checkIcon" /><br></br>
      {message}
    </div>
  );
}

export default PopupMessage;
