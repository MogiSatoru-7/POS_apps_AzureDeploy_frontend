// src/app/page.js
"use client";  // Client Componentとして動作させる

import { useState, useEffect } from 'react'; // useEffectを追加
import ProductInput from '../../components/ProductInput';
import ProductDisplay from '../../components/ProductDisplay';
import PurchaseList from '../../components/PurchaseList';
import '../styles/main.css';


const Page = () => {
  // エラー確認用
  useEffect(() => {
    console.log('NEXT_PUBLIC_API:', process.env.NEXT_PUBLIC_API);
  }, []);

  const [productData, setProductData] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [total, setTotal] = useState(0); // 合計金額のステートを追加

  // 商品を購入リストに追加する関数
  const addToPurchaseList = () => {
    if (productData) {
      const newPurchase = { ...productData, quantity: 1 };
      setPurchases([...purchases, newPurchase]);
      // 合計金額を更新
      setTotal(total + productData.PRICE);
      // 商品データをクリアする
      setProductData(null);
    }
  };

  const handlePurchase = async () => {
    try {
      // 各商品をバックエンドに送信する
      for (const item of purchases) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/purchase`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_code: item.CODE,
            quantity: item.quantity,
          }),
        });
  
        if (!response.ok) {
          throw new Error('購入処理中にエラーが発生しました');
        }
      }
      // 成功した場合に購入リストをクリアし、合計金額をリセット
      setPurchases([]);
      setTotal(0);

      // 成功メッセージを表示
      alert('購入が完了しました！');
    } catch (error) {
      console.error('購入処理中にエラーが発生しました:', error);
      alert(error.message || '購入処理中にエラーが発生しました。もう一度試してください。');
    }
  };

  return (
    <div>
      <h1>POS Application</h1>
      <ProductInput onProductData={setProductData} />
      <ProductDisplay product={productData} />
      {/* 「追加」ボタンをProductDisplayの下に配置 */}
      <button onClick={addToPurchaseList}>追加</button>
      <PurchaseList purchases={purchases} total={total} onPurchase={handlePurchase} />
    </div>
  );
};

export default Page;

