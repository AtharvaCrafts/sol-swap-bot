import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

async function getPhantomWalletBalance(walletAddress: string) {
  try {
    const connection = new Connection(clusterApiUrl("devnet"));

    const publicKey = new PublicKey(walletAddress);

    const balance = await connection.getBalance(publicKey);

    const solBalance = balance / 1_000_000_000;

    console.log(`Wallet Balance: ${solBalance} SOL`);
    return solBalance;
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
}
