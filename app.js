
async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      alert('Кошелек подключен!');
    } catch (error) {
      alert('Ошибка при подключении к MetaMask');
    }
  } else {
    alert('Установите MetaMask');
  }
}
