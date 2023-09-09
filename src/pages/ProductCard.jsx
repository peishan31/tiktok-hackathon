import React from 'react';

function ProductCard({ product }) {
  const containerStyle = {
    marginLeft: '20px', // Adjust this value to shift the container to the right
    // You can also use other CSS properties like marginRight, padding, etc.
  };

  const imgStyle = {
    width: '100px',
    height: '100px'
  };

  return (
    <div className="product-card" style={containerStyle}>
      <div className="product-card-image">
        <img src={product.img} alt={product.pName} style={imgStyle}/>
      </div>
      <div className="product-card-details">
        <h6>  {product.pName}</h6>
        <h6 className='price'>  {product.price}</h6>
        <h6 className='sellerName'>  {product.sellerName}</h6>
      </div>
      <br></br>
    </div>
  );
}

export default ProductCard;
