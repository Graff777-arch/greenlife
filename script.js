const CONTRACT_ADDRESS = "0x6867858Ff16FE8992F4C68018a4Ad0C1Be300dA1";
const ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_region", "type": "string" }
    ],
    "name": "donate",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

let provider;
let signer;
let contract;

async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }
  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  document.getElementById("status").innerText = "Wallet connected";
}

async function donate(event) {
  event.preventDefault();
  const region = document.getElementById("region").value;
  const amount = document.getElementById("amount").value;

  try {
    const tx = await contract.donate(region, {
      value: ethers.parseEther(amount)
    });
    document.getElementById("status").innerText = "Transaction sent! Waiting for confirmation...";
    await tx.wait();
    document.getElementById("status").innerText = "Thank you for your donation!";
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "Transaction failed.";
  }
}
