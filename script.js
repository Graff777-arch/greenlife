
const connectButton = document.getElementById("connectButton");
const donateButton = document.getElementById("donateButton");
const status = document.getElementById("status");

const CONTRACT_ADDRESS = "0x6867858Ff16FE8992F4C68018a4Ad0C1Be300dA1";
const ABI = [
  "function donate(string memory _region) external payable"
];

let provider, signer, contract;

connectButton.onclick = async () => {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    status.innerText = "✅ MetaMask подключен";
  } else {
    status.innerText = "❌ Установите MetaMask!";
  }
};

donateButton.onclick = async () => {
  if (!contract) {
    status.innerText = "⚠️ Сначала подключите MetaMask";
    return;
  }
  try {
    const tx = await contract.donate("Tashkent", {
      value: ethers.utils.parseEther("0.01")
    });
    status.innerText = "⏳ Ожидание подтверждения...";
    await tx.wait();
    status.innerText = "🎉 Пожертвование отправлено!";
  } catch (err) {
    console.error(err);
    status.innerText = "❌ Ошибка при отправке";
  }
};
