import { Connection, VersionedTransaction } from "@solana/web3.js";
import { Blockhash } from '../dto/type';


// const RPC_WEBSOCKET_ENDPOINT = process.env.RPC_WEBSOCKET_ENDPOINT!;
// const RPC_ENDPOINT = process.env.RPC_ENDPOINT!;
export const RPC_ENDPOINT=""
export const RPC_WEBSOCKET_ENDPOINT=""

export const execute = async (transaction: VersionedTransaction, latestBlockhash: Blockhash, isBuy: boolean = true) => {
    if (!RPC_WEBSOCKET_ENDPOINT || !RPC_ENDPOINT) {
        console.log('Ensure RPC endpoints are in place - stopping bot')
        return;
    }
    const solanaConnection = new Connection(RPC_ENDPOINT, {
        wsEndpoint: RPC_WEBSOCKET_ENDPOINT,
    })

    console.log(1)
    const signature = await solanaConnection.sendRawTransaction(transaction.serialize(), { skipPreflight: true })
    console.log("execute ~ signature:", `https://solscan.io/tx/${signature}`)
    const confirmation = await solanaConnection.confirmTransaction(
        {
            signature,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            blockhash: latestBlockhash.blockhash,
        },
        "finalized"
    );
    console.log("🚀 ~ execute ~ confirmation:", confirmation)

    if (confirmation.value.err) {
        console.log("Confrimtaion error")
        return ""
    } else {
        if (isBuy)
            console.log(`Success in buy transaction: https://solscan.io/tx/${signature}`)
        else
            console.log(`Success in Sell transaction: https://solscan.io/tx/${signature}`)
    }
    return signature
}