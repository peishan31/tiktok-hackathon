import React from 'react';

function ProductCard({ product }) {
  const containerStyle = {
    marginLeft: '20px', // Adjust this value to shift the container to the right
    // You can also use other CSS properties like marginRight, padding, etc.
  };
  return (
    <><div className="product-card" style={containerStyle}>
      <div className="product-card-image">
        <img src={product.img} alt={product.pName} />
      </div>
      <div className="product-card-details">
        <h6>  {product.pName}</h6>
        <h6 className='price'>  {product.price}</h6>
        <h6 className='sellerName'>  {product.sellerName}</h6>
      </div>
    </div><br></br></>
  );
}

export default ProductCard;
