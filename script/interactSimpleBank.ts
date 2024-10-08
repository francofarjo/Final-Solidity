import { ethers } from "ethers";
import { vars } from "hardhat/config";
import simpleBankABI from "../artifacts/contracts/SimpleBank.sol/SimpleBank.json";


const INFURA_API_KEY = vars.get("INFURA_API_KEY");
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");

// Connect to Ethereum provider
const provider = new ethers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${INFURA_API_KEY}`
);
// Load wallet from private key (ensure you have the private key in .env file)
const wallet = new ethers.Wallet(SEPOLIA_PRIVATE_KEY, provider);
// Replace with the deployed contract address
const simpleBankAddress = "0x583596F23be33BB69E46048c4E02B89DcE54DD7f";

// Create a contract instance
const simpleBankContract = new ethers.Contract(
  simpleBankAddress,
  simpleBankABI.abi,
  wallet
);

async function main() {
  try {
    
    console.log("Checking if user is registered...");
    const isRegistered = await simpleBankContract.isRegistered(wallet.address);

    if (!isRegistered) {
     
      console.log("User not registered. Registering user...");
      const registerTx = await simpleBankContract.register("Franco", "Farjo");
      await registerTx.wait(); 
      console.log("User registered successfully!");
    } else {
      console.log("User is already registered.");
    }

    // 2. Deposit ETH into the contract (only if the user is registered)
    console.log("Depositing ETH...");
    const depositAmount = ethers.parseEther("0.01"); // Deposit 0.01 ETH
    const depositTx = await simpleBankContract.deposit({
      value: depositAmount,
    });
    await depositTx.wait(); // Wait for the transaction to be mined
    console.log(
      `Deposited ${ethers.formatEther(depositAmount)} ETH successfully!`
    );

    // 3. Check user balance
    console.log("Fetching user balance...");
    const balance = await simpleBankContract.getBalance();
    console.log(`User balance: ${ethers.formatEther(balance)} ETH`);

    // 4. Withdraw ETH from the contract (only if the user is registered)
    console.log("Withdrawing ETH...");
    const withdrawAmount = ethers.parseEther("0.03"); // Withdraw 0.03 ETH
    const withdrawTx = await simpleBankContract.withdraw(withdrawAmount);
    await withdrawTx.wait(); // Wait for the transaction to be mined
    console.log(
      `Withdrawn ${ethers.formatEther(withdrawAmount)} ETH successfully!`
    );

    // 5. Query the contract owner
    console.log("Fetching contract owner...");
    const owner = await simpleBankContract.owner();
    console.log(`Contract Owner: ${owner}`);

    // 6. Query the contract treasury
    console.log("Fetching treasury address...");
    const treasury = await simpleBankContract.treasury();
    console.log(`Treasury Address: ${treasury}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the main function
main();
