import React, { useState } from 'react';

function WalletButton() {
  const [account, setAccount] = useState(null);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Ошибка при подключении:", error);
      }
    } else {
      alert("Установите MetaMask!");
    }
  }

  return (
    <div>
      {account ? (
        <p>✅ Подключено: {account}</p>
      ) : (
        <button onClick={connectWallet}>🔌 Подключить MetaMask</button>
      )}
    </div>
  );
}

export default WalletButton;