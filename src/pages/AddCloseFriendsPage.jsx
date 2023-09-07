import React, { useEffect, useState, useRef } from 'react';
import CloseFriendCard from '../pages/AddCloseFriendsCard';
import '../components/closeFriendsCard.css'


export default function TheCard({ parentToChild }) {
  
  return (
    <div className="product-card-container">
    {parentToChild.map((friends, index) => (
      <CloseFriendCard key={index} friend={friends} />
    ))}
  </div>
  );
}