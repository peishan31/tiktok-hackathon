import React, { useEffect, useState, useRef } from 'react';
import CloseFriendCard from '../pages/closeFriendsCard';
import './closeFriendsCard.css'


export default function TheCard({ parentToChild }) {

  const addCloseFriends = () => {
    
   };
  return (
    <div className="product-card-container">
    {parentToChild.map((friends, index) => (
      <CloseFriendCard key={index} friend={friends} />
    ))}
  </div>
  );
}