import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const BASIS_POINTS_FEE = 100; // Default 1% fee (100 basis points)
const TREASURY_ADDRESS = "0xFa7ca8E81CAa02b2c6f9c8Aa763Ba5dC92245711"; // Replace with actual treasury address

const SimpleBankModule = buildModule("SimpleBankModule", (m) => {
  const fee = m.getParameter("fee", BASIS_POINTS_FEE);
  const treasury = m.getParameter("treasury", TREASURY_ADDRESS);

  const simpleBank = m.contract("SimpleBank", [fee, treasury]);

  return { simpleBank };
});

export default SimpleBankModule;