import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={product.img} alt={product.pName} />
      </div>
      <div className="product-card-details">
        <h6>  {product.pName}</h6>
        <h6 className='price'>  {product.price}</h6>
        <h6 className='sellerName'>  {product.sellerName}</h6> 
      </div>
    </div>
  );
}

export default ProductCard;
