import React from 'react';
import WalletButton from './components/WalletButton';

function App() {
  return (
    <div className="app">
      <h1>GreenLife 🌱</h1>
      <p>Подключи кошелёк и помоги озеленению Узбекистана!</p>
      <WalletButton />
    </div>
  );
}

export default App;