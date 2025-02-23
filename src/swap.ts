//This code is written by Atharva Kulkarni

import bs58 from "bs58";
import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { getSellTxWithJupiter } from "./Buy-Sell-Ex/sell";
import { swap } from "./Buy-Sell-Ex/buy"
import { execute } from "./Buy-Sell-Ex/executeTransaction";
const connection = new Connection("");

export const owner = Keypair.fromSecretKey(bs58.decode(""));

const loopVal = process.env.LOOPVAL!;
export async function swapFunc(tokenAddress: string, amount: number) {
    // if (!config.isActive || !loopVal) {
    //     console.log("❌ Bot stopped: Required config params missing.");
    //     return;
    // }

    const mint = new PublicKey(tokenAddress);

    const lamportsPerCoin = amount * 100000;
    for (let i = 0; i < 1; i++) {
        console.log(`🔄 Iteration ${i + 1} - Buying & Selling ${amount / LAMPORTS_PER_SOL} SOL worth of ${tokenAddress}`);

        try {
            // const balance = await connection.getBalance(owner.publicKey);
            // if (balance < LAMPORTS_PER_SOL * 0.005) {  
            //     console.log("❌ Low balance. Stopping bot.");
            //     return;
            // }
            await swap(tokenAddress, amount);

            await new Promise(resolve => setTimeout(resolve, 500));
            
            const latestBlockhashForSell = await connection.getLatestBlockhash()
            const sellTx = await getSellTxWithJupiter(owner, mint, 300000000);
            const sellSuccess = await execute(sellTx!, latestBlockhashForSell, false);
            if (!sellSuccess) continue;

        } catch (error) {
            console.error(`❌ Error in swap loop: ${error}`);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log("✅ Swap loop completed.");

}
swapFunc("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", 0.001);