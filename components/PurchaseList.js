// components/PurchaseList.js
import React, { useState } from 'react'; // useStateをインポート

const PurchaseList = ({ purchases, total, onPurchase }) => {

  //モーダルの状態管理
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 購入処理を実行する関数
  const handlePurchase = async () => {
    try {
      // 各商品をバックエンドに送信する
      for (const item of purchases) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}purchase`, {
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
          throw new Error("購入処理に失敗しました");
        }
      }

      // 購入が成功したら、onPurchaseコールバックを呼び出す
      // onPurchase();

      // モーダルを表示する
      setIsModalOpen(true);
      //alert("購入が完了しました！"); // 成功メッセージを表示

    } catch (error) {
      console.error("購入処理中にエラーが発生しました:", error);
      alert("購入処理中にエラーが発生しました。もう一度試してください。");
    }
  };

  // モーダルを閉じる関数
  const handleModalClose = () => {
    setIsModalOpen(false); // モーダルを閉じる
    onPurchase(); // 購入処理後のコールバックを実行
  };

  return (
    <div className="purchase-list-container">
      <h2>購入リスト</h2>
      <ul className="purchase-list">
        {purchases.map((item, index) => (
          <li key={index}>{`${item.NAME} x ${item.quantity} = ${item.PRICE * item.quantity} 円`}</li>
        ))}
      </ul>
      <p className="total">合計: {total} 円</p>
      <button onClick={handlePurchase}>購入を完了する</button>

      {isModalOpen && (
        <div className="modal open">
          <div className="modal-content">
            <p>購入が完了しました！</p>
            <p>合計金額（税込）: {total} 円</p>
            <button onClick={handleModalClose}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};


export default PurchaseList;


