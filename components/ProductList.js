// components/PurchaseList.js
const PurchaseList = ({ purchases, total, onPurchase }) => {
    return (
      <div>
        <h2>購入リスト</h2>
        <ul>
          {purchases.map((item, index) => (
            <li key={index}>{`${item.NAME} x ${item.quantity} = ${item.PRICE * item.quantity} 円`}</li>
          ))}
        </ul>
        <p>合計: {total} 円</p>
        <button onClick={onPurchase}>購入</button>
      </div>
    );
  };
  
  export default PurchaseList;


//ディレクトリの指定で入ってこなかったため使用しない。念のためコードは残しておく。

// src/components/ProductList.js
// import { useEffect, useState } from 'react';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // FastAPIのエンドポイントから商品データを取得
//     fetch('http://127.0.0.1:8000/products')
//       .then(response => response.json())
//       .then(data => setProducts(data))
//       .catch(error => console.error("Error fetching products:", error));
//   }, []);

//   return (
//     <div>
//       <h1>Product List</h1>
//       <ul>
//         {products.map(product => (
//           <li key={product.PRD_ID}>
//             {product.NAME}: {product.PRICE} 円
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;
