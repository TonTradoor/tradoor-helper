import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    ComputeError,
    TupleItem,
    TupleReader,
    Dictionary,
    contractAddress,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    queryId: bigint;
    amount: bigint;
    receiver: Address;
    responseDestination: Address | null;
    customPayload: Cell | null;
    forwardTonAmount: bigint;
    forwardPayload: Cell;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.receiver);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _receiver = sc_0.loadAddress();
    let _responseDestination = sc_0.loadMaybeAddress();
    let _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forwardTonAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0.asCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, receiver: _receiver, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    let _responseDestination = source.readAddressOpt();
    let _customPayload = source.readCellOpt();
    let _forwardTonAmount = source.readBigNumber();
    let _forwardPayload = source.readCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, receiver: _receiver, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.receiver);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload);
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    queryId: bigint;
    amount: bigint;
    from: Address;
    forwardPayload: Cell;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forwardPayload = sc_0.asCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forwardPayload: _forwardPayload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forwardPayload = source.readCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forwardPayload: _forwardPayload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forwardPayload);
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    queryId: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type UpdateConfig = {
    $$type: 'UpdateConfig';
    executorLength: bigint;
    executors: Dictionary<bigint, ExecutorParam>;
    compensator: Address;
    minTimeDelayTrader: bigint;
    lpMinExecutionFee: bigint;
    perpMinExecutionFee: bigint;
    lpGasConsumption: bigint;
    perpGasConsumption: bigint;
    poolLpGasConsumption: bigint;
    poolPerpGasConsumption: bigint;
    minTonsForStorage: bigint;
    gasTransferJetton: bigint;
    usdtWallet: Address;
    pool: Address;
}

export function storeUpdateConfig(src: UpdateConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2463053158, 32);
        b_0.storeInt(src.executorLength, 257);
        b_0.storeDict(src.executors, Dictionary.Keys.BigInt(257), dictValueParserExecutorParam());
        b_0.storeAddress(src.compensator);
        b_0.storeInt(src.minTimeDelayTrader, 257);
        b_0.storeCoins(src.lpMinExecutionFee);
        let b_1 = new Builder();
        b_1.storeCoins(src.perpMinExecutionFee);
        b_1.storeCoins(src.lpGasConsumption);
        b_1.storeCoins(src.perpGasConsumption);
        b_1.storeCoins(src.poolLpGasConsumption);
        b_1.storeCoins(src.poolPerpGasConsumption);
        b_1.storeCoins(src.minTonsForStorage);
        b_1.storeCoins(src.gasTransferJetton);
        let b_2 = new Builder();
        b_2.storeAddress(src.usdtWallet);
        b_2.storeAddress(src.pool);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2463053158) { throw Error('Invalid prefix'); }
    let _executorLength = sc_0.loadIntBig(257);
    let _executors = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserExecutorParam(), sc_0);
    let _compensator = sc_0.loadAddress();
    let _minTimeDelayTrader = sc_0.loadIntBig(257);
    let _lpMinExecutionFee = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _perpMinExecutionFee = sc_1.loadCoins();
    let _lpGasConsumption = sc_1.loadCoins();
    let _perpGasConsumption = sc_1.loadCoins();
    let _poolLpGasConsumption = sc_1.loadCoins();
    let _poolPerpGasConsumption = sc_1.loadCoins();
    let _minTonsForStorage = sc_1.loadCoins();
    let _gasTransferJetton = sc_1.loadCoins();
    let sc_2 = sc_1.loadRef().beginParse();
    let _usdtWallet = sc_2.loadAddress();
    let _pool = sc_2.loadAddress();
    return { $$type: 'UpdateConfig' as const, executorLength: _executorLength, executors: _executors, compensator: _compensator, minTimeDelayTrader: _minTimeDelayTrader, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, poolLpGasConsumption: _poolLpGasConsumption, poolPerpGasConsumption: _poolPerpGasConsumption, minTonsForStorage: _minTonsForStorage, gasTransferJetton: _gasTransferJetton, usdtWallet: _usdtWallet, pool: _pool };
}

function loadTupleUpdateConfig(source: TupleReader) {
    let _executorLength = source.readBigNumber();
    let _executors = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserExecutorParam(), source.readCellOpt());
    let _compensator = source.readAddress();
    let _minTimeDelayTrader = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _lpGasConsumption = source.readBigNumber();
    let _perpGasConsumption = source.readBigNumber();
    let _poolLpGasConsumption = source.readBigNumber();
    let _poolPerpGasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _gasTransferJetton = source.readBigNumber();
    let _usdtWallet = source.readAddress();
    let _pool = source.readAddress();
    return { $$type: 'UpdateConfig' as const, executorLength: _executorLength, executors: _executors, compensator: _compensator, minTimeDelayTrader: _minTimeDelayTrader, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, poolLpGasConsumption: _poolLpGasConsumption, poolPerpGasConsumption: _poolPerpGasConsumption, minTonsForStorage: _minTonsForStorage, gasTransferJetton: _gasTransferJetton, usdtWallet: _usdtWallet, pool: _pool };
}

function storeTupleUpdateConfig(source: UpdateConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executorLength);
    builder.writeCell(source.executors.size > 0 ? beginCell().storeDictDirect(source.executors, Dictionary.Keys.BigInt(257), dictValueParserExecutorParam()).endCell() : null);
    builder.writeAddress(source.compensator);
    builder.writeNumber(source.minTimeDelayTrader);
    builder.writeNumber(source.lpMinExecutionFee);
    builder.writeNumber(source.perpMinExecutionFee);
    builder.writeNumber(source.lpGasConsumption);
    builder.writeNumber(source.perpGasConsumption);
    builder.writeNumber(source.poolLpGasConsumption);
    builder.writeNumber(source.poolPerpGasConsumption);
    builder.writeNumber(source.minTonsForStorage);
    builder.writeNumber(source.gasTransferJetton);
    builder.writeAddress(source.usdtWallet);
    builder.writeAddress(source.pool);
    return builder.build();
}

function dictValueParserUpdateConfig(): DictionaryValue<UpdateConfig> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateConfig(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateConfig(src.loadRef().beginParse());
        }
    }
}

export type SendProtocolFee = {
    $$type: 'SendProtocolFee';
    trxId: bigint;
    feeReceiver: Address;
    amount: bigint;
}

export function storeSendProtocolFee(src: SendProtocolFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1574274145, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.feeReceiver);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadSendProtocolFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1574274145) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _feeReceiver = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'SendProtocolFee' as const, trxId: _trxId, feeReceiver: _feeReceiver, amount: _amount };
}

function loadTupleSendProtocolFee(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _feeReceiver = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'SendProtocolFee' as const, trxId: _trxId, feeReceiver: _feeReceiver, amount: _amount };
}

function storeTupleSendProtocolFee(source: SendProtocolFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.feeReceiver);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserSendProtocolFee(): DictionaryValue<SendProtocolFee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendProtocolFee(src)).endCell());
        },
        parse: (src) => {
            return loadSendProtocolFee(src.loadRef().beginParse());
        }
    }
}

export type CreateDecreaseLPPositionOrder = {
    $$type: 'CreateDecreaseLPPositionOrder';
    executionFee: bigint;
    liquidityDelta: bigint;
    trxId: bigint;
}

export function storeCreateDecreaseLPPositionOrder(src: CreateDecreaseLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(632428324, 32);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.liquidityDelta, 128);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCreateDecreaseLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 632428324) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadCoins();
    let _liquidityDelta = sc_0.loadUintBig(128);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CreateDecreaseLPPositionOrder' as const, executionFee: _executionFee, liquidityDelta: _liquidityDelta, trxId: _trxId };
}

function loadTupleCreateDecreaseLPPositionOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CreateDecreaseLPPositionOrder' as const, executionFee: _executionFee, liquidityDelta: _liquidityDelta, trxId: _trxId };
}

function storeTupleCreateDecreaseLPPositionOrder(source: CreateDecreaseLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCreateDecreaseLPPositionOrder(): DictionaryValue<CreateDecreaseLPPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateDecreaseLPPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateDecreaseLPPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type CancelLPPositionOrder = {
    $$type: 'CancelLPPositionOrder';
    orderId: bigint;
    trxId: bigint;
    executionFeeReceiver: Address | null;
}

export function storeCancelLPPositionOrder(src: CancelLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2106714934, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.executionFeeReceiver);
    };
}

export function loadCancelLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2106714934) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    return { $$type: 'CancelLPPositionOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver };
}

function loadTupleCancelLPPositionOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    return { $$type: 'CancelLPPositionOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver };
}

function storeTupleCancelLPPositionOrder(source: CancelLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.executionFeeReceiver);
    return builder.build();
}

function dictValueParserCancelLPPositionOrder(): DictionaryValue<CancelLPPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCancelLPPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelLPPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type ExecuteLPPositionOrder = {
    $$type: 'ExecuteLPPositionOrder';
    orderId: bigint;
    trxId: bigint;
    executionFeeReceiver: Address | null;
}

export function storeExecuteLPPositionOrder(src: ExecuteLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(310819211, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.executionFeeReceiver);
    };
}

export function loadExecuteLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 310819211) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    return { $$type: 'ExecuteLPPositionOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver };
}

function loadTupleExecuteLPPositionOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    return { $$type: 'ExecuteLPPositionOrder' as const, orderId: _orderId, trxId: _trxId, executionFeeReceiver: _executionFeeReceiver };
}

function storeTupleExecuteLPPositionOrder(source: ExecuteLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.executionFeeReceiver);
    return builder.build();
}

function dictValueParserExecuteLPPositionOrder(): DictionaryValue<ExecuteLPPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecuteLPPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteLPPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type UpdateLPPosition = {
    $$type: 'UpdateLPPosition';
    isIncrease: boolean;
    orderId: bigint;
    account: Address;
    liquidityDelta: bigint;
    trxId: bigint;
}

export function storeUpdateLPPosition(src: UpdateLPPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3902592095, 32);
        b_0.storeBit(src.isIncrease);
        b_0.storeUint(src.orderId, 64);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadUpdateLPPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3902592095) { throw Error('Invalid prefix'); }
    let _isIncrease = sc_0.loadBit();
    let _orderId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'UpdateLPPosition' as const, isIncrease: _isIncrease, orderId: _orderId, account: _account, liquidityDelta: _liquidityDelta, trxId: _trxId };
}

function loadTupleUpdateLPPosition(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _orderId = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'UpdateLPPosition' as const, isIncrease: _isIncrease, orderId: _orderId, account: _account, liquidityDelta: _liquidityDelta, trxId: _trxId };
}

function storeTupleUpdateLPPosition(source: UpdateLPPosition) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isIncrease);
    builder.writeNumber(source.orderId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserUpdateLPPosition(): DictionaryValue<UpdateLPPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateLPPosition(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateLPPosition(src.loadRef().beginParse());
        }
    }
}

export type UpdateLPPositionSuccess = {
    $$type: 'UpdateLPPositionSuccess';
    orderId: bigint;
    receive: bigint;
    trxId: bigint;
}

export function storeUpdateLPPositionSuccess(src: UpdateLPPositionSuccess) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(485543809, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeInt(src.receive, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadUpdateLPPositionSuccess(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 485543809) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _receive = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'UpdateLPPositionSuccess' as const, orderId: _orderId, receive: _receive, trxId: _trxId };
}

function loadTupleUpdateLPPositionSuccess(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _receive = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'UpdateLPPositionSuccess' as const, orderId: _orderId, receive: _receive, trxId: _trxId };
}

function storeTupleUpdateLPPositionSuccess(source: UpdateLPPositionSuccess) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.receive);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserUpdateLPPositionSuccess(): DictionaryValue<UpdateLPPositionSuccess> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateLPPositionSuccess(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateLPPositionSuccess(src.loadRef().beginParse());
        }
    }
}

export type CreateCompensate = {
    $$type: 'CreateCompensate';
    orderType: bigint | null;
    orderId: bigint;
    trxId: bigint;
    refundReceiver: Address | null;
    refundAmount: bigint;
    executionFeeReceiver: Address | null;
    executionFee: bigint;
}

export function storeCreateCompensate(src: CreateCompensate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2945693128, 32);
        if (src.orderType !== null && src.orderType !== undefined) { b_0.storeBit(true).storeUint(src.orderType, 8); } else { b_0.storeBit(false); }
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.refundReceiver);
        b_0.storeUint(src.refundAmount, 128);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeCoins(src.executionFee);
    };
}

export function loadCreateCompensate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2945693128) { throw Error('Invalid prefix'); }
    let _orderType = sc_0.loadBit() ? sc_0.loadUintBig(8) : null;
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _refundReceiver = sc_0.loadMaybeAddress();
    let _refundAmount = sc_0.loadUintBig(128);
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _executionFee = sc_0.loadCoins();
    return { $$type: 'CreateCompensate' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee };
}

function loadTupleCreateCompensate(source: TupleReader) {
    let _orderType = source.readBigNumberOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _refundReceiver = source.readAddressOpt();
    let _refundAmount = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _executionFee = source.readBigNumber();
    return { $$type: 'CreateCompensate' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee };
}

function storeTupleCreateCompensate(source: CreateCompensate) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.refundReceiver);
    builder.writeNumber(source.refundAmount);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.executionFee);
    return builder.build();
}

function dictValueParserCreateCompensate(): DictionaryValue<CreateCompensate> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateCompensate(src)).endCell());
        },
        parse: (src) => {
            return loadCreateCompensate(src.loadRef().beginParse());
        }
    }
}

export type ExecuteOrCancelCompensate = {
    $$type: 'ExecuteOrCancelCompensate';
    isCancel: boolean;
    compensateId: bigint;
    trxId: bigint;
}

export function storeExecuteOrCancelCompensate(src: ExecuteOrCancelCompensate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2296903975, 32);
        b_0.storeBit(src.isCancel);
        b_0.storeUint(src.compensateId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadExecuteOrCancelCompensate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2296903975) { throw Error('Invalid prefix'); }
    let _isCancel = sc_0.loadBit();
    let _compensateId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'ExecuteOrCancelCompensate' as const, isCancel: _isCancel, compensateId: _compensateId, trxId: _trxId };
}

function loadTupleExecuteOrCancelCompensate(source: TupleReader) {
    let _isCancel = source.readBoolean();
    let _compensateId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteOrCancelCompensate' as const, isCancel: _isCancel, compensateId: _compensateId, trxId: _trxId };
}

function storeTupleExecuteOrCancelCompensate(source: ExecuteOrCancelCompensate) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isCancel);
    builder.writeNumber(source.compensateId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserExecuteOrCancelCompensate(): DictionaryValue<ExecuteOrCancelCompensate> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecuteOrCancelCompensate(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteOrCancelCompensate(src.loadRef().beginParse());
        }
    }
}

export type CreateDecreasePerpPositionOrder = {
    $$type: 'CreateDecreasePerpPositionOrder';
    executionFee: bigint;
    tokenId: bigint;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    trxId: bigint;
}

export function storeCreateDecreasePerpPositionOrder(src: CreateDecreasePerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1787968987, 32);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeBit(src.isLong);
        b_0.storeUint(src.marginDelta, 128);
        b_0.storeUint(src.sizeDelta, 128);
        b_0.storeUint(src.triggerPrice, 128);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCreateDecreasePerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1787968987) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadCoins();
    let _tokenId = sc_0.loadUintBig(64);
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadUintBig(128);
    let _sizeDelta = sc_0.loadUintBig(128);
    let _triggerPrice = sc_0.loadUintBig(128);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CreateDecreasePerpPositionOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, trxId: _trxId };
}

function loadTupleCreateDecreasePerpPositionOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CreateDecreasePerpPositionOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, trxId: _trxId };
}

function storeTupleCreateDecreasePerpPositionOrder(source: CreateDecreasePerpPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.tokenId);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCreateDecreasePerpPositionOrder(): DictionaryValue<CreateDecreasePerpPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateDecreasePerpPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateDecreasePerpPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type CreateTpSlPerpPositionOrder = {
    $$type: 'CreateTpSlPerpPositionOrder';
    executionFee: bigint;
    tokenId: bigint;
    isLong: boolean;
    tpSize: bigint;
    tpPrice: bigint;
    slSize: bigint;
    slPrice: bigint;
    trxId: bigint;
}

export function storeCreateTpSlPerpPositionOrder(src: CreateTpSlPerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(600256344, 32);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeBit(src.isLong);
        b_0.storeUint(src.tpSize, 128);
        b_0.storeUint(src.tpPrice, 128);
        b_0.storeUint(src.slSize, 128);
        b_0.storeUint(src.slPrice, 128);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCreateTpSlPerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 600256344) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadCoins();
    let _tokenId = sc_0.loadUintBig(64);
    let _isLong = sc_0.loadBit();
    let _tpSize = sc_0.loadUintBig(128);
    let _tpPrice = sc_0.loadUintBig(128);
    let _slSize = sc_0.loadUintBig(128);
    let _slPrice = sc_0.loadUintBig(128);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CreateTpSlPerpPositionOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isLong: _isLong, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, trxId: _trxId };
}

function loadTupleCreateTpSlPerpPositionOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CreateTpSlPerpPositionOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isLong: _isLong, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, trxId: _trxId };
}

function storeTupleCreateTpSlPerpPositionOrder(source: CreateTpSlPerpPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.tokenId);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.tpSize);
    builder.writeNumber(source.tpPrice);
    builder.writeNumber(source.slSize);
    builder.writeNumber(source.slPrice);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCreateTpSlPerpPositionOrder(): DictionaryValue<CreateTpSlPerpPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateTpSlPerpPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateTpSlPerpPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type CancelPerpPositionOrder = {
    $$type: 'CancelPerpPositionOrder';
    executionFeeReceiver: Address | null;
    orderId: bigint;
    trxId: bigint;
}

export function storeCancelPerpPositionOrder(src: CancelPerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3254342642, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCancelPerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3254342642) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CancelPerpPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function loadTupleCancelPerpPositionOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelPerpPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId };
}

function storeTupleCancelPerpPositionOrder(source: CancelPerpPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCancelPerpPositionOrder(): DictionaryValue<CancelPerpPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCancelPerpPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelPerpPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type ExecutePerpPositionOrder = {
    $$type: 'ExecutePerpPositionOrder';
    executionFeeReceiver: Address | null;
    orderId: bigint;
    trxId: bigint;
    tokenId: bigint;
    price: bigint;
    premiumRate: bigint;
}

export function storeExecutePerpPositionOrder(src: ExecutePerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2650410712, 32);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeInt(src.price, 257);
        b_0.storeInt(src.premiumRate, 257);
    };
}

export function loadExecutePerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2650410712) { throw Error('Invalid prefix'); }
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _tokenId = sc_0.loadUintBig(64);
    let _price = sc_0.loadIntBig(257);
    let _premiumRate = sc_0.loadIntBig(257);
    return { $$type: 'ExecutePerpPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId, tokenId: _tokenId, price: _price, premiumRate: _premiumRate };
}

function loadTupleExecutePerpPositionOrder(source: TupleReader) {
    let _executionFeeReceiver = source.readAddressOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    return { $$type: 'ExecutePerpPositionOrder' as const, executionFeeReceiver: _executionFeeReceiver, orderId: _orderId, trxId: _trxId, tokenId: _tokenId, price: _price, premiumRate: _premiumRate };
}

function storeTupleExecutePerpPositionOrder(source: ExecutePerpPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.premiumRate);
    return builder.build();
}

function dictValueParserExecutePerpPositionOrder(): DictionaryValue<ExecutePerpPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecutePerpPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadExecutePerpPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type LiquidatePerpPosition = {
    $$type: 'LiquidatePerpPosition';
    liquidationFeeReceiver: Address | null;
    tokenId: bigint;
    account: Address;
    isLong: boolean;
    trxId: bigint;
    price: bigint;
    premiumRate: bigint;
}

export function storeLiquidatePerpPosition(src: LiquidatePerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(590625716, 32);
        b_0.storeAddress(src.liquidationFeeReceiver);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeUint(src.trxId, 64);
        b_0.storeInt(src.price, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.premiumRate, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLiquidatePerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 590625716) { throw Error('Invalid prefix'); }
    let _liquidationFeeReceiver = sc_0.loadMaybeAddress();
    let _tokenId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _trxId = sc_0.loadUintBig(64);
    let _price = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _premiumRate = sc_1.loadIntBig(257);
    return { $$type: 'LiquidatePerpPosition' as const, liquidationFeeReceiver: _liquidationFeeReceiver, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, price: _price, premiumRate: _premiumRate };
}

function loadTupleLiquidatePerpPosition(source: TupleReader) {
    let _liquidationFeeReceiver = source.readAddressOpt();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _trxId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    return { $$type: 'LiquidatePerpPosition' as const, liquidationFeeReceiver: _liquidationFeeReceiver, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, price: _price, premiumRate: _premiumRate };
}

function storeTupleLiquidatePerpPosition(source: LiquidatePerpPosition) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.liquidationFeeReceiver);
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.premiumRate);
    return builder.build();
}

function dictValueParserLiquidatePerpPosition(): DictionaryValue<LiquidatePerpPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLiquidatePerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidatePerpPosition(src.loadRef().beginParse());
        }
    }
}

export type ADLPerpPosition = {
    $$type: 'ADLPerpPosition';
    tokenId: bigint;
    account: Address;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    trxId: bigint;
    price: bigint;
    premiumRate: bigint;
}

export function storeADLPerpPosition(src: ADLPerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3962817618, 32);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeUint(src.marginDelta, 128);
        b_0.storeUint(src.sizeDelta, 128);
        b_0.storeUint(src.trxId, 64);
        b_0.storeInt(src.price, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.premiumRate, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadADLPerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3962817618) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadUintBig(128);
    let _sizeDelta = sc_0.loadUintBig(128);
    let _trxId = sc_0.loadUintBig(64);
    let _price = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _premiumRate = sc_1.loadIntBig(257);
    return { $$type: 'ADLPerpPosition' as const, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, trxId: _trxId, price: _price, premiumRate: _premiumRate };
}

function loadTupleADLPerpPosition(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    return { $$type: 'ADLPerpPosition' as const, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, trxId: _trxId, price: _price, premiumRate: _premiumRate };
}

function storeTupleADLPerpPosition(source: ADLPerpPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.premiumRate);
    return builder.build();
}

function dictValueParserADLPerpPosition(): DictionaryValue<ADLPerpPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeADLPerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadADLPerpPosition(src.loadRef().beginParse());
        }
    }
}

export type UpdatePerpPosition = {
    $$type: 'UpdatePerpPosition';
    orderId: bigint;
    opType: bigint;
    tokenId: bigint;
    account: Address;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    triggerAbove: boolean;
    trxId: bigint;
    price: bigint;
    premiumRate: bigint;
}

export function storeUpdatePerpPosition(src: UpdatePerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4283950423, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.triggerPrice, 257);
        b_1.storeBit(src.triggerAbove);
        b_1.storeUint(src.trxId, 64);
        b_1.storeInt(src.price, 257);
        b_1.storeInt(src.premiumRate, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdatePerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4283950423) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _opType = sc_0.loadUintBig(8);
    let _tokenId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _triggerPrice = sc_1.loadIntBig(257);
    let _triggerAbove = sc_1.loadBit();
    let _trxId = sc_1.loadUintBig(64);
    let _price = sc_1.loadIntBig(257);
    let _premiumRate = sc_1.loadIntBig(257);
    return { $$type: 'UpdatePerpPosition' as const, orderId: _orderId, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, trxId: _trxId, price: _price, premiumRate: _premiumRate };
}

function loadTupleUpdatePerpPosition(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _trxId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    return { $$type: 'UpdatePerpPosition' as const, orderId: _orderId, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, trxId: _trxId, price: _price, premiumRate: _premiumRate };
}

function storeTupleUpdatePerpPosition(source: UpdatePerpPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.opType);
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeBoolean(source.triggerAbove);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.premiumRate);
    return builder.build();
}

function dictValueParserUpdatePerpPosition(): DictionaryValue<UpdatePerpPosition> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdatePerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadUpdatePerpPosition(src.loadRef().beginParse());
        }
    }
}

export type UpdatePerpPositionSuccess = {
    $$type: 'UpdatePerpPositionSuccess';
    orderId: bigint;
    receive: bigint;
    trxId: bigint;
}

export function storeUpdatePerpPositionSuccess(src: UpdatePerpPositionSuccess) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4009870004, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeInt(src.receive, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadUpdatePerpPositionSuccess(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4009870004) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _receive = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'UpdatePerpPositionSuccess' as const, orderId: _orderId, receive: _receive, trxId: _trxId };
}

function loadTupleUpdatePerpPositionSuccess(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _receive = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'UpdatePerpPositionSuccess' as const, orderId: _orderId, receive: _receive, trxId: _trxId };
}

function storeTupleUpdatePerpPositionSuccess(source: UpdatePerpPositionSuccess) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.receive);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserUpdatePerpPositionSuccess(): DictionaryValue<UpdatePerpPositionSuccess> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdatePerpPositionSuccess(src)).endCell());
        },
        parse: (src) => {
            return loadUpdatePerpPositionSuccess(src.loadRef().beginParse());
        }
    }
}

export type LPPositionOrderCreatedEvent = {
    $$type: 'LPPositionOrderCreatedEvent';
    opType: bigint;
    account: Address;
    liquidityDelta: bigint;
    executionFee: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storeLPPositionOrderCreatedEvent(src: LPPositionOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3021458540, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeCoins(src.executionFee);
        b_0.storeInt(src.orderId, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadLPPositionOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3021458540) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _executionFee = sc_0.loadCoins();
    let _orderId = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'LPPositionOrderCreatedEvent' as const, opType: _opType, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, orderId: _orderId, trxId: _trxId };
}

function loadTupleLPPositionOrderCreatedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LPPositionOrderCreatedEvent' as const, opType: _opType, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, orderId: _orderId, trxId: _trxId };
}

function storeTupleLPPositionOrderCreatedEvent(source: LPPositionOrderCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserLPPositionOrderCreatedEvent(): DictionaryValue<LPPositionOrderCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLPPositionOrderCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLPPositionOrderCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type LPPositionOrderCancelledEvent = {
    $$type: 'LPPositionOrderCancelledEvent';
    opType: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storeLPPositionOrderCancelledEvent(src: LPPositionOrderCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1264945856, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadLPPositionOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1264945856) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'LPPositionOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadTupleLPPositionOrderCancelledEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LPPositionOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function storeTupleLPPositionOrderCancelledEvent(source: LPPositionOrderCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserLPPositionOrderCancelledEvent(): DictionaryValue<LPPositionOrderCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLPPositionOrderCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLPPositionOrderCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type LPPositionOrderExecutedEvent = {
    $$type: 'LPPositionOrderExecutedEvent';
    opType: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storeLPPositionOrderExecutedEvent(src: LPPositionOrderExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3003473876, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadLPPositionOrderExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3003473876) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'LPPositionOrderExecutedEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadTupleLPPositionOrderExecutedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LPPositionOrderExecutedEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function storeTupleLPPositionOrderExecutedEvent(source: LPPositionOrderExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserLPPositionOrderExecutedEvent(): DictionaryValue<LPPositionOrderExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLPPositionOrderExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLPPositionOrderExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionOrderCreatedEvent = {
    $$type: 'PerpPositionOrderCreatedEvent';
    opType: bigint;
    tokenId: bigint;
    account: Address;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    triggerAbove: boolean;
    tpSize: bigint;
    tpPrice: bigint;
    slSize: bigint;
    slPrice: bigint;
    executionFee: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storePerpPositionOrderCreatedEvent(src: PerpPositionOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1919115613, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.triggerPrice, 257);
        b_1.storeBit(src.triggerAbove);
        b_1.storeInt(src.tpSize, 257);
        b_1.storeInt(src.tpPrice, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.slSize, 257);
        b_2.storeInt(src.slPrice, 257);
        b_2.storeCoins(src.executionFee);
        b_2.storeInt(src.orderId, 257);
        b_2.storeUint(src.trxId, 64);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1919115613) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _tokenId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _triggerPrice = sc_1.loadIntBig(257);
    let _triggerAbove = sc_1.loadBit();
    let _tpSize = sc_1.loadIntBig(257);
    let _tpPrice = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _slSize = sc_2.loadIntBig(257);
    let _slPrice = sc_2.loadIntBig(257);
    let _executionFee = sc_2.loadCoins();
    let _orderId = sc_2.loadIntBig(257);
    let _trxId = sc_2.loadUintBig(64);
    return { $$type: 'PerpPositionOrderCreatedEvent' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, executionFee: _executionFee, orderId: _orderId, trxId: _trxId };
}

function loadTuplePerpPositionOrderCreatedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpPositionOrderCreatedEvent' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, executionFee: _executionFee, orderId: _orderId, trxId: _trxId };
}

function storeTuplePerpPositionOrderCreatedEvent(source: PerpPositionOrderCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeBoolean(source.triggerAbove);
    builder.writeNumber(source.tpSize);
    builder.writeNumber(source.tpPrice);
    builder.writeNumber(source.slSize);
    builder.writeNumber(source.slPrice);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserPerpPositionOrderCreatedEvent(): DictionaryValue<PerpPositionOrderCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePerpPositionOrderCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionOrderCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionOrderCancelledEvent = {
    $$type: 'PerpPositionOrderCancelledEvent';
    opType: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storePerpPositionOrderCancelledEvent(src: PerpPositionOrderCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2151571829, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadPerpPositionOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2151571829) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'PerpPositionOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadTuplePerpPositionOrderCancelledEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpPositionOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function storeTuplePerpPositionOrderCancelledEvent(source: PerpPositionOrderCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserPerpPositionOrderCancelledEvent(): DictionaryValue<PerpPositionOrderCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePerpPositionOrderCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionOrderCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionOrderExecutedEvent = {
    $$type: 'PerpPositionOrderExecutedEvent';
    opType: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storePerpPositionOrderExecutedEvent(src: PerpPositionOrderExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2713389887, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadPerpPositionOrderExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2713389887) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'PerpPositionOrderExecutedEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadTuplePerpPositionOrderExecutedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpPositionOrderExecutedEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function storeTuplePerpPositionOrderExecutedEvent(source: PerpPositionOrderExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserPerpPositionOrderExecutedEvent(): DictionaryValue<PerpPositionOrderExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePerpPositionOrderExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionOrderExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type CompensateCreatedEvent = {
    $$type: 'CompensateCreatedEvent';
    compensateId: bigint;
    orderType: bigint | null;
    orderId: bigint;
    trxId: bigint;
    refundReceiver: Address | null;
    refundAmount: bigint;
    executionFeeReceiver: Address | null;
    executionFee: bigint;
    unlockTime: bigint;
}

export function storeCompensateCreatedEvent(src: CompensateCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(401001363, 32);
        b_0.storeUint(src.compensateId, 64);
        if (src.orderType !== null && src.orderType !== undefined) { b_0.storeBit(true).storeInt(src.orderType, 257); } else { b_0.storeBit(false); }
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.refundReceiver);
        b_0.storeInt(src.refundAmount, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.executionFeeReceiver);
        b_1.storeCoins(src.executionFee);
        b_1.storeInt(src.unlockTime, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCompensateCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 401001363) { throw Error('Invalid prefix'); }
    let _compensateId = sc_0.loadUintBig(64);
    let _orderType = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _refundReceiver = sc_0.loadMaybeAddress();
    let _refundAmount = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _executionFeeReceiver = sc_1.loadMaybeAddress();
    let _executionFee = sc_1.loadCoins();
    let _unlockTime = sc_1.loadIntBig(257);
    return { $$type: 'CompensateCreatedEvent' as const, compensateId: _compensateId, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee, unlockTime: _unlockTime };
}

function loadTupleCompensateCreatedEvent(source: TupleReader) {
    let _compensateId = source.readBigNumber();
    let _orderType = source.readBigNumberOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _refundReceiver = source.readAddressOpt();
    let _refundAmount = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _executionFee = source.readBigNumber();
    let _unlockTime = source.readBigNumber();
    return { $$type: 'CompensateCreatedEvent' as const, compensateId: _compensateId, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee, unlockTime: _unlockTime };
}

function storeTupleCompensateCreatedEvent(source: CompensateCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.compensateId);
    builder.writeNumber(source.orderType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.refundReceiver);
    builder.writeNumber(source.refundAmount);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.unlockTime);
    return builder.build();
}

function dictValueParserCompensateCreatedEvent(): DictionaryValue<CompensateCreatedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCompensateCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type CompensateCancelledEvent = {
    $$type: 'CompensateCancelledEvent';
    compensateId: bigint;
    trxId: bigint;
}

export function storeCompensateCancelledEvent(src: CompensateCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1271087573, 32);
        b_0.storeUint(src.compensateId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCompensateCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1271087573) { throw Error('Invalid prefix'); }
    let _compensateId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CompensateCancelledEvent' as const, compensateId: _compensateId, trxId: _trxId };
}

function loadTupleCompensateCancelledEvent(source: TupleReader) {
    let _compensateId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CompensateCancelledEvent' as const, compensateId: _compensateId, trxId: _trxId };
}

function storeTupleCompensateCancelledEvent(source: CompensateCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.compensateId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCompensateCancelledEvent(): DictionaryValue<CompensateCancelledEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCompensateCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type CompensateExecutedEvent = {
    $$type: 'CompensateExecutedEvent';
    compensateId: bigint;
    trxId: bigint;
}

export function storeCompensateExecutedEvent(src: CompensateExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3678790712, 32);
        b_0.storeUint(src.compensateId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCompensateExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3678790712) { throw Error('Invalid prefix'); }
    let _compensateId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CompensateExecutedEvent' as const, compensateId: _compensateId, trxId: _trxId };
}

function loadTupleCompensateExecutedEvent(source: TupleReader) {
    let _compensateId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CompensateExecutedEvent' as const, compensateId: _compensateId, trxId: _trxId };
}

function storeTupleCompensateExecutedEvent(source: CompensateExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.compensateId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCompensateExecutedEvent(): DictionaryValue<CompensateExecutedEvent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCompensateExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type ConfigData = {
    $$type: 'ConfigData';
    isExecutor: boolean | null;
    minTimeDelayTrader: bigint;
    lpMinExecutionFee: bigint;
    perpMinExecutionFee: bigint;
    lpGasConsumption: bigint;
    perpGasConsumption: bigint;
    poolLpGasConsumption: bigint;
    poolPerpGasConsumption: bigint;
    minTonsForStorage: bigint;
    gasTransferJetton: bigint;
    totalExecutionFee: bigint;
    usdtWallet: Address;
    pool: Address;
}

export function storeConfigData(src: ConfigData) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.isExecutor !== null && src.isExecutor !== undefined) { b_0.storeBit(true).storeBit(src.isExecutor); } else { b_0.storeBit(false); }
        b_0.storeInt(src.minTimeDelayTrader, 257);
        b_0.storeCoins(src.lpMinExecutionFee);
        b_0.storeCoins(src.perpMinExecutionFee);
        b_0.storeCoins(src.lpGasConsumption);
        b_0.storeCoins(src.perpGasConsumption);
        b_0.storeCoins(src.poolLpGasConsumption);
        b_0.storeCoins(src.poolPerpGasConsumption);
        let b_1 = new Builder();
        b_1.storeCoins(src.minTonsForStorage);
        b_1.storeCoins(src.gasTransferJetton);
        b_1.storeCoins(src.totalExecutionFee);
        b_1.storeAddress(src.usdtWallet);
        b_1.storeAddress(src.pool);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadConfigData(slice: Slice) {
    let sc_0 = slice;
    let _isExecutor = sc_0.loadBit() ? sc_0.loadBit() : null;
    let _minTimeDelayTrader = sc_0.loadIntBig(257);
    let _lpMinExecutionFee = sc_0.loadCoins();
    let _perpMinExecutionFee = sc_0.loadCoins();
    let _lpGasConsumption = sc_0.loadCoins();
    let _perpGasConsumption = sc_0.loadCoins();
    let _poolLpGasConsumption = sc_0.loadCoins();
    let _poolPerpGasConsumption = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _minTonsForStorage = sc_1.loadCoins();
    let _gasTransferJetton = sc_1.loadCoins();
    let _totalExecutionFee = sc_1.loadCoins();
    let _usdtWallet = sc_1.loadAddress();
    let _pool = sc_1.loadAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, minTimeDelayTrader: _minTimeDelayTrader, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, poolLpGasConsumption: _poolLpGasConsumption, poolPerpGasConsumption: _poolPerpGasConsumption, minTonsForStorage: _minTonsForStorage, gasTransferJetton: _gasTransferJetton, totalExecutionFee: _totalExecutionFee, usdtWallet: _usdtWallet, pool: _pool };
}

function loadTupleConfigData(source: TupleReader) {
    let _isExecutor = source.readBooleanOpt();
    let _minTimeDelayTrader = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _lpGasConsumption = source.readBigNumber();
    let _perpGasConsumption = source.readBigNumber();
    let _poolLpGasConsumption = source.readBigNumber();
    let _poolPerpGasConsumption = source.readBigNumber();
    let _minTonsForStorage = source.readBigNumber();
    let _gasTransferJetton = source.readBigNumber();
    let _totalExecutionFee = source.readBigNumber();
    let _usdtWallet = source.readAddress();
    let _pool = source.readAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, minTimeDelayTrader: _minTimeDelayTrader, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, poolLpGasConsumption: _poolLpGasConsumption, poolPerpGasConsumption: _poolPerpGasConsumption, minTonsForStorage: _minTonsForStorage, gasTransferJetton: _gasTransferJetton, totalExecutionFee: _totalExecutionFee, usdtWallet: _usdtWallet, pool: _pool };
}

function storeTupleConfigData(source: ConfigData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isExecutor);
    builder.writeNumber(source.minTimeDelayTrader);
    builder.writeNumber(source.lpMinExecutionFee);
    builder.writeNumber(source.perpMinExecutionFee);
    builder.writeNumber(source.lpGasConsumption);
    builder.writeNumber(source.perpGasConsumption);
    builder.writeNumber(source.poolLpGasConsumption);
    builder.writeNumber(source.poolPerpGasConsumption);
    builder.writeNumber(source.minTonsForStorage);
    builder.writeNumber(source.gasTransferJetton);
    builder.writeNumber(source.totalExecutionFee);
    builder.writeAddress(source.usdtWallet);
    builder.writeAddress(source.pool);
    return builder.build();
}

function dictValueParserConfigData(): DictionaryValue<ConfigData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeConfigData(src)).endCell());
        },
        parse: (src) => {
            return loadConfigData(src.loadRef().beginParse());
        }
    }
}

export type ExecutorParam = {
    $$type: 'ExecutorParam';
    executor: Address;
    enable: boolean;
}

export function storeExecutorParam(src: ExecutorParam) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.executor);
        b_0.storeBit(src.enable);
    };
}

export function loadExecutorParam(slice: Slice) {
    let sc_0 = slice;
    let _executor = sc_0.loadAddress();
    let _enable = sc_0.loadBit();
    return { $$type: 'ExecutorParam' as const, executor: _executor, enable: _enable };
}

function loadTupleExecutorParam(source: TupleReader) {
    let _executor = source.readAddress();
    let _enable = source.readBoolean();
    return { $$type: 'ExecutorParam' as const, executor: _executor, enable: _enable };
}

function storeTupleExecutorParam(source: ExecutorParam) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executor);
    builder.writeBoolean(source.enable);
    return builder.build();
}

function dictValueParserExecutorParam(): DictionaryValue<ExecutorParam> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExecutorParam(src)).endCell());
        },
        parse: (src) => {
            return loadExecutorParam(src.loadRef().beginParse());
        }
    }
}

export type LPPositionOrder = {
    $$type: 'LPPositionOrder';
    isIncrease: boolean;
    account: Address;
    liquidityDelta: bigint;
    executionFee: bigint;
    blockTime: bigint;
    isPending: boolean;
    executionFeeReceiver: Address;
    lastOperator: Address | null;
}

export function storeLPPositionOrder(src: LPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.isIncrease);
        b_0.storeAddress(src.account);
        b_0.storeInt(src.liquidityDelta, 257);
        b_0.storeCoins(src.executionFee);
        b_0.storeInt(src.blockTime, 257);
        b_0.storeBit(src.isPending);
        let b_1 = new Builder();
        b_1.storeAddress(src.executionFeeReceiver);
        b_1.storeAddress(src.lastOperator);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    let _isIncrease = sc_0.loadBit();
    let _account = sc_0.loadAddress();
    let _liquidityDelta = sc_0.loadIntBig(257);
    let _executionFee = sc_0.loadCoins();
    let _blockTime = sc_0.loadIntBig(257);
    let _isPending = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _executionFeeReceiver = sc_1.loadAddress();
    let _lastOperator = sc_1.loadMaybeAddress();
    return { $$type: 'LPPositionOrder' as const, isIncrease: _isIncrease, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function loadTupleLPPositionOrder(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _account = source.readAddress();
    let _liquidityDelta = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    let _executionFeeReceiver = source.readAddress();
    let _lastOperator = source.readAddressOpt();
    return { $$type: 'LPPositionOrder' as const, isIncrease: _isIncrease, account: _account, liquidityDelta: _liquidityDelta, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function storeTupleLPPositionOrder(source: LPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isIncrease);
    builder.writeAddress(source.account);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    builder.writeBoolean(source.isPending);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeAddress(source.lastOperator);
    return builder.build();
}

function dictValueParserLPPositionOrder(): DictionaryValue<LPPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLPPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadLPPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type LPPositionOrderData = {
    $$type: 'LPPositionOrderData';
    lpPositionOrderIndexNext: bigint;
    lpPositionOrder: LPPositionOrder | null;
}

export function storeLPPositionOrderData(src: LPPositionOrderData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.lpPositionOrderIndexNext, 257);
        let b_1 = new Builder();
        if (src.lpPositionOrder !== null && src.lpPositionOrder !== undefined) { b_1.storeBit(true); b_1.store(storeLPPositionOrder(src.lpPositionOrder)); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLPPositionOrderData(slice: Slice) {
    let sc_0 = slice;
    let _lpPositionOrderIndexNext = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _lpPositionOrder = sc_1.loadBit() ? loadLPPositionOrder(sc_1) : null;
    return { $$type: 'LPPositionOrderData' as const, lpPositionOrderIndexNext: _lpPositionOrderIndexNext, lpPositionOrder: _lpPositionOrder };
}

function loadTupleLPPositionOrderData(source: TupleReader) {
    let _lpPositionOrderIndexNext = source.readBigNumber();
    const _lpPositionOrder_p = source.readTupleOpt();
    const _lpPositionOrder = _lpPositionOrder_p ? loadTupleLPPositionOrder(_lpPositionOrder_p) : null;
    return { $$type: 'LPPositionOrderData' as const, lpPositionOrderIndexNext: _lpPositionOrderIndexNext, lpPositionOrder: _lpPositionOrder };
}

function storeTupleLPPositionOrderData(source: LPPositionOrderData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lpPositionOrderIndexNext);
    if (source.lpPositionOrder !== null && source.lpPositionOrder !== undefined) {
        builder.writeTuple(storeTupleLPPositionOrder(source.lpPositionOrder));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserLPPositionOrderData(): DictionaryValue<LPPositionOrderData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLPPositionOrderData(src)).endCell());
        },
        parse: (src) => {
            return loadLPPositionOrderData(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionOrder = {
    $$type: 'PerpPositionOrder';
    opType: bigint;
    tokenId: bigint;
    account: Address;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    triggerAbove: boolean;
    executionFee: bigint;
    blockTime: bigint;
    isPending: boolean;
    executionFeeReceiver: Address;
    lastOperator: Address | null;
}

export function storePerpPositionOrder(src: PerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 257);
        b_0.storeInt(src.sizeDelta, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.triggerPrice, 257);
        b_1.storeBit(src.triggerAbove);
        b_1.storeCoins(src.executionFee);
        b_1.storeInt(src.blockTime, 257);
        b_1.storeBit(src.isPending);
        b_1.storeAddress(src.executionFeeReceiver);
        let b_2 = new Builder();
        b_2.storeAddress(src.lastOperator);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    let _opType = sc_0.loadUintBig(8);
    let _tokenId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(257);
    let _sizeDelta = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _triggerPrice = sc_1.loadIntBig(257);
    let _triggerAbove = sc_1.loadBit();
    let _executionFee = sc_1.loadCoins();
    let _blockTime = sc_1.loadIntBig(257);
    let _isPending = sc_1.loadBit();
    let _executionFeeReceiver = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _lastOperator = sc_2.loadMaybeAddress();
    return { $$type: 'PerpPositionOrder' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function loadTuplePerpPositionOrder(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    let _executionFeeReceiver = source.readAddress();
    let _lastOperator = source.readAddressOpt();
    return { $$type: 'PerpPositionOrder' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending, executionFeeReceiver: _executionFeeReceiver, lastOperator: _lastOperator };
}

function storeTuplePerpPositionOrder(source: PerpPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeBoolean(source.triggerAbove);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    builder.writeBoolean(source.isPending);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeAddress(source.lastOperator);
    return builder.build();
}

function dictValueParserPerpPositionOrder(): DictionaryValue<PerpPositionOrder> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePerpPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionOrder(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionOrderEx = {
    $$type: 'PerpPositionOrderEx';
    tpSize: bigint;
    tpPrice: bigint;
    slSize: bigint;
    slPrice: bigint;
    executionFee: bigint;
}

export function storePerpPositionOrderEx(src: PerpPositionOrderEx) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.tpSize, 257);
        b_0.storeInt(src.tpPrice, 257);
        b_0.storeInt(src.slSize, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.slPrice, 257);
        b_1.storeInt(src.executionFee, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionOrderEx(slice: Slice) {
    let sc_0 = slice;
    let _tpSize = sc_0.loadIntBig(257);
    let _tpPrice = sc_0.loadIntBig(257);
    let _slSize = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _slPrice = sc_1.loadIntBig(257);
    let _executionFee = sc_1.loadIntBig(257);
    return { $$type: 'PerpPositionOrderEx' as const, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, executionFee: _executionFee };
}

function loadTuplePerpPositionOrderEx(source: TupleReader) {
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    return { $$type: 'PerpPositionOrderEx' as const, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, executionFee: _executionFee };
}

function storeTuplePerpPositionOrderEx(source: PerpPositionOrderEx) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tpSize);
    builder.writeNumber(source.tpPrice);
    builder.writeNumber(source.slSize);
    builder.writeNumber(source.slPrice);
    builder.writeNumber(source.executionFee);
    return builder.build();
}

function dictValueParserPerpPositionOrderEx(): DictionaryValue<PerpPositionOrderEx> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePerpPositionOrderEx(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionOrderEx(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionOrderData = {
    $$type: 'PerpPositionOrderData';
    perpPositionOrderIndexNext: bigint;
    perpPositionOrder: PerpPositionOrder | null;
    perpPositionOrderEx: PerpPositionOrderEx | null;
}

export function storePerpPositionOrderData(src: PerpPositionOrderData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.perpPositionOrderIndexNext, 257);
        let b_1 = new Builder();
        if (src.perpPositionOrder !== null && src.perpPositionOrder !== undefined) { b_1.storeBit(true); b_1.store(storePerpPositionOrder(src.perpPositionOrder)); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
        if (src.perpPositionOrderEx !== null && src.perpPositionOrderEx !== undefined) { b_2.storeBit(true); b_2.store(storePerpPositionOrderEx(src.perpPositionOrderEx)); } else { b_2.storeBit(false); }
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionOrderData(slice: Slice) {
    let sc_0 = slice;
    let _perpPositionOrderIndexNext = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _perpPositionOrder = sc_1.loadBit() ? loadPerpPositionOrder(sc_1) : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _perpPositionOrderEx = sc_2.loadBit() ? loadPerpPositionOrderEx(sc_2) : null;
    return { $$type: 'PerpPositionOrderData' as const, perpPositionOrderIndexNext: _perpPositionOrderIndexNext, perpPositionOrder: _perpPositionOrder, perpPositionOrderEx: _perpPositionOrderEx };
}

function loadTuplePerpPositionOrderData(source: TupleReader) {
    let _perpPositionOrderIndexNext = source.readBigNumber();
    const _perpPositionOrder_p = source.readTupleOpt();
    const _perpPositionOrder = _perpPositionOrder_p ? loadTuplePerpPositionOrder(_perpPositionOrder_p) : null;
    const _perpPositionOrderEx_p = source.readTupleOpt();
    const _perpPositionOrderEx = _perpPositionOrderEx_p ? loadTuplePerpPositionOrderEx(_perpPositionOrderEx_p) : null;
    return { $$type: 'PerpPositionOrderData' as const, perpPositionOrderIndexNext: _perpPositionOrderIndexNext, perpPositionOrder: _perpPositionOrder, perpPositionOrderEx: _perpPositionOrderEx };
}

function storeTuplePerpPositionOrderData(source: PerpPositionOrderData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.perpPositionOrderIndexNext);
    if (source.perpPositionOrder !== null && source.perpPositionOrder !== undefined) {
        builder.writeTuple(storeTuplePerpPositionOrder(source.perpPositionOrder));
    } else {
        builder.writeTuple(null);
    }
    if (source.perpPositionOrderEx !== null && source.perpPositionOrderEx !== undefined) {
        builder.writeTuple(storeTuplePerpPositionOrderEx(source.perpPositionOrderEx));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserPerpPositionOrderData(): DictionaryValue<PerpPositionOrderData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePerpPositionOrderData(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionOrderData(src.loadRef().beginParse());
        }
    }
}

export type UpdatePrice = {
    $$type: 'UpdatePrice';
    tokenId: bigint;
    price: bigint;
}

export function storeUpdatePrice(src: UpdatePrice) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.tokenId, 64);
        b_0.storeInt(src.price, 257);
    };
}

export function loadUpdatePrice(slice: Slice) {
    let sc_0 = slice;
    let _tokenId = sc_0.loadUintBig(64);
    let _price = sc_0.loadIntBig(257);
    return { $$type: 'UpdatePrice' as const, tokenId: _tokenId, price: _price };
}

function loadTupleUpdatePrice(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _price = source.readBigNumber();
    return { $$type: 'UpdatePrice' as const, tokenId: _tokenId, price: _price };
}

function storeTupleUpdatePrice(source: UpdatePrice) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.price);
    return builder.build();
}

function dictValueParserUpdatePrice(): DictionaryValue<UpdatePrice> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdatePrice(src)).endCell());
        },
        parse: (src) => {
            return loadUpdatePrice(src.loadRef().beginParse());
        }
    }
}

export type Compensate = {
    $$type: 'Compensate';
    orderType: bigint | null;
    orderId: bigint;
    trxId: bigint;
    refundReceiver: Address | null;
    refundAmount: bigint;
    executionFeeReceiver: Address | null;
    executionFee: bigint;
    unlockTime: bigint;
}

export function storeCompensate(src: Compensate) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.orderType !== null && src.orderType !== undefined) { b_0.storeBit(true).storeInt(src.orderType, 257); } else { b_0.storeBit(false); }
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.refundReceiver);
        b_0.storeInt(src.refundAmount, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.executionFeeReceiver);
        b_1.storeCoins(src.executionFee);
        b_1.storeInt(src.unlockTime, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCompensate(slice: Slice) {
    let sc_0 = slice;
    let _orderType = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _refundReceiver = sc_0.loadMaybeAddress();
    let _refundAmount = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _executionFeeReceiver = sc_1.loadMaybeAddress();
    let _executionFee = sc_1.loadCoins();
    let _unlockTime = sc_1.loadIntBig(257);
    return { $$type: 'Compensate' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee, unlockTime: _unlockTime };
}

function loadTupleCompensate(source: TupleReader) {
    let _orderType = source.readBigNumberOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _refundReceiver = source.readAddressOpt();
    let _refundAmount = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _executionFee = source.readBigNumber();
    let _unlockTime = source.readBigNumber();
    return { $$type: 'Compensate' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee, unlockTime: _unlockTime };
}

function storeTupleCompensate(source: Compensate) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.refundReceiver);
    builder.writeNumber(source.refundAmount);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.unlockTime);
    return builder.build();
}

function dictValueParserCompensate(): DictionaryValue<Compensate> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCompensate(src)).endCell());
        },
        parse: (src) => {
            return loadCompensate(src.loadRef().beginParse());
        }
    }
}

export type CompensateData = {
    $$type: 'CompensateData';
    compensateIndexNext: bigint;
    compensate: Compensate | null;
}

export function storeCompensateData(src: CompensateData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.compensateIndexNext, 257);
        let b_1 = new Builder();
        if (src.compensate !== null && src.compensate !== undefined) { b_1.storeBit(true); b_1.store(storeCompensate(src.compensate)); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCompensateData(slice: Slice) {
    let sc_0 = slice;
    let _compensateIndexNext = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _compensate = sc_1.loadBit() ? loadCompensate(sc_1) : null;
    return { $$type: 'CompensateData' as const, compensateIndexNext: _compensateIndexNext, compensate: _compensate };
}

function loadTupleCompensateData(source: TupleReader) {
    let _compensateIndexNext = source.readBigNumber();
    const _compensate_p = source.readTupleOpt();
    const _compensate = _compensate_p ? loadTupleCompensate(_compensate_p) : null;
    return { $$type: 'CompensateData' as const, compensateIndexNext: _compensateIndexNext, compensate: _compensate };
}

function storeTupleCompensateData(source: CompensateData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.compensateIndexNext);
    if (source.compensate !== null && source.compensate !== undefined) {
        builder.writeTuple(storeTupleCompensate(source.compensate));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserCompensateData(): DictionaryValue<CompensateData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCompensateData(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateData(src.loadRef().beginParse());
        }
    }
}

type OrderBook_init_args = {
    $$type: 'OrderBook_init_args';
    deployId: bigint;
}

function initOrderBook_init_args(src: OrderBook_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.deployId, 257);
    };
}

async function OrderBook_init(deployId: bigint) {
    const __code = Cell.fromBase64('te6ccgECzQEAPlQAART/APSkE/S88sgLAQIBYgIDA+LQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPPLggsIEBQIBIKusBPLtou37AY/jgCDXIXAh10nCH5UwINcLH94gghDonNRfuuMCghD/V+VXuo880x8BghD/V+VXuvLggdM/0wfTP1UgbBNbJYEBASJZ9A1voZIwbd8gbpIwbY6H0Ns8bB1vDeIgbpFb4w5/4DB/4HAh10nCH5UwINcLH94gCbcKCwFAyPhDAcx/AcoAERcRFhEVERQRExESEREREFXg2zzJ7VQGAdoBERYBEReBAQHPAAERFAGBAQHPAAEREgGBAQHPABEQyIEBAc8AH4EBAc8AHYEBAc8AC8iBAQHPABqBAQHPABiBAQHPAAbIgQEBzwBQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlADBwH8INdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSygAS9ABQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhP0ABTLPxT0AAXI9AAWyz8W9AAWyz/JWMzJCAAaUAPMyVADzMlYzMkBzAP8MNMfAYIQ6JzUX7ry4IHSANM/WWwSMSeBAQEiWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjiIG6RW49DIG7y0IBvKDIQRhA1RlZwgQEBUYfIVXDbPMkaEyBulTBZ9FowlEEz9BXiJ26zjpEHIG7y0IBwgEJ/VSBtbW3bPJE34uJ/tJmpA+4gbvLQgG8tMivAA46uG18LgQEBbSBukjBtjo0gbvLQgG8tyFXA2zzJ4hA4QYAgbpUwWfRaMJRBM/QV4o6gVZFwgQEBUc3IVcDbPMkQOEGAIG6VMFn0WjCUQTP0FeLiJW6zjpEFIG7y0IBwgEJ/VSBtbW3bPJE14p6eqQRighCSzzVmuo8IMNs8bB7bPH/gIMAAItdJwSGwklt/4CCCEHNi0Jy64wIgghAlshckugwNDg8B3tMfAYIQks81Zrry4IGBAQHXAPQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAPoA1AHQ+gD6APoA+gD6APoA+gDUMND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIARAE9hEWESQRFhEVESMRFREUESIRFBETESERExESESAREhERER8REREQER4REA8RHQ8OERwODREbDQwRGgwLERkLChEYCgkRFwkIESQIBxEjBwYRIgYFESEFBBEgBAMRHwMCER4CAREdAREc2zw3Ojo7Ozs7Ozs7OztwioroMJIREhMD2jDTHwGCEHNi0Jy68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUEwMQI2wU+EJWEQHHBbOPKDD4QnCAQnBtUzPIywDJ0CcQahBZBAhVIMhVYNs8yRRDMBRDMG1t2zzjDn+iqRQE/o6bMNMfAYIQJbIXJLry4IH6ANN/0z9VIGwT2zx/4CCCEH2R6za6jsQw0x8BghB9kes2uvLggdM/0z/6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iQzBsE9s8f+AgghAShrmLuuMCIIIQHPDPgbobHB0eAFT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMRCeEJ0QnBCbEJoACCBWEbkA5i+BAQEiWfQNb6GSMG3fIG6SMG2OKND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAWWwSbwLiIG6zjiyBAQshIG7y0IBvIjACIG7y0IBvIjEQOxJxIW6VW1n0WTCYyAHPAEEz9EHiCJEw4qQBQj4++EJ/cIBAECNtbW3bPAoRFgoQnxCuXikQehBpEFhVI6kDNC3jAtMAAcABILPjAgHUMNDTHyKTIcABkXDiFRYXBPYwERgRGREYERcRGREXERYRGREWERURGREVERQRGREUERMRGRETERIRGRESERERGRERERARGREQDxEZDw4RGQ4NERkNDBEZDAsRGQsKERkKCREZCREZCAcGVUBWGVYa2zx/cIBCiAQRGwQQNG1t2zwRFREWERURFBEVERSgGKkaBPZbERgRGREYERcRGREXERYRGREWERURGREVERQRGREUERMRGRETERIRGRESERERGRERERARGREQDxEZDw4RGQ4NERkNDBEZDAsRGQsKERkKCREZCREZCAcGVUBWGVYa2zx/cIBCiAQRGwQQNG1t2zwRFREWERURFBEVERSgGakaAhyOimwh03/6ADAB2zzjDiEiADAAAAAAY3JlYXRlIG9yZGVyIHN0b3BwZWQAKgAAAABwYXlsb2FkIG5vdCBleGlzdAA8ERMRFBETERIRExESEREREhERERAREREQDxEQD1UOAvQRFhEZERYRFREYERURFBEXERQRExEZERMREhEYERIREREXEREREBEZERAPERgPDhEXDg0RGQ0MERgMCxEXCwoRGQoJERgJCBEXCAcRGQcGERgGBREXBQQRGQQDERgDAhEXAgERGQERGNs8+EFvJDAxgUtpMlYZoVYXvpMfAu74QW8kE18DKoEBASVZ9A1voZIwbd8gbpIwbY6H0Ns8bBhvCOKBf30hbrPy9CBu8tCAbyhbJZ2BS2lWIFYcoBi+F/L0moFLaQdWIL4X8vTigV5tBrMW8vT4QhEXER8RFxEWER4RFhEVER0RFREUERwRFBETERsRE7QuAYgw0x8BghAShrmLuvLggdM/0z/6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iQzBsE9s8fzQEeI6eMNMfAYIQHPDPgbry4IHTP4EBAdcA0z9VIGwT2zx/4CCCEGqSPdu6jwgw2zxsF9s8f+AgghAjxy9Yujo7PD0D9PL0gV/yVhhWEb7y9CWkgQEBcPhC+CNw+EJtViEEViBENMhVcNs8ySgQOgEgbpUwWfRaMJRBM/QV4g5WGKBy+EJQQwIRHAJWGgIRHBnIVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBx+EIhERcRGhEXERYRGREWmSUgAY4RFREYERURFBEXERQRExEWERMREhEVERIREREUEREREBETERAPERIPDREQDRDPEL4QrRCcEIsQihB5EFgQRxA2EDRBMHDbPKYC9vhBbyQTXwOLCHAkVh6gE7mOElt/i+Z2FzIG5vdCBlbm91Z2iN5TUrmOFlt/jQRamV0dG9uIG5vdCBlbm91Z2iDeI1YXuY4dW3+NBhleGVjdXRpb24gZmVlIG5vdCBlbm91Z2iDeAeMCMDMppIEBAX/4I3BtJ1E5UThSpCMkA7ACksACkjBw4o6k+gDSAAHA/wHTP9IAAcD/AdN/03/T/9Qw0NN/0//Tf9P/MNs8jycwcIBCcG1TM8jLAMnQJhBpEFgEB1UgyFVg2zzJVhBVMBRDMG1t2zziJqKpAvxsIREYERoRGBEXERkRFxEWERoRFhEVERkRFREUERoRFBETERkRExESERoREhERERkREREQERoREA8RGQ8OERoODREZDQwRGgwLERkLChEaCgkRGQkIERoIBxEZBwYRGgYFERkFBBEaBAMRGQMCERoCAREZAREaVhlWGts8f3CgKgOiyFVw2zzJLBA+ASBulTBZ9FowlEEz9BXiERIhoHFRMEUTVCAXHchVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHEgAhERAhAqSTAScNs8mSWmAHiCELQXzGxQB8sfFcsHUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAAH6AoEBAc8Ayz8D7PhBbyQTXwOLCHAtViagE7mOElt/i+Z2FzIG5vdCBlbm91Z2iN5T6LmOFlt/jQRamV0dG9uIG5vdCBlbm91Z2iDecSbCAJMlwgCRcOKSMHLeJMIAkyPCAJFw4pGk3lYfIahS4LnjAALjAjA9CZF6koAL4lKtqQQnKCkAPmwhf40GGV4ZWN1dGlvbiBmZWUgbm90IGVub3VnaIFgC/GzBERgRGhEYERcRGREXERYRGhEWERURGREVERQRGhEUERMRGRETERIRGhESERERGRERERARGhEQDxEZDw4RGg4NERkNDBEaDAsRGQsKERoKCREZCQgRGggHERkHBhEaBgURGQUEERoEAxEZAwIRGgIBERkBERpWGVYa2zx/cKAqAfwRIhEkESIRIREjESERIBEkESARHxEjER8RHhEkER4RHREjER0RHBEkERwRGxEjERsRGhEkERoRGREjERkRGBEkERgRFxEjERcRFhEkERYRFREjERURFBEkERQRExEjERMREhEkERIREREjEREREBEkERAPESMPDhEkDg0RIw0tAnyAQhEb2zwEERoEQTABERsBEDRtbds8ERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHSupAULIcAHLH28AAW+MbW+MAds8byIByZMhbrOWAW8iWczJ6DEsALog10oh10mXIMIAIsIAsY5KA28igH8izzGrAqEFqwJRVbYIIMIAnCCqAhXXGFAzzxZAFN5ZbwJTQaHCAJnIAW8CUEShqgKOEjEzwgCZ1DDQINdKIddJknAg4uLoXwMC0AwRJAwLESMLChEkClYjUKrbPDANVhigERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4PEM4QvRCsEJsQihB5EGgQVxBGEDUQJHJAFANxcNs8a6YC/hESERoREhERERkREREQERgREA8RHw8OER4ODREdDQwRHAwLERsLChEaCgkRGQkIERgIBxEfBwYRHgYFER0FBBEcBAMRGwMCERoCAREZAds8ggCg9yGRf5f4QlYdAccF4vL0s44SggCbFxEdVheg+CO7AREdAfL0klcc4vhCVh2BLwTgbrOaMBEcIG7y0IARHJJXHeKBAQFtIG6SMG2OjSBu8tCAbyjIVXDbPMniECdWGAEgbpUwWfRaMJRBM/QV4lYalFcYVxjjDVYVwgCOkhEaf1YWchAjbW1t2zwJVhShCZJXGuJWF5FxkXLiAgERFAERG5kwqTEC/vhCERYRGREWERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6GRBYEEcQNl4iAxEcA1YeAwIRHQIRGwHbPBEZAhEXAgYRFgYRFQIRFAIGERMGERICERECBhEQBk4fEG2gMgH8yFUgghBLZYrAUATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcfhCERSjIRETERsRExESERoREhERERkREREQERgREA8RFw8OERYODREVDQwRFAwLERMLChESCgkREQkIERAIEH8QbhBdEEwQaxBqEEkQaF4jMwAYSxwQakgZBkUXUEQDAQpBBAPbPKYE9vhBbyQTXwMqgQEBJVn0DW+hkjBt3yBukjBtjofQ2zxsGG8I4oF/fSFus/L0IG7y0IBvKFsl4w+BXm0RGLMBERgB8vT4QhETERcRExESERYREhERERUREREQERQREA8REw8OERIODRERDQwREAwQvxCuEJ0QjBB7EGoQWbQ1NjcC+IFLaVYgqgARFhEiERYRFREhERURFBEgERQRExEfERMREhEeERIREREdEREREBEcERAPERsPDhEaDg0RGQ0MERgMCxEXCwoRIgoJESEJCBEgCAcRHwcGER4GBREdBQQRHAQDERsDAhEaAgERGQERGHHbPAERGQGgAREgAb5+OAL+gUtpViCqABEWESIRFhEVESERFREUESARFBETER8RExESER4REhERER0REREQERwREA8RGw8OERoODREZDQwRGAwLERcLChEiCgkRIQkIESAIBxEfBwYRHgYFER0FBBEcBAMRGwMCERoCAREZAREYcds8AREZAaBWEKABESABvn44A+QQSBA3RlAQNBAjAhEdAts8ggCg9wHy9FYdbrOXER0gbvLQgJRXHfhC4vhCf4EBAVYeBVYeBVYeBQQRHgQDER0DAhEeAshVcNs8yRAlAREWAVYbASBulTBZ9FowlEEz9BXiAREYAREZcBEcgEARGX8RGViBmTkADAERGAHy9AHkyFVAghDonNRfUAbLHxTKABLLPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMs/yScEAxEbAwIRFwIRFgEUQzBtbds8DhEWDg0RFQ0MERQMCxETCwoREgoJEREJCBEQCFV3FxBGXiJYqQP2+EFvJBNfA4IAoPf4QlYRAccF8vQqgQEBJVn0DW+hkjBt3yBukjBtjofQ2zxsGG8I4oF/fSFus/L0IG7y0IBvKGwiMySagUtpBlYfvhby9J2BS2lWH1YboBe+FvL04oEBAW0gbpIwbY6NIG7y0IBvKMhVcNs8yeICERACtJk+ADrTHwGCEGqSPdu68uCB+gDTP9IA03/Tf9N/0z9VYAL0ERYRHREWERURHBEVERQRGxEUERMRGhETERIRGRESERERGBERERARFxEQDxEdDw4RHA4NERsNDBEaDAsRGQsKERgKCREXCQgRHQgHERwHBhEbBgURGgUEERkEAxEYAwIRFwIBER0BERzbPPhBbyQwMYFLaTJWHaFWFr6TQgTGjwgw2zxsGNs8f+AgghDB+VPyuo7FMNMfAYIQwflT8rry4IH6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iAdM/0z9VIGwT2zx/4CCCEJ36Dti6REVGRwPaUpAgbpUwWfRaMJRBM/QV4ibCAJEy4w0twgCOkQN/LnIQI21tbds8ERMsoRETkTPiAZFxkXLiQFPIVSCCELMFX9RQBMsfEssHyz/LP8nIgljAAAAAAAAAAAAAAAABActnzMlw+wAgbrOSWzfjDT+pQAL2ERcRHhEXERYRHREWERURHBEVERQRGxEUERMRGhETERIRGRESERERGBERERARHhEQDxEdDw4RHA4NERsNDBEaDAsRGQsKERgKCREeCQgRHQgHBhEbBgURGgUEERkEAxEYAwIRHgIBER0BVhoBVhwBESBWH9s8ERYRHREWoEEBKnEBIG7y0IAKo1RBE8IAEEtBQBPbPKYAmhEVERwRFREUERsRFBETERoRExESERkREhERERgREREQERcREA8RFg8OERUODREUDQwREwwLERILChERCgkREAkQjxB+EFwQSxA6SYcWAfzy9IFf8lYcVhC+8vSADPhCcFRwABEcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI5DAuIQfRBsEKsQWhBJBBEjBFYj2zwwDVYXoHL4QhEYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREAIREAIQ7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDRYcXDbPGumAD7THwGCECPHL1i68uCB+gDTP9IA03/Tf9N/03/TP1VwA/QRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEeDg0RHQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRFwcGER4GBREdBQQRHAQDERsDAhEaAgERGQERGNs8+EFvJBNfA3BWHsIAkXDjDZNISQLw+EFvJBNfAyiBAQEkWfQNb6GSMG3fIG6SMG2Oh9DbPGwdbw3igX99IW6z8vQgbvLQgG8tW2wzNDUlwAqRf5MlwAvinYFLaVYfVhygGL4X8vSagUtpB1Yfvhfy9OKBXm0CsxLy9PhCERcRHxEXERYRHhEWERURHREVt08EOo8IMNs8bBbbPH/gIIIQ7wHCtLrjAiCCECM0O7S6WVpbXAAIVh3CAAP6kjBx3lYcwgCUVhvCAJFw4pGk3oFLaQJWGqFWFyKovhLy9IFf8lYQIqhWGgG+8vRWHcIAlFYcwgCRcOKUVxxXHOMNVhnCAJRWGMIAkXDijhIEER0EAxEcAwIRGQJXF1cXXwPjDQdWEaBy+EIREhEaERIREREZEREREBEYERBKS0wB/IAN+EJwVHAAIFYfKKkEER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmk0B/oAO+EJwVHAAIFYdViKpBBEdESMRHREcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI5OAXIPERcPDhEWDg0RFQ0MERQMCxETCwoREgoCERECCBEQCBB/EG4QXRBMEDsQmhAoEGcQVhBFQDRw2zymAXJWIQoQiRB4VigIVigIBwYRKAYFEScFBAMRKAMCEScCAREo2zwwERsRGhEWERURFBETERIREREQVeBrAaAQvRC8EHsQagkRJQkIESQIEFcGESUGBREkBds8MAURGAUEERcEERYFERUFAxEUAwIREwIBERIBBBERBBEQEF8QPk3AEEsKEFkQOEcUBVUgBmsE/BEUERwRFBETERsRExESERoREhERERkREREQERgREA8RHw8OER4ODREdDQwRHAwLERsLChEaCgkRGQkIERgIBxEfBwYRHgYFER0FBBEcBAMRGwMCERoCAREZAds8ggCg9yGRf5f4QlYcAccF4vL0s5Fw4w2SVxrjDfhCVhdus4FQUVIAGFYbwAqRf5RWG8AM4gAkggCbFxEbVheg+CO7AREbAfL0BPyaMBEWIG7y0IARFpJXF+JwVhvACpF/lFYbwAvilFcYVxjjDYEBAW0gbpIwbY6NIG7y0IBvLchVwNs8yeIQJFYeASBulTBZ9FowlEEz9BXiVhrCAI6WERV/VhtyECNtbW3bPAERFQERGaARFJRXFVcZ4glWFKFWFwIBERsBERpTnqlUAvgjgQEBViBZ9A1voZIwbd8gbpIwbY4o0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wAwECUQJBAjbBVvBeIgbrORMOMN+EIRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPVVYB/MhVIIIQgD5hdVAEyx8SywfLP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHL4QhEUo3FWGMAKk1cYf5QRGMAL4hETERsRExESERoREhERERkREREQERgREA8RFw8OERYODREVDQwRFAwLERMLCxESCwkREQkIERAIEH8QblgC9iBu8tCAbyUlBcIAkwPCAJIzcOKUM1RBE94BwgCSwgCSMHDikaCRMOIgwgCOjTFWGX8ichAjbW1t2zyRMOKBAQFtIG6SMG2OLSBu8tCAbyXIVUBQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyeIQJVYgAalXAZAOERAOEN8QzhC9EKwQmxCKEHkQaBBXEEYQNRAkAxEbA1YeAwIRHAIRGwHbPBEYAREXAREWAREVAREUARETARESARERAREQVdGgAB4gbpUwWfRaMJRBM/QV4gMBKBBdEEwQOxA6EEkQSBA3EDVBQNs8pgCW0x8BghCd+g7YuvLggfpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIB0z/TP9M/gQEB1wCBAQHXAFVQBPb4QW8kE18DK4EBASdZ9A1voZIwbd8gbpIwbY6H0Ns8bB1vDeKBf30hbrPy9CBu8tCAby1bKsAKkX+TKsAL4uMPgV5tESizAREoAfL0ggDKxxEhVhy6AREhAfL0+EIREhEXERIREREWEREREBEVERAPERQPDhETDg0REg23XV5fAqgw0x8BghDvAcK0uvLggdM/gQEB1wDTP1UgbBP4QW8kE18DggCg9/hCVhEBxwXy9CiBAQElWfQNb6GSMG3fIG6SMG2Oh9DbPGwdbw3iIG6SXwXjDn+3YwQ6jwgw2zxsF9s8f+AgghDsM8xSuuMCIIIQXdWEYbp0dXZ3AviBS2lWJ6oAERYRKhEWERURKREVERQRKBEUERMRJxETERIRJhESERERJRERERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRKgIBESkBEShy2zwBESkBoAERIQG+fmAC/oFLaVYnqgARFhEqERYRFREpERURFBEoERQRExEnERMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEqAgERKQERKHLbPAERKQGgVhCgAREhAb5+YAP+DBERDAsREAsQrxCeEI0QfBBrEFoQSRA4R2AFESAFBBEmBAMRJQMCER0CAREkAds8ggCg9wHy9FYibrOXESIgbvLQgJRXIvhC4vhCf4EBAVYeBVYeBVYeBVYeBVYeBVYsBVYlBVYtBQQRKgQDETADAhEqAshVwNs8yRAjAREkAYGeYQAMAREoAfL0A/hWIAEgbpUwWfRaMJRBM/QV4ggRHggHERgHBhEdBgURFgUEERcEAxEVAwIRFAIBESEBERlwESGAQBEdfxEdEHkQZxBWEEUQNBAjyFWw2zzJVhYEAxEZAwIRFAIREwEUQzBtbds8BxEWBwYRFQYFERQFBBETBAMREgMCERECg6liACYBERABDxBdDBA7SRoIEDdGFUMUAvwgbvLQgG8tNTVbMzNxJ8AKkX+TJ8AL4o7RgUtpCVYhvhny9C6BAQEsWfQNb6GSMG3fIG6SMG2OKNCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQI2wVbwXiIG6zkzAzNOMNjhE0NYFLaVYfVhygGL4X8vQVE+JkZQLmIG7y0IBvJSTCAJMjwgCRcOKSMzPjDSDCAJMiwgCRcOKUXwMzNOMNgQEBbSBukjBtji0gbvLQgG8lyFVAUEWBAQHPABKBAQHPAIEBAc8AAciBAQHPABKBAQHPAMkBzMniKhA/ASBulTBZ9FowlEEz9BXiDGZnBPiBAQFtIG6SMG2OjSBu8tCAby3IVcDbPMniEC9SoCBulTBZ9FowlEEz9BXiJ8IAkTLjDUN1yFUgghChuws/UATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAIMIAjpECfyNyECNtbW3bPBERIaEREZEy4nIJnnCpcQH+PHKADfhCcFRwACARHxEtER8RHhEsER4RHRErER0RHBEqERwRGxEpERsRGhEoERoRGREnERkRGBEmERgRFxElERcRFhEkERYRFREjERURFBEiERQRExEhERMREhEgERIREREtEREREBEsERAPESsPDhEqDg0RKQ0MESgMCxEnC2gB+gqkgA74QnBUcAAgESIRKxEiESERKhEhESARKREgER8RKBEfER4RJxEeER0RJhEdERwRJREcERsRJBEbERoRIxEaERkRKxEZERgRKhEYERcRKREXERYRKBEWERURJxEVERQRJhEUERMRJRETERIRJBESERERIxERERARKxEQagL8ChEmCgkRJQlWIgkQeBBnVi4HVi0HBgURKgUEESkEAwIRKgIBESkBViTbPDARFhEkERYRFREjERURFBEiERQRExEhERMREhEgERIREREfEREREBEeERAPER0PDhEcDg0RGw0MERoMCxEZCwoRGAoJERcJCBEWCAcRFQcGERQGa2kAJgUREwUEERIEAxERAwIREAJQ/hoC/A8RKg8OESkODREoDQwRJwxWJAwQexBqCRErCQgRKQgQVwYRJAYFESQFESvbPDARFhEfERYRFREeERURFBEdERQRExEcERMREhEbERIREREaEREREBEZERAPERgPDhEXDg0RFg0MERUMCxEUCwoREwoJERIJCBERCAcREAcQb2tsA+QvpCzACpF/kyzAC+KOECzADJEpmSzADZEpkimz4uLjDYEBAfgjcPhCbVYSBFYRBFYTBFYSBFYSBFYSBFYSUUxRT1UwyFXA2zzJAhEVAlYTASBulTBZ9FowlEEz9BXiELwQJ1YRBxA2BREUBQQCERQCUA9tnm4AEhBeEE0QPEupFQDEKbMmwgCTJcIAkXDikX+aJMIAkyPCAJFw4uKORYEBAVR3ZVN2yFVAUEWBAQHPABKBAQHPAIEBAc8AAciBAQHPABKBAQHPAMkBzMkCERQCVhMBIG6VMFn0WjCUQTP0FeIREt4BVBBoEFcQRhA1RDDIVeDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAFA28A6oIQcmNhXQEREMsfHssHHMs/UAog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYYygAWgQEBzwAUgQEBzwACyIEBAc8AygASgQEBzwASgQEBzwACyIEBAc8AE4EBAc8AUAP6AhOBAQHPABPLP8lYzMkBzAP4JMADjvURFxEfERcRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPER8PDhEeDg0RHQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRHwcGER4GBQQRHAQDERsDAhEaAgERGQFWHgFWIAERHFYf2zzjDaBycwEgIG7y0IACowPCABBJECPbPKYB4DIRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEeDg0RHQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRFwcGER4GBREdBRQDERsDAhEaAgERGQERGFYdVh9WGlYf2zygAKoRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEWDg0RFQ0MERQMCxETCwoREgoJEREJCBEQCBB/EG4QXRA7SpgUAObTHwGCECM0O7S68uCB+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gDTP4EBAdcA1AHQgQEB1wAwFxYVFEMwAvKBS2n4QW8kE18DVh2qABEWESARFhEVER8RFREUER4RFBETER0RExESERwREhERERsREREQERoREA8RGQ8OERgODREXDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCESACAREfAREects8fngCEDDbPGwY2zx/fH0D9o93MNMfAYIQXdWEYbry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBVIGwTggCg9/hCVhABxwXy9CDCAI8ngEJwbXAgyMsAydAmEGgQWAQHVSDIVWDbPMkvA1YUQTMUQzBtbds8kl8D4n/gIKKphQP+AREfAaBWEKABER8BvgERHwHy9PhCERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWBBHEDZFQAMRHgMCER0CAREcAds8ggCg9wHy9PhCVhtus5JXG+MNIqSBAQFzcFMAcIF5egAUMBEaIG7y0IARGgP6Ifgjf/hCEIlWJAlWJAlWJAkHBVCDFkRAAREoAchVwNs8yRAmAREcAVJAIG6VMFn0WjCUQTP0FeJwgEB/c1RzMxA6CBEjCAcRHwcGESAGBREeBUA0cAIBESMBESUQqxB5EGcQVhBFEDQQI8hV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uvLQiYMJuvLgiM8W4iFus5V/AcoAzJRwMsoA4gH6AgHPFgH0J26zm39QCcoAF4EBAc8AmDdwUAjKABBn4hXLPxPLPwEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4oEBAc8AyFggbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4lilAQhEMNs8pgAW+gISgQEBzwDJAcwC9hEaERsRGhEZERsRGREYERsRGBEXERsRFxEWERsRFhEVERsRFREUERsRFBETERsRExESERsREhERERsREREQERsREA8RGw8OERsODREbDQwRGwwLERsLChEbCgkRGwkIERsIBxEbBwYRGwYFERsFBBEbBAMRGwPbPCDCAKeoAKL4J28QVhKhI6D4QW8kE18DoXABtgkgVhe2CFYXAaFwAlYYoRK2CQXAAZJWGpJWGeL4QW8kE18DWKEDqBKhUAOgIcIAknAy3wGhAZJWEZFw4qEBfo6OAREYAX8BchAjbW1t2zyTMFcX4hEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDqkByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAqgCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBIK2uAgEgvr8CASCvsAIBx7q7AgFmsbICGbQve2ebZ4riC+HtjjDCuQKgqZvbPBEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxJXEF8PUGdfBiBukjBtmSBu8tCAbyhvCOLCswK4qvLbPBEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8bPNsgwEgbpIwbZkgbvLQgG8tbw3iASBukjBtmSBu8tCAbyVvBeLCtgE+gQEBKAJZ9A1voZIwbd8gbpIwbY6H0Ns8bBhvCOJSYLQBptIA+kAB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');
    const __system = Cell.fromBase64('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AMhYIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuJYQgAW+gISgQEBzwDJAcwA8tMfAYIQr5O1yLry4IHSAAGS0weSbQHi0z/TP/pAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIB03/6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iAfoAVWACEDDbPGwY2zx/SUUC8oFLafhBbyQTXwNWHqoAERYRIREWERURIBEVERQRHxEUERMRHhETERIRHRESERERHBERERARGxEQDxEaDw4RGQ4NERgNDBEXDAsRIQsKESAKCREfCQgRHggHER0HBhEcBgURGwUEERoEAxEZAwIRGAIBERcBESFy2zyLRgL+AREiAaBWEKABERcBvgERFwHy9PhCERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWBBHEDZFQEMwAREfAds8ggCg9wHy9CKkgQEBdHBwIfgjf/hC+EIQeFYnCFYnCFYnCJRHBP4HEScHViZGVwQRKAQDESjIVcDbPMkQJgERHAFSQCBulTBZ9FowlEEz9BXicIBAf3RUODMQiQgRHggHESIHBhEjBgURIQUUAxEfAwJwAgERHgERJRCrEHkQZxBWEEUQNBAjyFWw2zzJJwQDERgDAhEbAhEWARRDMG1t2zwOERYOv2LESABADREVDQwRFAwLERMLChESCgkREQkIERAIVXcDBgVQRAcAmNMfAYIQ7DPMUrry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gDTf9N/0z+BAQHXANQB0IEBAdcAMBgXFhUUQzAC8oFLafhBbyQTXwNWHaoAERYRIBEWERURHxEVERQRHhEUERMRHRETERIRHBESERERGxERERARGhEQDxEZDw4RGA4NERcNDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRIAIBER8BER5y2zyLSwP+AREfAaBWEKABER8BvgERHwHy9PhCERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWBBHEDZFQAMRHgMCER0CAREcAds8ggCg9wHy9PhCVhtus5JXG+MNIqSBAQFzcFMAcJROTAP6Ifgjf/hCEIlWJAlWJAlWJAkHBVCDFkRAAREoAchVwNs8yRAmAREcAVJAIG6VMFn0WjCUQTP0FeJwgEB/c1RzMxA6CBEjCAcRHwcGESAGBREeBUA0cAIBESMBESUQqxB5EGcQVhBFEDQQI8hVsNs8ySgEAxEXAwIRFQIRGQG/Yk0BXhRDMG1t2zwPERYPDhEVDg0RFA0MERMMCxESCwoREQoJERAJEI8QflVmEEVQA0QUxAAUMBEaIG7y0IARGgDm0x8BghAjNDu0uvLggfpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA0z+BAQHXANQB0IEBAdcAMBcWFRRDMAKoMNMfAYIQ7wHCtLry4IHTP4EBAdcA0z9VIGwT+EFvJBNfA4IAoPf4QlYRAccF8vQogQEBJVn0DW+hkjBt3yBukjBtjofQ2zxsHW8N4iBukl8F4w5/wVEC/CBu8tCAby01NVszM3EnwAqRf5MnwAvijtGBS2kJViG+GfL0LoEBASxZ9A1voZIwbd8gbpIwbY4o0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wAwECUQJBAjbBVvBeIgbrOTMDM04w2OETQ1gUtpVh9WHKAYvhfy9BUT4ldSBPiBAQFtIG6SMG2OjSBu8tCAby3IVcDbPMniEC9SoCBulTBZ9FowlEEz9BXiJ8IAkTLjDUN1yFUgghChuws/UATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAIMIAjpECfyNyECNtbW3bPBERIaEREZEy4nIJv1TEUwEgIG7y0IACowPCABBJECPbPKgD+CTAA471ERcRHxEXERYRHhEWERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEfDw4RHg4NER0NDBEcDAsRGwsKERoKCREZCQgRGAgHER8HBhEeBgUEERwEAxEbAwIRGgIBERkBVh4BViABERxWH9s84w21VlUAqhEWER4RFhEVER0RFREUERwRFBETERsRExESERoREhERERkREREQERgREA8RFw8OERYODREVDQwRFAwLERMLChESCgkREQkIERAIEH8QbhBdEDtKmBQB4DIRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEeDg0RHQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRFwcGER4GBREdBRQDERsDAhEaAgERGQERGFYdVh9WGlYf2zy1AuYgbvLQgG8lJMIAkyPCAJFw4pIzM+MNIMIAkyLCAJFw4pRfAzM04w2BAQFtIG6SMG2OLSBu8tCAbyXIVUBQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyeIqED8BIG6VMFn0WjCUQTP0FeIMW1gB+gqkgA74QnBUcAAgESIRKxEiESERKhEhESARKREgER8RKBEfER4RJxEeER0RJhEdERwRJREcERsRJBEbERoRIxEaERkRKxEZERgRKhEYERcRKREXERYRKBEWERURJxEVERQRJhEUERMRJRETERIRJBESERERIxERERARKxEQWQL8DxEqDw4RKQ4NESgNDBEnDFYkDBB7EGoJESsJCBEpCBBXBhEkBgURJAURK9s8MBEWER8RFhEVER4RFREUER0RFBETERwRExESERsREhERERoREREQERkREA8RGA8OERcODREWDQwRFQwLERQLChETCgkREgkIEREIBxEQBxBvoFoAEhBeEE0QPEupFQH+PHKADfhCcFRwACARHxEtER8RHhEsER4RHRErER0RHBEqERwRGxEpERsRGhEoERoRGREnERkRGBEmERgRFxElERcRFhEkERYRFREjERURFBEiERQRExEhERMREhEgERIREREtEREREBEsERAPESsPDhEqDg0RKQ0MESgMCxEnC1wC/AoRJgoJESUJViIJEHgQZ1YuB1YtBwYFESoFBBEpBAMCESoCAREpAVYk2zwwERYRJBEWERURIxEVERQRIhEUERMRIRETERIRIBESERERHxERERARHhEQDxEdDw4RHA4NERsNDBEaDAsRGQsKERgKCREXCQgRFggHERUHBhEUBqBdACYFERMFBBESBAMREQMCERACUP4aBPb4QW8kE18DK4EBASdZ9A1voZIwbd8gbpIwbY6H0Ns8bB1vDeKBf30hbrPy9CBu8tCAby1bKsAKkX+TKsAL4uMPgV5tESizAREoAfL0ggDKxxEhVhy6AREhAfL0+EIREhEXERIREREWEREREBEVERAPERQPDhETDg0REg3BZGNfA/4MEREMCxEQCxCvEJ4QjRB8EGsQWhBJEDhHYAURIAUEESYEAxElAwIRHQIBESQB2zyCAKD3AfL0ViJus5cRIiBu8tCAlFci+ELi+EJ/gQEBVh4FVh4FVh4FVh4FVh4FViwFViUFVi0FBBEqBAMRMAMCESoCyFXA2zzJECMBESQBlL9gA/hWIAEgbpUwWfRaMJRBM/QV4ggRHggHERgHBhEdBgURFgUEERcEAxEVAwIRFAIBESEBERlwESGAQBEdfxEdEHkQZxBWEEUQNBAjyFWw2zzJVhYEAxEZAwIRFAIREwEUQzBtbds8BxEWBwYRFQYFERQFBBETBAMREgMCERECYsRhACYBERABDxBdDBA7SRoIEDdGFUMUALiCEP9X5VdQDcsfG8s/GcsHF8s/UAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYTygCBAQHPAIEBAc8AAciBAQHPABLKABLLPxKBAQHPABKBAQHPAMkBzAL+gUtpVieqABEWESoRFhEVESkRFREUESgRFBETEScRExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCESoCAREpAREocts8AREpAaBWEKABESEBvotlAviBS2lWJ6oAERYRKhEWERURKREVERQRKBEUERMRJxETERIRJhESERERJRERERARJBEQDxEjDw4RIg4NESENDBEgDAsRHwsKER4KCREdCQgRHAgHERsHBhEaBgURGQUEERgEAxEXAwIRKgIBESkBEShy2zwBESkBoAERIQG+i2UADAERKAHy9ACW0x8BghCd+g7YuvLggfpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIB0z/TP9M/gQEB1wCBAQHXAFVQAvD4QW8kE18DKIEBASRZ9A1voZIwbd8gbpIwbY6H0Ns8bB1vDeKBf30hbrPy9CBu8tCAby1bbDM0NSXACpF/kyXAC+KdgUtpVh9WHKAYvhfy9JqBS2kHVh++F/L04oFebQKzEvL0+EIRFxEfERcRFhEeERYRFREdERXBaAT8ERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEfDw4RHg4NER0NDBEcDAsRGwsKERoKCREZCQgRGAgHER8HBhEeBgURHQUEERwEAxEbAwIRGgIBERkB2zyCAKD3IZF/l/hCVhwBxwXi8vSzkXDjDZJXGuMN+EJWF26zlHFwaQT8mjARFiBu8tCAERaSVxficFYbwAqRf5RWG8AL4pRXGFcY4w2BAQFtIG6SMG2OjSBu8tCAby3IVcDbPMniECRWHgEgbpUwWfRaMJRBM/QV4lYawgCOlhEVf1YbchAjbW1t2zwBERUBERmgERSUVxVXGeIJVhShVhcCAREbAREabL/EagH8yFUgghCAPmF1UATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcvhCERSjcVYYwAqTVxh/lBEYwAviERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsLERILCRERCQgREAgQfxBuawEoEF0QTBA7EDoQSRBIEDcQNUFA2zyoAvgjgQEBViBZ9A1voZIwbd8gbpIwbY4o0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wAwECUQJBAjbBVvBeIgbrORMOMN+EIRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPbm0BkA4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1ECQDERsDVh4DAhEcAhEbAds8ERgBERcBERYBERUBERQBERMBERIBEREBERBV0bUC9iBu8tCAbyUlBcIAkwPCAJIzcOKUM1RBE94BwgCSwgCSMHDikaCRMOIgwgCOjTFWGX8ichAjbW1t2zyRMOKBAQFtIG6SMG2OLSBu8tCAbyXIVUBQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyeIQJVYgAcRvAB4gbpUwWfRaMJRBM/QV4gMAJIIAmxcRG1YXoPgjuwERGwHy9AAYVhvACpF/lFYbwAziA/QRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEeDg0RHQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRFwcGER4GBREdBQQRHAQDERsDAhEaAgERGQERGNs8+EFvJBNfA3BWHsIAkXDjDZh5cwP6kjBx3lYcwgCUVhvCAJFw4pGk3oFLaQJWGqFWFyKovhLy9IFf8lYQIqhWGgG+8vRWHcIAlFYcwgCRcOKUVxxXHOMNVhnCAJRWGMIAkXDijhIEER0EAxEcAwIRGQJXF1cXXwPjDQdWEaBy+EIREhEaERIREREZEREREBEYERB3dXQBcg8RFw8OERYODREVDQwRFAwLERMLChESCgIREQIIERAIEH8QbhBdEEwQOxCaECgQZxBWEEVANHDbPKgB/oAO+EJwVHAAIFYdViKpBBEdESMRHREcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI52AaAQvRC8EHsQagkRJQkIESQIEFcGESUGBREkBds8MAURGAUEERcEERYFERUFAxEUAwIREwIBERIBBBERBBEQEF8QPk3AEEsKEFkQOEcUBVUgBqAB/IAN+EJwVHAAIFYfKKkEER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmngBclYhChCJEHhWKAhWKAgHBhEoBgURJwUEAxEoAwIRJwIBESjbPDARGxEaERYRFREUERMREhERERBV4KAACFYdwgAAPtMfAYIQI8cvWLry4IH6ANM/0gDTf9N/03/Tf9M/VXAC9BEWER0RFhEVERwRFREUERsRFBETERoRExESERkREhERERgREREQERcREA8RHQ8OERwODREbDQwRGgwLERkLChEYCgkRFwkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCERcCAREdAREc2zz4QW8kMDGBS2kyVh2hVha+mHwB/PL0gV/yVhxWEL7y9IAM+EJwVHAAERwRIhEcERsRIREbERoRIBEaERkRHxEZERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8Qjn0C4hB9EGwQqxBaEEkEESMEViPbPDANVhegcvhCERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQAhEQAhDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNFhxcNs8oKgAOtMfAYIQapI927ry4IH6ANM/0gDTf9N/03/TP1VgA/b4QW8kE18DggCg9/hCVhEBxwXy9CqBAQElWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjigX99IW6z8vQgbvLQgG8obCIzJJqBS2kGVh++FvL0nYFLaVYfVhugF74W8vTigQEBbSBukjBtjo0gbvLQgG8oyFVw2zzJ4gIREALIxoAD2lKQIG6VMFn0WjCUQTP0FeImwgCRMuMNLcIAjpEDfy5yECNtbW3bPBETLKERE5Ez4gGRcZFy4kBTyFUgghCzBV/UUATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAIG6zkls34w2CxIEBKnEBIG7y0IAKo1RBE8IAEEtBQBPbPKgC9hEXER4RFxEWER0RFhEVERwRFREUERsRFBETERoRExESERkREhERERgREREQER4REA8RHQ8OERwODREbDQwRGgwLERkLChEYCgkRHgkIER0IBwYRGwYFERoFBBEZBAMRGAMCER4CAREdAVYaAVYcAREgVh/bPBEWER0RFrWDAJoRFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0MERMMCxESCwoREQoJERAJEI8QfhBcEEsQOkmHFgGIMNMfAYIQEoa5i7ry4IHTP9M/+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4kMwbBPbPH+FBPb4QW8kE18DKoEBASVZ9A1voZIwbd8gbpIwbY6H0Ns8bBhvCOKBf30hbrPy9CBu8tCAbyhbJeMPgV5tERizAREYAfL0+EIRExEXERMREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFnIiYiGA+QQSBA3RlAQNBAjAhEdAts8ggCg9wHy9FYdbrOXER0gbvLQgJRXHfhC4vhCf4EBAVYeBVYeBVYeBQQRHgQDER0DAhEeAshVcNs8yRAlAREWAVYbASBulTBZ9FowlEEz9BXiAREYAREZcBEcgEARGX8RGViUxocB5MhVQIIQ6JzUX1AGyx8UygASyz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwDLP8knBAMRGwMCERcCERYBFEMwbW3bPA4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAhVdxcQRl4iWMQC/oFLaVYgqgARFhEiERYRFREhERURFBEgERQRExEfERMREhEeERIREREdEREREBEcERAPERsPDhEaDg0RGQ0MERgMCxEXCwoRIgoJESEJCBEgCAcRHwcGER4GBREdBQQRHAQDERsDAhEaAgERGQERGHHbPAERGQGgVhCgAREgAb6LigL4gUtpViCqABEWESIRFhEVESERFREUESARFBETER8RExESER4REhERER0REREQERwREA8RGw8OERoODREZDQwRGAwLERcLChEiCgkRIQkIESAIBxEfBwYRHgYFER0FBBEcBAMRGwMCERoCAREZAREYcds8AREZAaABESABvouKAAwBERgB8vQBKMABklYTklYS4vhBbyTbPAGgVhKgjABkbDH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMPoAMXHXIfoAMfoAMKcDqwAC7vhBbyQTXwMqgQEBJVn0DW+hkjBt3yBukjBtjofQ2zxsGG8I4oF/fSFus/L0IG7y0IBvKFslnYFLaVYgVhygGL4X8vSagUtpB1Ygvhfy9OKBXm0Gsxby9PhCERcRHxEXERYRHhEWERURHREVERQRHBEUERMRGxETyI4C/hESERoREhERERkREREQERgREA8RHw8OER4ODREdDQwRHAwLERsLChEaCgkRGQkIERgIBxEfBwYRHgYFER0FBBEcBAMRGwMCERoCAREZAds8ggCg9yGRf5f4QlYdAccF4vL0s44SggCbFxEdVheg+CO7AREdAfL0klcc4vhCVh2UjwTgbrOaMBEcIG7y0IARHJJXHeKBAQFtIG6SMG2OjSBu8tCAbyjIVXDbPMniECdWGAEgbpUwWfRaMJRBM/QV4lYalFcYVxjjDVYVwgCOkhEaf1YWchAjbW1t2zwJVhShCZJXGuJWF5FxkXLiAgERFAERG8aSxJAB/MhVIIIQS2WKwFAEyx8SywfLP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHH4QhEUoyERExEbERMREhEaERIREREZEREREBEYERAPERcPDhEWDg0RFQ0MERQMCxETCwoREgoJEREJCBEQCBB/EG4QXRBMEGsQahBJEGheI5EBCkEEA9s8qAL++EIRFhEZERYRFREYERURFBEXERQRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnBCLEHoZEFgQRxA2XiIDERwDVh4DAhEdAhEbAds8ERkCERcCBhEWBhEVAhEUAgYREwYREgIREQIGERAGTh8QbbWTABhLHBBqSBkGRRdQRAMAQIEBCyoCcUEz9ApvoZQB1wAwkltt4iBukjBw4CBu8tCAAvQRFhEZERYRFREYERURFBEXERQRExEZERMREhEYERIREREXEREREBEZERAPERgPDhEXDg0RGQ0MERgMCxEXCwoRGQoJERgJCBEXCAcRGQcGERgGBREXBQQRGQQDERgDAhEXAgERGQERGNs8+EFvJDAxgUtpMlYZoVYXvpiWA/Ty9IFf8lYYVhG+8vQlpIEBAXD4QvgjcPhCbVYhBFYgRDTIVXDbPMkoEDoBIG6VMFn0WjCUQTP0FeIOVhigcvhCUEMCERwCVhoCERwZyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcfhCIREXERoRFxEWERkRFsarlwGOERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw0REA0QzxC+EK0QnBCLEIoQeRBYEEcQNhA0QTBw2zyoABCCAJ2wKrPy9APaMNMfAYIQc2LQnLry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFQTAxAjbBT4QlYRAccFs48oMPhCcIBCcG1TM8jLAMnQJxBqEFkECFUgyFVg2zzJFEMwFEMwbW3bPOMOf7bEmgM0LeMC0wABwAEgs+MCAdQw0NMfIpMhwAGRcOKysJsCHI6KbCHTf/oAMAHbPOMOppwDsAKSwAKSMHDijqT6ANIAAcD/AdM/0gABwP8B03/Tf9P/1DDQ03/T/9N/0/8w2zyPJzBwgEJwbVMzyMsAydAmEGkQWAQHVSDIVWDbPMlWEFUwFEMwbW3bPOKdtsQD7PhBbyQTXwOLCHAtViagE7mOElt/i+Z2FzIG5vdCBlbm91Z2iN5T6LmOFlt/jQRamV0dG9uIG5vdCBlbm91Z2iDecSbCAJMlwgCRcOKSMHLeJMIAkyPCAJFw4pGk3lYfIahS4LnjAALjAjA9CZF6koAL4lKtqQSlpJ4B/BEiESQRIhEhESMRIREgESQRIBEfESMRHxEeESQRHhEdESMRHREcESQRHBEbESMRGxEaESQRGhEZESMRGREYESQRGBEXESMRFxEWESQRFhEVESMRFREUESQRFBETESMRExESESQREhERESMREREQESQREA8RIw8OESQODREjDZ8C0AwRJAwLESMLChEkClYjUKrbPDANVhigERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4PEM4QvRCsEJsQihB5EGgQVxBGEDUQJHJAFANxcNs8oKgD5C+kLMAKkX+TLMAL4o4QLMAMkSmZLMANkSmSKbPi4uMNgQEB+CNw+EJtVhIEVhEEVhMEVhIEVhIEVhIEVhJRTFFPVTDIVcDbPMkCERUCVhMBIG6VMFn0WjCUQTP0FeIQvBAnVhEHEDYFERQFBAIRFAJQD6O/oQFUEGgQVxBGEDVEMMhV4Ns8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAUDogDqghByY2FdAREQyx8eywccyz9QCiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhjKABaBAQHPABSBAQHPAALIgQEBzwDKABKBAQHPABKBAQHPAALIgQEBzwATgQEBzwBQA/oCE4EBAc8AE8s/yVjMyQHMAMQpsybCAJMlwgCRcOKRf5okwgCTI8IAkXDi4o5FgQEBVHdlU3bIVUBQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyQIRFAJWEwEgbpUwWfRaMJRBM/QV4hES3gL8bMERGBEaERgRFxEZERcRFhEaERYRFREZERURFBEaERQRExEZERMREhEaERIREREZEREREBEaERAPERkPDhEaDg0RGQ0MERoMCxEZCwoRGgoJERkJCBEaCAcRGQcGERoGBREZBQQRGgQDERkDAhEaAgERGQERGlYZVhrbPH9wta0APmwhf40GGV4ZWN1dGlvbiBmZWUgbm90IGVub3VnaIFgC9vhBbyQTXwOLCHAkVh6gE7mOElt/i+Z2FzIG5vdCBlbm91Z2iN5TUrmOFlt/jQRamV0dG9uIG5vdCBlbm91Z2iDeI1YXuY4dW3+NBhleGVjdXRpb24gZmVlIG5vdCBlbm91Z2iDeAeMCMDMppIEBAX/4I3BtJ1E5UThSpKynA6LIVXDbPMksED4BIG6VMFn0WjCUQTP0FeIREiGgcVEwRRNUIBcdyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcSACERECECpJMBJw2zzGq6gC9hEaERsRGhEZERsRGREYERsRGBEXERsRFxEWERsRFhEVERsRFREUERsRFBETERsRExESERsREhERERsREREQERsREA8RGw8OERsODREbDQwRGwwLERsLChEbCgkRGwkIERsIBxEbBwYRGwYFERsFBBEbBAMRGwPbPCDCAKqpAX6OjgERGAF/AXIQI21tbds8kzBXF+IRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7EAKL4J28QVhKhI6D4QW8kE18DoXABtgkgVhe2CFYXAaFwAlYYoRK2CQXAAZJWGpJWGeL4QW8kE18DWKEDqBKhUAOgIcIAknAy3wGhAZJWEZFw4qEAeIIQtBfMbFAHyx8VywdQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AAfoCgQEBzwDLPwL8bCERGBEaERgRFxEZERcRFhEaERYRFREZERURFBEaERQRExEZERMREhEaERIREREZEREREBEaERAPERkPDhEaDg0RGQ0MERoMCxEZCwoRGgoJERkJCBEaCAcRGQcGERoGBREZBQQRGgQDERkDAhEaAgERGQERGlYZVhrbPH9wta0CfIBCERvbPAQRGgRBMAERGwEQNG1t2zwRFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUdrsQBQshwAcsfbwABb4xtb4wB2zxvIgHJkyFus5YBbyJZzMnoMa8AuiDXSiHXSZcgwgAiwgCxjkoDbyKAfyLPMasCoQWrAlFVtgggwgCcIKoCFdcYUDPPFkAU3llvAlNBocIAmcgBbwJQRKGqAo4SMTPCAJnUMNAg10oh10mScCDi4uhfAwT2WxEYERkRGBEXERkRFxEWERkRFhEVERkRFREUERkRFBETERkRExESERkREhERERkREREQERkREA8RGQ8OERkODREZDQwRGQwLERkLChEZCgkRGQkRGQgHBlVAVhlWGts8f3CAQogEERsEEDRtbds8ERURFhEVERQRFREUtbHEswAqAAAAAHBheWxvYWQgbm90IGV4aXN0BPYwERgRGREYERcRGREXERYRGREWERURGREVERQRGREUERMRGRETERIRGRESERERGRERERARGREQDxEZDw4RGQ4NERkNDBEZDAsRGQsKERkKCREZCREZCAcGVUBWGVYa2zx/cIBCiAQRGwQQNG1t2zwRFREWERURFBEVERS1tMSzADwRExEUERMREhETERIRERESEREREBERERAPERAPVQ4AMAAAAABjcmVhdGUgb3JkZXIgc3RvcHBlZAJYIsIAjyNycG1wIMjLAMnQEGheNBA3yFVg2zzJLwNWFEEzFEMwbW3bPJJfBOK2xADeghAPin6lUAjLHxbLP1AE+gJYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiIW6zlX8BygDMlHAyygDiAfoCAc8WBPYRFhEkERYRFREjERURFBEiERQRExEhERMREhEgERIREREfEREREBEeERAPER0PDhEcDg0RGw0MERoMCxEZCwoRGAoJERcJCBEkCAcRIwcGESIGBREhBQQRIAQDER8DAhEeAgERHQERHNs8Nzo6Ozs7Ozs7Ozs7cIqK6DC7urm4AUI+PvhCf3CAQBAjbW1t2zwKERYKEJ8Qrl4pEHoQaRBYVSPEAOYvgQEBIln0DW+hkjBt3yBukjBtjijQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAFlsEm8C4iBus44sgQELISBu8tCAbyIwAiBu8tCAbyIxEDsScSFulVtZ9FkwmMgBzwBBM/RB4giRMOKkAAggVhG5ABL4QlKwxwXy4IQB3tMfAYIQks81Zrry4IGBAQHXAPQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAPoA1AHQ+gD6APoA+gD6APoA+gDUMND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAb0AVPpAASDXSYEBC7ry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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initOrderBook_init_args({ $$type: 'OrderBook_init_args', deployId })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const OrderBook_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    11120: { message: `compensate not exist` },
    19305: { message: `gas not enough` },
    24173: { message: `order is pending` },
    24562: { message: `execution fee not enough` },
    31425: { message: `not reach unlock time` },
    32637: { message: `order not exist` },
    39703: { message: `too early` },
    40368: { message: `Contract stopped` },
    41207: { message: `invalid sender` },
    51911: { message: `token not match` },
    53296: { message: `Contract not stopped` },
}

const OrderBook_types: ABIType[] = [
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounced", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }] },
    { "name": "Deploy", "header": 2490013878, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "DeployOk", "header": 2952335191, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "FactoryDeploy", "header": 1829761339, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "cashback", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "ChangeOwner", "header": 2174598809, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "newOwner", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "ChangeOwnerOk", "header": 846932810, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "newOwner", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "TokenTransfer", "header": 260734629, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "receiver", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "responseDestination", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "customPayload", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "forwardTonAmount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forwardPayload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "TokenNotification", "header": 1935855772, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "from", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "forwardPayload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "TokenExcesses", "header": 3576854235, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "UpdateConfig", "header": 2463053158, "fields": [{ "name": "executorLength", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "executors", "type": { "kind": "dict", "key": "int", "value": "ExecutorParam", "valueFormat": "ref" } }, { "name": "compensator", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "minTimeDelayTrader", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "lpMinExecutionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "perpMinExecutionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "lpGasConsumption", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "perpGasConsumption", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "poolLpGasConsumption", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "poolPerpGasConsumption", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "minTonsForStorage", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "gasTransferJetton", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "usdtWallet", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "pool", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "SendProtocolFee", "header": 1574274145, "fields": [{ "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "feeReceiver", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "CreateDecreaseLPPositionOrder", "header": 632428324, "fields": [{ "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "liquidityDelta", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "CancelLPPositionOrder", "header": 2106714934, "fields": [{ "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "executionFeeReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }] },
    { "name": "ExecuteLPPositionOrder", "header": 310819211, "fields": [{ "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "executionFeeReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }] },
    { "name": "UpdateLPPosition", "header": 3902592095, "fields": [{ "name": "isIncrease", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "account", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "liquidityDelta", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "UpdateLPPositionSuccess", "header": 485543809, "fields": [{ "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "receive", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "CreateCompensate", "header": 2945693128, "fields": [{ "name": "orderType", "type": { "kind": "simple", "type": "uint", "optional": true, "format": 8 } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "refundReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "refundAmount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "executionFeeReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }] },
    { "name": "ExecuteOrCancelCompensate", "header": 2296903975, "fields": [{ "name": "isCancel", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "compensateId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "CreateDecreasePerpPositionOrder", "header": 1787968987, "fields": [{ "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "isLong", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "marginDelta", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "sizeDelta", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "triggerPrice", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "CreateTpSlPerpPositionOrder", "header": 600256344, "fields": [{ "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "isLong", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "tpSize", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "tpPrice", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "slSize", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "slPrice", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "CancelPerpPositionOrder", "header": 3254342642, "fields": [{ "name": "executionFeeReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "ExecutePerpPositionOrder", "header": 2650410712, "fields": [{ "name": "executionFeeReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "price", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "premiumRate", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "LiquidatePerpPosition", "header": 590625716, "fields": [{ "name": "liquidationFeeReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "account", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "isLong", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "price", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "premiumRate", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "ADLPerpPosition", "header": 3962817618, "fields": [{ "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "account", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "isLong", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "marginDelta", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "sizeDelta", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "price", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "premiumRate", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "UpdatePerpPosition", "header": 4283950423, "fields": [{ "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "opType", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "account", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "isLong", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "marginDelta", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "sizeDelta", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "triggerPrice", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "triggerAbove", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "price", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "premiumRate", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "UpdatePerpPositionSuccess", "header": 4009870004, "fields": [{ "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "receive", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "LPPositionOrderCreatedEvent", "header": 3021458540, "fields": [{ "name": "opType", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "account", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "liquidityDelta", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "orderId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "LPPositionOrderCancelledEvent", "header": 1264945856, "fields": [{ "name": "opType", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "LPPositionOrderExecutedEvent", "header": 3003473876, "fields": [{ "name": "opType", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "PerpPositionOrderCreatedEvent", "header": 1919115613, "fields": [{ "name": "opType", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "account", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "isLong", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "marginDelta", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "sizeDelta", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "triggerPrice", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "triggerAbove", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "tpSize", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "tpPrice", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "slSize", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "slPrice", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "orderId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "PerpPositionOrderCancelledEvent", "header": 2151571829, "fields": [{ "name": "opType", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "PerpPositionOrderExecutedEvent", "header": 2713389887, "fields": [{ "name": "opType", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "CompensateCreatedEvent", "header": 401001363, "fields": [{ "name": "compensateId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "orderType", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "refundReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "refundAmount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "executionFeeReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "unlockTime", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "CompensateCancelledEvent", "header": 1271087573, "fields": [{ "name": "compensateId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "CompensateExecutedEvent", "header": 3678790712, "fields": [{ "name": "compensateId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "ConfigData", "header": null, "fields": [{ "name": "isExecutor", "type": { "kind": "simple", "type": "bool", "optional": true } }, { "name": "minTimeDelayTrader", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "lpMinExecutionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "perpMinExecutionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "lpGasConsumption", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "perpGasConsumption", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "poolLpGasConsumption", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "poolPerpGasConsumption", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "minTonsForStorage", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "gasTransferJetton", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "totalExecutionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "usdtWallet", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "pool", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "ExecutorParam", "header": null, "fields": [{ "name": "executor", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "enable", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "LPPositionOrder", "header": null, "fields": [{ "name": "isIncrease", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "account", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "liquidityDelta", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "blockTime", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "isPending", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "executionFeeReceiver", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "lastOperator", "type": { "kind": "simple", "type": "address", "optional": true } }] },
    { "name": "LPPositionOrderData", "header": null, "fields": [{ "name": "lpPositionOrderIndexNext", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "lpPositionOrder", "type": { "kind": "simple", "type": "LPPositionOrder", "optional": true } }] },
    { "name": "PerpPositionOrder", "header": null, "fields": [{ "name": "opType", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "account", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "isLong", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "marginDelta", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "sizeDelta", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "triggerPrice", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "triggerAbove", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "blockTime", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "isPending", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "executionFeeReceiver", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "lastOperator", "type": { "kind": "simple", "type": "address", "optional": true } }] },
    { "name": "PerpPositionOrderEx", "header": null, "fields": [{ "name": "tpSize", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "tpPrice", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "slSize", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "slPrice", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "executionFee", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "PerpPositionOrderData", "header": null, "fields": [{ "name": "perpPositionOrderIndexNext", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "perpPositionOrder", "type": { "kind": "simple", "type": "PerpPositionOrder", "optional": true } }, { "name": "perpPositionOrderEx", "type": { "kind": "simple", "type": "PerpPositionOrderEx", "optional": true } }] },
    { "name": "UpdatePrice", "header": null, "fields": [{ "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "price", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "Compensate", "header": null, "fields": [{ "name": "orderType", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "refundReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "refundAmount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "executionFeeReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "unlockTime", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "CompensateData", "header": null, "fields": [{ "name": "compensateIndexNext", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "compensate", "type": { "kind": "simple", "type": "Compensate", "optional": true } }] },
]

const OrderBook_getters: ABIGetter[] = [
    { "name": "configData", "arguments": [{ "name": "executor", "type": { "kind": "simple", "type": "address", "optional": true } }], "returnType": { "kind": "simple", "type": "ConfigData", "optional": false } },
    { "name": "lpPositionOrder", "arguments": [{ "name": "orderId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "LPPositionOrderData", "optional": false } },
    { "name": "perpPositionOrder", "arguments": [{ "name": "orderId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "PerpPositionOrderData", "optional": false } },
    { "name": "compensate", "arguments": [{ "name": "compensateId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "CompensateData", "optional": false } },
    { "name": "stopped", "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "owner", "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
]

const OrderBook_receivers: ABIReceiver[] = [
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateConfig" } },
    { "receiver": "internal", "message": { "kind": "empty" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "TokenNotification" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "CreateDecreaseLPPositionOrder" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "CancelLPPositionOrder" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "ExecuteLPPositionOrder" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateLPPositionSuccess" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "CreateDecreasePerpPositionOrder" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "CreateTpSlPerpPositionOrder" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "CancelPerpPositionOrder" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "ExecutePerpPositionOrder" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdatePerpPositionSuccess" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "LiquidatePerpPosition" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "ADLPerpPosition" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "SendProtocolFee" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "CreateCompensate" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "ExecuteOrCancelCompensate" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Deploy" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "Resume" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "Stop" } },
]

export class OrderBook implements Contract {

    static async init(deployId: bigint) {
        return await OrderBook_init(deployId);
    }

    static async fromInit(deployId: bigint) {
        const init = await OrderBook_init(deployId);
        const address = contractAddress(0, init);
        return new OrderBook(address, init);
    }

    static fromAddress(address: Address) {
        return new OrderBook(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types: OrderBook_types,
        getters: OrderBook_getters,
        receivers: OrderBook_receivers,
        errors: OrderBook_errors,
    };

    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean | null | undefined }, message: UpdateConfig | null | TokenNotification | CreateDecreaseLPPositionOrder | CancelLPPositionOrder | ExecuteLPPositionOrder | UpdateLPPositionSuccess | CreateDecreasePerpPositionOrder | CreateTpSlPerpPositionOrder | CancelPerpPositionOrder | ExecutePerpPositionOrder | UpdatePerpPositionSuccess | LiquidatePerpPosition | ADLPerpPosition | SendProtocolFee | CreateCompensate | ExecuteOrCancelCompensate | Deploy | 'Resume' | 'Stop') {

        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateDecreaseLPPositionOrder') {
            body = beginCell().store(storeCreateDecreaseLPPositionOrder(message)).endCell();
        }
        await provider.internal(via, { ...args, body: body });

    }
}