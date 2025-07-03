const contractAddress = "0x6867858Ff16FE8992F4C68018a4Ad0C1Be300dA1"; // твой контракт
const abi = [
  "function donate(string memory region) public payable",
  "function getTotalDonations() public view returns (uint256)"
];

let provider;
let signer;
let contract;

document.getElementById("connectButton").addEventListener("click", async () => {
  if (window.ethereum) {
    await ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
    document.getElementById("status").innerText = "✅ MetaMask подключен";
  } else {
    alert("Установите MetaMask!");
  }
});

document.getElementById("donateButton").addEventListener("click", async () => {
  if (!contract) {
    alert("Сначала подключите MetaMask");
    return;
  }

  try {
    const tx = await contract.donate("Tashkent", {
      value: ethers.utils.parseEther("0.01")
    });
    await tx.wait();
    document.getElementById("status").innerText = "🎉 Спасибо за пожертвование!";
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "❌ Ошибка: пожертвование не отправлено";
  }
});