import React from 'react';

function CloseFriendCard({ friend, isChecked, onCheckboxChange }) {
  const handleCheckboxChange = (event) => {
    onCheckboxChange(friend.followerid, event.target.checked);
  };

  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={friend.profileImg} alt={friend.name} />
      </div>
      <div className="product-card-details">
        <h6>{friend.name}</h6>
        <label>
          <input
            type="checkbox"
            className='iconBin'
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          {/* Checkbox Label */}
        </label>
        <h6 className='username'>{friend.username}</h6>
        <h6 className='sellerName'></h6>
      </div>
      <br></br>
    </div>
  );
}

export default CloseFriendCard;
