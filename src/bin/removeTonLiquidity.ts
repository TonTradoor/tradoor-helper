import { getTonClient } from "../utils/getClient"
import { OrderBook } from '../contracts/OrderBookTon';
import { Address, toNano } from "@ton/core";
import { getSender } from "../utils/getSender";
import Decimal from 'decimal.js';

export async function removeTonLp(account: string, amount: string) {
    const client = await getTonClient()
    const sender = await getSender(account)
    if (!sender) return

    const orderbookContract = client.open(OrderBook.fromAddress(Address.parse(process.env.orderBook_TON)))

    const decimal = 9
    const executionFee = 0.1

    amount = new Decimal(amount).mul(10 ** decimal).toFixed()

    await orderbookContract.send(
        sender,
        {
            value: toNano(executionFee + 0.2),
        },
        {
            $$type: 'CreateDecreaseLPPositionOrder',
            executionFee: toNano(executionFee),
            liquidityDelta: BigInt(amount),
            trxId: 0n
        }
    )
    console.log('\x1b[32m%s', 'The request has been submitted. Please view it in the browser.');
}