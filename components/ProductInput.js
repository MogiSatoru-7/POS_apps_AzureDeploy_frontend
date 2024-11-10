// components/ProductInput.js
import { useState } from 'react';

const ProductInput = ({ onProductData }) => {
  const [productCode, setProductCode] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージ用のステート


      // 商品情報を取得するAPIリクエストを送信する処理を実装
  const handleReadProduct = async () => {
    if (!productCode) {
      setErrorMessage("商品コードを入力してください");
      //alert("商品コードを入力してください");
      return;
    }
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/products/${productCode}`);
      if (!response.ok) {
        // throw new Error("商品が見つかりません");
        // エラーをスローせず、エラーメッセージを設定へ変更
        console.error(`HTTP error! status: ${response.status}`, response);
        //デプロイエラー対応で挿入（ブラウザコンソール）
        setErrorMessage("商品がマスタ未登録です");  
        return;      
      }
      const productData = await response.json();
      console.log('Fetched data:', productData); // データの確認
      onProductData(productData); // 親コンポーネントに取得した商品情報を渡す
      setErrorMessage(''); // 正常時にはエラーメッセージをクリア
    } catch (error) {
      console.error("Error fetching product data:", error);
      setErrorMessage("商品がマスタ未登録です"); // 商品が見つからない場合にメッセージを設定
    }
  };

  // エラーメッセージ表示に加え、addToPurchaseList関数の処理をpage.jsに移動しているため、不要な部分を削除しました。
  // const handleAddToPurchaseList = () => {
  //   if (!productCode) {
  //     alert("商品コードを入力してください");
  //     return;
  //   }
  //   // 商品情報を購入リストに追加
  //   addToPurchaseList(productData);
  //   setProductCode(''); // 入力フィールドをクリア
  // };

  return (
    <div>
      <input
        type="text"
        value={productCode}
        onChange={(e) => setProductCode(e.target.value)}
        placeholder="商品コードを入力"
      />
      <button onClick={handleReadProduct}>商品コード読み込み</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* エラーメッセージの表示 */}

    </div>
  );
};

export default ProductInput;




