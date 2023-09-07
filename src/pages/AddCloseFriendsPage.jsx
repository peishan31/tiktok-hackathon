import React, { useState } from 'react';
import CloseFriendCard from '../pages/AddCloseFriendsCard';
import '../components/closeFriendsCard.css';

export default function TheCard({ parentToChild, onCheckboxChange}) {
  const [checkedBoxes, setCheckedBoxes] = useState({});

  const handleCheckboxChange = (friendId, isChecked) => {
    setCheckedBoxes((prevState) => ({
      ...prevState,
      [friendId]: isChecked,
    }));
    onCheckboxChange(friendId, isChecked);
  };


  return (
    <div className="product-card-container">
      {parentToChild.map((friend) => (
        <CloseFriendCard
          key={friend.followerid}
          friend={friend}
          isChecked={!!checkedBoxes[friend.followerid]}
          onCheckboxChange={handleCheckboxChange}
        />
      ))}
    </div>
  );
}
