// components/ProductDisplay.js
import { useState, useEffect } from 'react';

const ProductDisplay = ({ product }) => {
  if (!product) {
    return <div>商品が表示されません</div>;
  }

  return (
    <div>
      <p>{product.NAME}</p>
      <p>{product.PRICE} 円</p>
    </div>
  );
};

export default ProductDisplay;

// const ProductDisplay = ({ product }) => {

  
//   return (
//     <div>
//       <h3>{product ? product.name : '商品が表示されません'}</h3>
//       <p>{product ? `${product.price} 円` : ''}</p>
//     </div>
//   );
// };

// export default ProductDisplay;
