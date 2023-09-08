import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function CloseFriendCard({ friend }) {
  const linkStyle = {
    textDecoration: 'none', // Remove the underline
    color: 'blue', // You can also specify the link color
  };

  return (
    <Link to={`/profile/${friend.followerid}/${friend.username}`} style={linkStyle}>
    <div className="product-card">
      <div className="product-card-image">
        <img src={friend.profileImg} alt={friend.name} />
      </div>
      <div className="product-card-details">
        <h6>  {friend.name}</h6>
        <FontAwesomeIcon icon={faTrashCan} className="iconBin" />
        <h6 className='username'>  {friend.username}</h6>
        <h6 className='sellerName'></h6> 
      </div>
      <br></br>
    </div>
    </Link>
  );
}

export default CloseFriendCard;
