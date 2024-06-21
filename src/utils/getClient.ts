import { getHttpV4Endpoint } from "@orbs-network/ton-access";
import { TonClient4 } from "@ton/ton";

export async function getTonClient() {
    const endpoint = await getHttpV4Endpoint({ network: 'mainnet' });
    return new TonClient4({ endpoint });
}