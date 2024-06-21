import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4 } from "@ton/ton";
import { getTonClient } from "./getClient";

export async function getSender(mnemonicStr: string) {
    if (mnemonicStr === '') {
        console.error('\x1b[31m%s\x1b[0m', `Mnemonic conn't null`)
        return
    }
    const client = await getTonClient()
    const { publicKey, secretKey } = await mnemonicToWalletKey(mnemonicStr.split(' ')); // extract private and public keys from mnemonic
    const wallet = WalletContractV4.create({ publicKey: publicKey, workchain: 0 })
    const walletContract = client.open(wallet)
    return walletContract.sender(secretKey)
}