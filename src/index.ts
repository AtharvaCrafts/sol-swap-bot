import { Connection, PublicKey } from '@solana/web3.js';

const walletAddress = 'BJdU2fqBSr7E2JozB6iAYpr87fjPperukideGvZsMp6A';
async function fetchBalance() {
    // Create a connection to the Solana devnet (or use mainnet, testnet)
    const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

    // Convert the wallet address to a PublicKey
    const publicKey = new PublicKey(walletAddress);

    // Fetch the balance
    const balance = await connection.getBalance(publicKey);

    // Convert the balance from lamports (smallest unit of Solana) to SOL
    const balanceInSol = balance / 1e9; // 1 SOL = 1 billion lamports

    console.log(`Balance of ${walletAddress}: ${balanceInSol} SOL`);
}

fetchBalance().catch((error) => {
    console.error('Error fetching balance:', error);
});
