import { Connection,Keypair,Transaction, VersionedTransaction, sendAndConfirmTransaction } from '@solana/web3.js'
import bs58 from 'bs58';
import { NATIVE_MINT } from '@solana/spl-token'
import axios from 'axios'
import { API_URLS } from '@raydium-io/raydium-sdk-v2'

//rpc url
const connection = new Connection(process.env.RPC_URL!)
//pvt key
const owner = Keypair.fromSecretKey(bs58.decode(process.env.PVT_KEY!))

//slippage 
const slippage = 10;

export async function swap (tokenAddres: string, amount: string){

    const { data } = await axios.get<{
        id: string
        success: boolean
        data: { default: { vh: number; h: number; m: number } }
      }>(`${API_URLS.BASE_HOST}${API_URLS.PRIORITY_FEE}`)
    
    const { data: swapResponse } = await axios.get<SwapCompute>(
        `${
          API_URLS.SWAP_HOST
        }/compute/swap-base-in?inputMint=${NATIVE_MINT}&outputMint=${tokenAddres}&amount=${amount}&slippageBps=${
          slippage * 100}&txVersion=V0`
      ) // Use the URL xxx/swap-base-in or xxx/swap-base-out to define the swap type. 
      

      const { data: swapTransactions } = await axios.post<{
        id: string
        version: string
        success: boolean
        data: { transaction: string }[]
      }>(`${API_URLS.SWAP_HOST}/transaction/swap-base-in`, {
        computeUnitPriceMicroLamports: String(data.data.default.h),
        swapResponse,
        txVersion : 'V0' ,
        wallet: owner.publicKey.toBase58(),
        wrapSol: true,
        unwrapSol: true, // true means output mint receive sol, false means output mint received wsol
      }) 

      console.log(swapTransactions); 
}

swap("TOKEN_ADDRESS","AMOUNT");
