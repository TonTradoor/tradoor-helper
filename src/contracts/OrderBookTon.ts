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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
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
    pool: Address;
}

export function storeUpdateConfig(src: UpdateConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3413829863, 32);
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
        b_2.storeAddress(src.pool);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3413829863) { throw Error('Invalid prefix'); }
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
    let _pool = sc_2.loadAddress();
    return { $$type: 'UpdateConfig' as const, executorLength: _executorLength, executors: _executors, compensator: _compensator, minTimeDelayTrader: _minTimeDelayTrader, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, poolLpGasConsumption: _poolLpGasConsumption, poolPerpGasConsumption: _poolPerpGasConsumption, minTonsForStorage: _minTonsForStorage, gasTransferJetton: _gasTransferJetton, pool: _pool };
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
    let _pool = source.readAddress();
    return { $$type: 'UpdateConfig' as const, executorLength: _executorLength, executors: _executors, compensator: _compensator, minTimeDelayTrader: _minTimeDelayTrader, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, poolLpGasConsumption: _poolLpGasConsumption, poolPerpGasConsumption: _poolPerpGasConsumption, minTonsForStorage: _minTonsForStorage, gasTransferJetton: _gasTransferJetton, pool: _pool };
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
    builder.writeAddress(source.pool);
    return builder.build();
}

function dictValueParserUpdateConfig(): DictionaryValue<UpdateConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateConfig(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateConfig(src.loadRef().beginParse());
        }
    }
}

export type SendProtocolFee = {
    $$type: 'SendProtocolFee';
    trxId: bigint;
    executor: Address;
    feeReceiver: Address;
    amount: bigint;
}

export function storeSendProtocolFee(src: SendProtocolFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1574274145, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.executor);
        b_0.storeAddress(src.feeReceiver);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadSendProtocolFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1574274145) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _executor = sc_0.loadAddress();
    let _feeReceiver = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'SendProtocolFee' as const, trxId: _trxId, executor: _executor, feeReceiver: _feeReceiver, amount: _amount };
}

function loadTupleSendProtocolFee(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _executor = source.readAddress();
    let _feeReceiver = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'SendProtocolFee' as const, trxId: _trxId, executor: _executor, feeReceiver: _feeReceiver, amount: _amount };
}

function storeTupleSendProtocolFee(source: SendProtocolFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.executor);
    builder.writeAddress(source.feeReceiver);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserSendProtocolFee(): DictionaryValue<SendProtocolFee> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendProtocolFee(src)).endCell());
        },
        parse: (src) => {
            return loadSendProtocolFee(src.loadRef().beginParse());
        }
    }
}

export type CreateIncreaseLPPositionOrder = {
    $$type: 'CreateIncreaseLPPositionOrder';
    executionFee: bigint;
    liquidityDelta: bigint;
    trxId: bigint;
}

export function storeCreateIncreaseLPPositionOrder(src: CreateIncreaseLPPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1616896555, 32);
        b_0.storeCoins(src.executionFee);
        b_0.storeCoins(src.liquidityDelta);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCreateIncreaseLPPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1616896555) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadCoins();
    let _liquidityDelta = sc_0.loadCoins();
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CreateIncreaseLPPositionOrder' as const, executionFee: _executionFee, liquidityDelta: _liquidityDelta, trxId: _trxId };
}

function loadTupleCreateIncreaseLPPositionOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _liquidityDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CreateIncreaseLPPositionOrder' as const, executionFee: _executionFee, liquidityDelta: _liquidityDelta, trxId: _trxId };
}

function storeTupleCreateIncreaseLPPositionOrder(source: CreateIncreaseLPPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.liquidityDelta);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCreateIncreaseLPPositionOrder(): DictionaryValue<CreateIncreaseLPPositionOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateIncreaseLPPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateIncreaseLPPositionOrder(src.loadRef().beginParse());
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
        b_0.storeUint(2519524171, 32);
        b_0.storeCoins(src.executionFee);
        b_0.storeCoins(src.liquidityDelta);
        b_0.storeUint(src.trxId, 64);
    };
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCancelLPPositionOrder(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExecuteLPPositionOrder(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateLPPosition(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateLPPosition(src.loadRef().beginParse());
        }
    }
}

export type UpdateLPPositionSuccess = {
    $$type: 'UpdateLPPositionSuccess';
    orderId: bigint;
    receiveDelta: bigint;
    trxId: bigint;
}

export function storeUpdateLPPositionSuccess(src: UpdateLPPositionSuccess) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(485543809, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeInt(src.receiveDelta, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadUpdateLPPositionSuccess(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 485543809) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _receiveDelta = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'UpdateLPPositionSuccess' as const, orderId: _orderId, receiveDelta: _receiveDelta, trxId: _trxId };
}

function loadTupleUpdateLPPositionSuccess(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _receiveDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'UpdateLPPositionSuccess' as const, orderId: _orderId, receiveDelta: _receiveDelta, trxId: _trxId };
}

function storeTupleUpdateLPPositionSuccess(source: UpdateLPPositionSuccess) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.receiveDelta);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserUpdateLPPositionSuccess(): DictionaryValue<UpdateLPPositionSuccess> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateLPPositionSuccess(src)).endCell());
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
        b_0.storeUint(4231235453, 32);
        if (src.orderType !== null && src.orderType !== undefined) { b_0.storeBit(true).storeUint(src.orderType, 8); } else { b_0.storeBit(false); }
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.refundReceiver);
        b_0.storeCoins(src.refundAmount);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeCoins(src.executionFee);
    };
}

export function loadCreateCompensate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4231235453) { throw Error('Invalid prefix'); }
    let _orderType = sc_0.loadBit() ? sc_0.loadUintBig(8) : null;
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _refundReceiver = sc_0.loadMaybeAddress();
    let _refundAmount = sc_0.loadCoins();
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateCompensate(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExecuteOrCancelCompensate(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteOrCancelCompensate(src.loadRef().beginParse());
        }
    }
}

export type CreateIncreasePerpPositionOrder = {
    $$type: 'CreateIncreasePerpPositionOrder';
    executionFee: bigint;
    tokenId: bigint;
    isMarket: boolean;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    tpSize: bigint;
    tpPrice: bigint;
    slSize: bigint;
    slPrice: bigint;
    trxId: bigint;
}

export function storeCreateIncreasePerpPositionOrder(src: CreateIncreasePerpPositionOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3053635893, 32);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeBit(src.isMarket);
        b_0.storeBit(src.isLong);
        b_0.storeCoins(src.marginDelta);
        b_0.storeUint(src.sizeDelta, 128);
        b_0.storeUint(src.triggerPrice, 128);
        b_0.storeUint(src.tpSize, 128);
        b_0.storeUint(src.tpPrice, 128);
        b_0.storeUint(src.slSize, 128);
        let b_1 = new Builder();
        b_1.storeUint(src.slPrice, 128);
        b_1.storeUint(src.trxId, 64);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCreateIncreasePerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3053635893) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadCoins();
    let _tokenId = sc_0.loadUintBig(64);
    let _isMarket = sc_0.loadBit();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadCoins();
    let _sizeDelta = sc_0.loadUintBig(128);
    let _triggerPrice = sc_0.loadUintBig(128);
    let _tpSize = sc_0.loadUintBig(128);
    let _tpPrice = sc_0.loadUintBig(128);
    let _slSize = sc_0.loadUintBig(128);
    let sc_1 = sc_0.loadRef().beginParse();
    let _slPrice = sc_1.loadUintBig(128);
    let _trxId = sc_1.loadUintBig(64);
    return { $$type: 'CreateIncreasePerpPositionOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isMarket: _isMarket, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, trxId: _trxId };
}

function loadTupleCreateIncreasePerpPositionOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _isMarket = source.readBoolean();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CreateIncreasePerpPositionOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isMarket: _isMarket, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, trxId: _trxId };
}

function storeTupleCreateIncreasePerpPositionOrder(source: CreateIncreasePerpPositionOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.tokenId);
    builder.writeBoolean(source.isMarket);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeNumber(source.tpSize);
    builder.writeNumber(source.tpPrice);
    builder.writeNumber(source.slSize);
    builder.writeNumber(source.slPrice);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCreateIncreasePerpPositionOrder(): DictionaryValue<CreateIncreasePerpPositionOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateIncreasePerpPositionOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateIncreasePerpPositionOrder(src.loadRef().beginParse());
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
        b_0.storeUint(2740715942, 32);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeBit(src.isLong);
        b_0.storeCoins(src.marginDelta);
        b_0.storeUint(src.sizeDelta, 128);
        b_0.storeUint(src.triggerPrice, 128);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCreateDecreasePerpPositionOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2740715942) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadCoins();
    let _tokenId = sc_0.loadUintBig(64);
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadCoins();
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateDecreasePerpPositionOrder(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateTpSlPerpPositionOrder(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCancelPerpPositionOrder(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExecutePerpPositionOrder(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidatePerpPosition(src)).endCell());
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
        b_0.storeUint(3120922261, 32);
        b_0.storeUint(src.tokenId, 64);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeCoins(src.marginDelta);
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
    if (sc_0.loadUint(32) !== 3120922261) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadCoins();
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeADLPerpPosition(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdatePerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadUpdatePerpPosition(src.loadRef().beginParse());
        }
    }
}

export type UpdatePerpPositionSuccess = {
    $$type: 'UpdatePerpPositionSuccess';
    orderId: bigint;
    receiveDelta: bigint;
    trxId: bigint;
}

export function storeUpdatePerpPositionSuccess(src: UpdatePerpPositionSuccess) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4009870004, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeInt(src.receiveDelta, 257);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadUpdatePerpPositionSuccess(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4009870004) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _receiveDelta = sc_0.loadIntBig(257);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'UpdatePerpPositionSuccess' as const, orderId: _orderId, receiveDelta: _receiveDelta, trxId: _trxId };
}

function loadTupleUpdatePerpPositionSuccess(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _receiveDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'UpdatePerpPositionSuccess' as const, orderId: _orderId, receiveDelta: _receiveDelta, trxId: _trxId };
}

function storeTupleUpdatePerpPositionSuccess(source: UpdatePerpPositionSuccess) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.receiveDelta);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserUpdatePerpPositionSuccess(): DictionaryValue<UpdatePerpPositionSuccess> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdatePerpPositionSuccess(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLPPositionOrderCreatedEvent(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLPPositionOrderCancelledEvent(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLPPositionOrderExecutedEvent(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpPositionOrderCreatedEvent(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpPositionOrderCancelledEvent(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpPositionOrderExecutedEvent(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompensateCreatedEvent(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompensateCancelledEvent(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompensateExecutedEvent(src)).endCell());
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
    totalFund: bigint;
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
        b_1.storeCoins(src.totalFund);
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
    let _totalFund = sc_1.loadCoins();
    let _pool = sc_1.loadAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, minTimeDelayTrader: _minTimeDelayTrader, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, poolLpGasConsumption: _poolLpGasConsumption, poolPerpGasConsumption: _poolPerpGasConsumption, minTonsForStorage: _minTonsForStorage, gasTransferJetton: _gasTransferJetton, totalExecutionFee: _totalExecutionFee, totalFund: _totalFund, pool: _pool };
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
    let _totalFund = source.readBigNumber();
    let _pool = source.readAddress();
    return { $$type: 'ConfigData' as const, isExecutor: _isExecutor, minTimeDelayTrader: _minTimeDelayTrader, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, lpGasConsumption: _lpGasConsumption, perpGasConsumption: _perpGasConsumption, poolLpGasConsumption: _poolLpGasConsumption, poolPerpGasConsumption: _poolPerpGasConsumption, minTonsForStorage: _minTonsForStorage, gasTransferJetton: _gasTransferJetton, totalExecutionFee: _totalExecutionFee, totalFund: _totalFund, pool: _pool };
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
    builder.writeNumber(source.totalFund);
    builder.writeAddress(source.pool);
    return builder.build();
}

function dictValueParserConfigData(): DictionaryValue<ConfigData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeConfigData(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExecutorParam(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLPPositionOrder(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLPPositionOrderData(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpPositionOrder(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpPositionOrderEx(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpPositionOrderData(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdatePrice(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompensate(src)).endCell());
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
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompensateData(src)).endCell());
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
    const __code = Cell.fromBase64('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Av4REREZEREREBEYERAPER8PDhEeDg0RHQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRHwcGER4GBREdBQQRHAQDERsDAhEaAgERGQHbPIIAoPchkX+X+EJWHgHHBeLy9LOOEoIAmxcRGVYXoPgjuwERGQHy9JJXGOJWFlAGgQEB9Fowcx8D/lYbklca4w1WF8IAjqJWG26zlxEbIG7y0ICUVxv4QuJwVhhyECNtbW3bPApWFqEKklcb4lYZkXGRcuICAREVAREcyFUgghBLZYrAUATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcfhCVhmTERejk1cXcOIRFqMgmCEC/BEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkQaAcQRhA1RAMCVhkBERvbPAxWGKEGERkGDBEWDAYRFQYMERQMBhETBgwREgwGEREGDBEQDBBvEM4QbRBrChBpCAYHBZMiAawhERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAgQfxBuEF0QnBA7EJoQWRA4EEdeIljbPJUABFUhAviBS2lWIKoAERYRIhEWERURIREVERQRIBEUERMRHxETERIRHhESERERHRERERARHBEQDxEbDw4RGg4NERkNDBEYDAsRFwsKESIKCREhCQgRIAgHER8HBhEeBgURHQUEERwEAxEbAwIRGgIBERkBERhx2zwBERkBoAERGgG+cCYC/oFLaVYgqgARFhEiERYRFREhERURFBEgERQRExEfERMREhEeERIREREdEREREBEcERAPERsPDhEaDg0RGQ0MERgMCxEXCwoRIgoJESEJCBEgCAcRHwcGER4GBREdBQQRHAQDERsDAhEaAgERGQERGHHbPAERGQGgVhCgAREaAb5wJgPgEEgQN0ZQBBEYBBAj2zyCAKD3AfL0Vh1us5cRHSBu8tCAlFcd+ELi+EJ/gQEBVh8FVh8FVh8FBBEfBAMRHgMCER8CyFVw2zzJECUBERcBVhYBIG6VMFn0WjCUQTP0FeIBERkBERRwERyAQBEafxEaWHMnKAAMAREYAfL0AapQeMoAUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYTgQEBzwAB+gKBAQHPAMoAyFgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZYKQHkyFVAghDonNRfUAbLHxTKABLLPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMs/yScEAxEbAwIRGAIRFwEUQzBtbds8DhEWDg0RFQ0MERQMCxETCwoREgoJEREJCBEQCFV3ECdeMkATmABYIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuLJAcwC9BEXER4RFxEWER0RFhEVERwRFREUERsRFBETERoRExESERkREhERERgREREQER4REA8RHQ8OERwODREbDQwRGgwLERkLChEYCgkRHgkIER0IBwYRGwYFERoFBBEZBAMRGAMCER4CAREdAVYbAREZ2zwMVhqhERYRHREWky0BIg1wLnIQI21tbds8ERMsoRETmAGayFUgghCzBV/UUATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAIG6zjpdxASBu8tCAIqMLoyIEwgAQXBA1QUDbPJJbN+KVAJwRFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0REwsREgsKEREKCREQCRCPEH4QXBBLEDpJgBBXRhUAetMfAYIQtgLJNbry4IH6ANM/0gDSAPoA03/Tf9N/03/Tf9QB0NN/0z8wECwQKxAqECkQKBAnECYQJRAkECMC9BEWESIRFhEVESERFREUESARFBETER8RExESER4REhERER0REREQERwREA8RGw8OERoODREZDQwRGAwLERcLChEiCgkRIQkIESAIBxEfBwYRHgYFER0FBBEcBAMRGwMCERoCAREZAREY2zz4QW8kMDGBS2kyVhmhViGhiTAB+lYWvvL0cVYdwgCUVhzCAJFw4pIwct5WG8IAlFYawgCRcOKRpN6BX/JWECKoVhoBvvL0ESKRepKAC+L4QlYZAREkqQQRGBEiERgRFxEhERcRFhEgERYRFREfERURFBEeERQRExEdERMREhEcERIREREbEREREBEaERAPERkPMQL0DhEYDg0RFw0MERYMCxEVCwoRFAoJERMJCBESCAcREQcGERAGEF8QThA9ECwQaxoJESMJCBEkCCMQWAcQNkQVAxEkAwIRJQIB2zwwDVYXoAxWGKBy+EIRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERNlMgFsERIRFBESERERExERERAREhEQDhERDgIREAIQ3xDOEL0QrBCbEIoQeRBoEFcQRkADBQRxcNs8lQA60x8BghCjXAGmuvLggfoA0z/SAPoA03/Tf9M/VWAC9BEWER0RFhEVERwRFREUERsRFBETERoRExESERkREhERERgREREQERcREA8RHQ8OERwODREbDQwRGgwLERkLChEYCgkRFwkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCERcCAREdAREc2zz4QW8kMDGBS2kyVh2hVha+iTcCEDDbPGwY2zx/OToEyo7HMNMfAYIQwflT8rry4IEg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB0z/TP1UgbBPbPH/gIIIQnfoO2LqPCDDbPGwW2zx/4CCCEO8BwrS6QkNERQH88vSBX/JWHFYQvvL0gAz4QnBUcAARHBEiERwRGxEhERsRGhEgERoRGREfERkRGBEeERgRFxEdERcRFhEcERYRFREbERURFBEaERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOOALmEH0QbBCrEFoQSQQRIwRWI9s8MA1WF6By+EIRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERACERACEO8Q3hDNELwQqxCaEIkQeBBnEFYQRRA0EnBYcXDbPGWVAD7THwGCECPHL1i68uCB+gDTP9IA03/Tf9N/03/TP1VwA/QRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEeDg0RHQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRFwcGER4GBREdBQQRHAQDERsDAhEaAgERGQERGNs8+EFvJBNfA3BWHsIAkXDjDYk7PAAIVh3CAAP6kjBx3lYcwgCUVhvCAJFw4pGk3oFLaQJWGqFWFyKovhLy9IFf8lYQIqhWGgG+8vRWHcIAlFYcwgCRcOKUVxxXHOMNVhnCAJRWGMIAkXDijhIEER0EAxEcAwIRGQJXF1cXXwPjDQdWEaBy+EIREhEaERIREREZEREREBEYERA9Pj8B/IAN+EJwVHAAIFYfKKkEER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmkAB/oAO+EJwVHAAIFYdViKpBBEdESMRHREcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI5BAXgPERcPDhEWDg0RFQ0MERQMCxETCwoREgoCERECCBEQCBB/EG4QXRBMEDsQmhAoEGcQVhBFRDBwQANw2zyVAXJWIQoQiRB4VigIVigIBwYRKAYFEScFBAMRKAMCEScCAREo2zwwERsRGhEWERURFBETERIREREQVeBlAaAQvRC8EHsQagkRJQkIESQIEFcGESUGBREkBds8MAURGAUEERcEERYFERUFAxEUAwIREwIBERIBBBERBBEQEF8QPk3AEEsKEFkQOEcUBVUgBmUC7CeBAQEjWfQNb6GSMG3fIG6SMG2Oh9DbPGwdbw3igX99IW6z8vQgbvLQgG8tW2wzNDX4QW8kE18DJsAKkX+TJsAL4pyBS2lWH1YcoBK+8vSZgUtpAVYfvvL04oFebQOzE/L0+EIRFxEfERcRFhEeERYRFREdERWmVACa0x8BghCd+g7YuvLggSDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gHTP9M/0z+BAQHXAIEBAdcAVVAE8iqBAQEmWfQNb6GSMG3fIG6SMG2Oh9DbPGwdbw3igX99IW6z8vQgbvLQgG8tW/hBbyQTXwMrwAqRf5MrwAvi4w+BXm0RFbMBERUB8vSCAMrHESFWHboBESEB8vSCAKD3+EIRExEXERMREhEWERIREREVEREREBEUERCmRkdIBMSPTTDTHwGCEO8BwrS68uCB0z+BAQHXANM/VSBsE4IAoPf4QlYQAccF8vQngQEBJFn0DW+hkjBt3yBukjBtjofQ2zxsHW8N4iBukl8E4w5/4CCCECM0O7S64wIgghC6BX6VuqZMTU4C+IFLaVYnqgARFhEqERYRFREpERURFBEoERQRExEnERMREhEmERIRERElEREREBEkERAPESMPDhEiDg0RIQ0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEqAgERKQERKHLbPAERKQGgAREqAb5wSQL+gUtpVieqABEWESoRFhEVESkRFREUESgRFBETEScRExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwLER8LChEeCgkRHQkIERwIBxEbBwYRGgYFERkFBBEYBAMRFwMCESoCAREpAREocts8AREpAaBWEKABESoBvnBJA/wPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3ECYFESEFAxEmAwIRJwIBESUB2zwBESUB8vRWIm6zlxEiIG7y0ICUVyL4QuL4Qn+BAQFWHwVWHwVWHwVWHwVWHwVWHwVWHwVWLgUEETAEAxEqAwIRMALIVcDbPMlzdUoADAERKAHy9AP4AREeAVYgASBulTBZ9FowlEEz9BXiCBEeCAcRGQcGER0GBREXBQQRGAQDERYDAhEVAgERFAERE3ARIoBAER1/ER0QeRBnEFYQRRA0ECPIVbDbPMlWEQQDERoDAhEUAhETARRDMG1t2zwGERYGBREVBQQRFAQDERMDAhESAnaYSwA0ARERAREQEO8QXhBdECwQWxoQWUhwEFZFMwQE/iBu8tCAby01NVszM3H4QW8kE18DKMAKkX+TKMAL4o4RNTaBS2lWH1YcoBW+FPL0ECTjDVKOgQEB9FowJ8IAkTPjDUR1yFUgghChuws/UATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAKcIAkTDjDXICIG7y0IBbXF1eAhAw2zxsF9s8f09QBO6PCDDbPGwY2zx/4CCCEF3VhGG6jtkw0x8BghBd1YRhuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAVTBsFOAgghD8M4d9umxtbm8A6tMfAYIQIzQ7tLry4IEg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA0z+BAQHXANQB0IEBAdcAMBcWFRRDMALygUtp+EFvJBNfA1YdqgARFhEgERYRFREfERURFBEeERQRExEdERMREhEcERIREREbEREREBEaERAPERkPDhEYDg0RFw0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEgAgERHwERHnLbPHBRAv4BER8BoFYQoAERHwG+AREfAfL0ggCg9/hCERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1ECQDER8DAhEeAgERHQHbPAERHQHy9CGkgQEBc3BTAHAh+CN/c1ID/lYkbrOXESQgbvLQgJRXJPhC4vhCEIlWJAlWJAlWJAkHBVCDFhQCESgCyFXA2zzJECUBERwBUjAgbpUwWfRaMJRBM/QV4nCAQH9zVHMzEDoQiQgRHQgHER8HBhEgBgURHgVANHACARElAREkEKsQeRBnEFYQRRA0ECPIVbDbPMl1dlMBcCcEAxEXAwIRFQIRGwEUQzBtbds8DhEWDg0RFQ0MERQMCxETCwoREgoJEREJCBEQCFV3EGdGRUMAmAT8ERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEfDw4RHg4NER0NDBEcDAsRGwsKERoKCREZCQgRGAgHER8HBhEeBgURHQUEERwEAxEbAwIRGgIBERkB2zyCAKD3IZF/l/hCVh0BxwXi8vSzkXDjDZJXG+MN+EJWF26zc1VWVwAYVhzACpF/lFYcwAziACSCAJsXERxWF6D4I7sBERwB8vQD/powERYgbvLQgBEWklcX4nBWHMAKkX+UVhzAC+Igj1gkgQEBViFZ9A1voZIwbd8gbpIwbY4o0IEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wAwECUQJBAjbBVvBeIgbrORMOMNAREcAVYZAREc2zwMVhihDBEbklcb4lYeUAVYk1kBkCBu8tCAbyUmBcIAkwPCAJIzcOKUM1RBE94BwgCSwgCSMHDikaCRMOIgwgCOjTJWG3AjchAjbW1t2zyRMOJWH1AFgQEB9FowBJgC9oEBAfRaMFYZwgCOkhEXcFYachAjbW1t2zwRGBOgApRXF1cY4lGyoQIRGgIBERwBERvIVSCCEIA+YXVQBMsfEssHyz/LP8nIgljAAAAAAAAAAAAAAAABActnzMlw+wBy+EJWF5MRFaOTVxVw4hEZoxETERsRExESERoREphaAYQREREZEREREBEYERAPERcPDhEWDg0RFQ0MERQMCxETCwkREQkIERAIEH8QbhBdEEwQOxAqEEkQOBAnEDVEBHEB2zyVAaCBS2kBViG+8vQugQEBLFn0DW+hkjBt3yBukjBtjijQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXADAQJRAkECNsFW8F4iBus5MwNDXjDV8D9iXAA470ERcRHxEXERYRHhEWERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEfDw4RHg4NER0NDBEcDAsRGwsKERoKCREZCQgRGAgHER8HBhEeBgUEERwEAxEbAwIRGgIBERkBVh8BERzbPAxWHqHjDZNqawEgcCpyECNtbW3bPBERKKEREZgBICOjCqMEwgAQKhA1REAT2zyVAmAgbvLQgG8lJMIAkyPCAJFw4pIzM+MNIMIAkyLCAJFw4pRfAzQ14w1SjYEBAfRaMAxgYQH+NXKADfhCcFRwACARHxEtER8RHhEsER4RHRErER0RHBEqERwRGxEpERsRGhEoERoRGREnERkRGBEmERgRFxElERcRFhEkERYRFREjERURFBEiERQRExEhERMREhEgERIREREtEREREBEsERAPESsPDhEqDg0RKQ0MESgMCxEnC2IB+gOkgA74QnBUcAAgESIRKxEiESERKhEhESARKREgER8RKBEfER4RJxEeER0RJhEdERwRJREcERsRJBEbERoRIxEaERkRKxEZERgRKhEYERcRKREXERYRKBEWERURJxEVERQRJhEUERMRJRETERIRJBESERERIxERERARKxEQZAL8ChEmCgkRJQlWIgkQeBBnViEHVi4HBgURKgUEESkEAwIRKgIBESkBVivbPDARFhEkERYRFREjERURFBEiERQRExEhERMREhEgERIREREfEREREBEeERAPER0PDhEcDg0RGw0MERoMCxEZCwoRGAoJERcJCBEWCAcRFQcGERQGZWMAJgUREwUEERIEAxERAwIREAJQ/hMC/A8RKg8OESkODREoDQwRJwxWJAwQexBqCREsCQgRKggQVxBWESzbPDARFhEfERYRFREeERURFBEdERQRExEcERMREhEbERIREREaEREREBEZERAPERgPDhEXDg0RFg0MERUMCxEUCwoREwoJERIJCBERCAcREAcQbxBeEE0QPGVmA+QvpCzACpF/kyzAC+KOECzADJEpmSzADZEpkimz4uLjDYEBAfgjcPhCbVYSBFYRBFYTBFYSBFYSBFYSBFYSUUxRT1UwyFXA2zzJAhEVAlYTASBulTBZ9FowlEEz9BXiELwQJ1YRBxA2BREUBQQCERQCUA9ndWgABEupAMQpsybCAJMlwgCRcOKRf5okwgCTI8IAkXDi4o5FgQEBVHdlU3bIVUBQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyQIRFAJWEwEgbpUwWfRaMJRBM/QV4hES3gFUEGgQVxBGEDVEMMhV4Ns8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAUDaQDqghByY2FdAREQyx8eywccyz9QCiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhjKABaBAQHPABSBAQHPAALIgQEBzwDKABKBAQHPABKBAQHPAALIgQEBzwATgQEBzwBQA/oCE4EBAc8AE8s/yVjMyQHMAeIzERYRHhEWERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RHg4NER0NDBEcDAsRGwsKERoKCREZCQgRGAgHERcHBhEeBgURHQUQJAMRGwMCERoCAREZAREYVh5WHNs8DFYeoZMAqhEWER4RFhEVER0RFREUERwRFBETERsRExESERoREhERERkREREQERgREA8RFw8OERYODREVDREUCxETCwoREgoJEREJCBEQCBB/EG4QXQwQO0qYECQAmNMfAYIQugV+lbry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gD6ANN/0z+BAQHXANQB0IEBAdcAMBgXFhUUQzAC8oFLafhBbyQTXwNWHqoAERYRIREWERURIBEVERQRHxEUERMRHhETERIRHRESERERHBERERARGxEQDxEaDw4RGQ4NERgNDBEXDAsRIQsKESAKCREfCQgR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lQPyN4F6wfgjUAq+GfL0JG6zjiwEcSFukltwkbrimFAtgQEB9FowjhRSLIEBAfRaMFAqgQEB9FowEKwJCuJMzJIzM+JwI26zkyLCAJFw4uMAcCdus5MlwgCRcOKSNTbjDVJIgQEB9FowUEfIWYIQ20XkOFADyx/LP8s/yY+QkQL6MFMSIG7y0IARFxEeERcRFhEdERYRFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEeERAPER0PDhEcDg0RGw0MERoMCxEZCwoRGAoJER4JCBEdCAcRHAcGERsGBREaBQQRGQQDERgDAhEeAgERHQFWGAHbPAxWF6GTkgL6MCQHIG7y0IARFxEeERcRFhEdERYRFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEeERAPER0PDhEcDg0RGw0MERoMCxEZCwoRGAoJER4JCBEdCAcRHAcGERsGBREaBQQRGQQDERgDAhEeAgERHQFWGgHbPBEZHaGTlAFgyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcvhCBaMDo3EDbrOTBMIAkjRw4hVEQNs8lQCoERYRHREWERURHBEVERQRGxEUERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNERMLERILChERCgkREAkQjxB+EG0QXBBLEDpJFVCHASQhwgCOinBYcRAjbW1t2zyRW+KYAKIRFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0REwsREgsKEREKCREQCRCPEH4QbRBcEEsQOkmAEFcDBgUC9hEbERwRGxEaERwRGhEZERwRGREYERwRGBEXERwRFxEWERwRFhEVERwRFREUERwRFBETERwRExESERwREhERERwREREQERwREA8RHA8OERwODREcDQwRHAwLERwLChEcCgkRHAkIERwIBxEcBwYRHAYFERwFBBEcBNs8IJaXAL74J28QVhKhVhOhJKAjoPhBbyQTXwOhcAG2CSBWGLYIVhgBoXACVhmhErYJBsABklYbklYa4vhBbyQTXwNYoQOoEqFQBKAiwgCScDPfWKEhwgCScDLfAaEBklYRkXDioQGCwgCOjgERGAFwAXIQI21tbds8kzBXF+IRFREWERURFBEVERQRExEUERMREhETERIR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');
    const __system = Cell.fromBase64('te6cckECvgEAOOIAAQHAAQEFoHshAgEU/wD0pBP0vPLICwMCAWIEmwPi0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31Uc2zzy4IKxBZgE5O2i7fsBjz6AINchcCHXScIflTAg1wsf3iCCEOic1F+64wKCEP9X5Ve6jpfTHwGCEP9X5Ve68uCB0z/TB9M/VSBsE+Awf+BwIddJwh+VMCDXCx/eIIIQy3ro57rjAiDAACLXScEhsJJbf+AgghBgX+IrugYHCA0D/DDTHwGCEOic1F+68uCB0gDTP1lsEjEngQEBIln0DW+hkjBt3yBukjBtjofQ2zxsGG8I4iBukVuPQyBu8tCAbygyEEYQNUZWcIEBAVGHyFVw2zzJGhMgbpUwWfRaMJRBM/QV4idus46RByBu8tCAcIBCf1UgbW1t2zyRN+Lif6EilgPwWyWBAQEiWfQNb6GSMG3fIG6SMG2Oh9DbPGwdbw3iIG6RW49SIG7y0IBvLTIrwAOaG18LBoEBAfRaMI6gVZFwgQEBUc3IVcDbPMkQOEGAIG6VMFn0WjCUQTP0FeLiJW6zjpEFIG7y0IBwgEJ/VSBtbW3bPJE14uJ/pXGWAhAw2zxsHds8fwkKAPLTHwGCEMt66Oe68uCBgQEB1wD0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wD6ANQB0PoA+gD6APoA+gD6APoA1DDQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEQjRCMEIsQihCJAvY8ERYRIhEWERURIREVERQRIBEUERMRHxETERIRHhESERERHRERERARHBEQDxEbDw4RGg4NERkNDBEYDAsRFwsKESIKCREhCQgRIAgHER8HBhEeBgURHQUEERwEAxEbAwIRGgIBERkBERjbPDc6PDw8PDw8PDw8VheBAQGRCwH89IVvpSCREpUxbTJtAeKQjmkgbpIwbY4o0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gBZbBJvAuIgbvLQgG8iECyBAQtZcSFulVtZ9FkwmMgBzwBBM/RB4oEBAVYZQBxZ9HhvpSCUAtQwWJUxbTJtAeLoW1cXDAFi+EJwcIBAECNtbW3bPBEUERYRFBERERUREREQERQREA8REw8OERIODRERDQwREFANB5YErI6bMNMfAYIQYF/iK7ry4IH6APoA0z9VIGwT2zx/4CCCEJYs40u6jpsw0x8BghCWLONLuvLggfoA+gDTP1UgbBPbPH/gIIIQfZHrNrrjAiCCEBKGuYu6DhEVHAL0ERYRGREWERURGBEVERQRFxEUERMRGRETERIRGBESERERFxERERARGREQDxEYDw4RFw4NERkNDBEYDAsRFwsKERkKCREYCQgRFwgHERkHBhEYBgURFwUEERkEAxEYAwIRFwIBERkBERjbPPhBbyQwMYFLaTJWGaFWG6GSDwP+Vhe+8vSBX/JWGFYRvvL0JaSBAQF/+EL4I3D4Qm1WIQRWIEQ0yFVw2zzJKBA6ASBulTBZ9FowlEEz9BXiDlYYoA1WGqBx+EJaVhwCVhsCER0ayFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcfhCIREYERsRGBEXERoRFyITEAGYERYRGREWERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDhESDg0REA0QzxC+EK0QnBCbEIoQaRBYEEdeI0QwEnDbPIgC9BEWERkRFhEVERgRFREUERcRFBETERkRExESERgREhERERcREREQERkREA8RGA8OERcODREZDQwRGAwLERcLChEZCgkRGAkIERcIBxEZBwYRGAYFERcFBBEZBAMRGAMCERcCAREZAREY2zz4QW8kMDGBS2kyVhmhVhe+khID9vL0gV/yVhhWEb7y9CWkgQEBcPhC+CNw+EJtViEEViBENMhVcNs8ySgQOgEgbpUwWfRaMJRBM/QV4g5WGKBy+EJQQwIRHAJWGgIRHBnIVVDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wBx+EJwIhEYERsRGBEXERoRFyITFAB4ghC0F8xsUAfLHxXLB1ADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwAB+gKBAQHPAMs/AZoRFhEZERYRFREYERURFBEXERQRExEWERMREhEVERIREREUEREREBETERAOEREODREQDRDPEL4QrRCcEJsQihBpEFgQRxBFEDRBMHDbPIgBjDDTHwGCEH2R6za68uCB0z/TPyDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4kMwbBPbPH8WAvQpgQEBJFn0DW+hkjBt3yBukjBtjofQ2zxsGG8I4oF/fSFus/L0IG7y0IBvKFv4QW8kE18DJpyBS2lWIFYcoBK+8vSZgUtpAVYgvvL04oFebQGz8vT4QhEXER8RFxEWER4RFhEVER0RFREUERwRFBETERsRExESERoREqEXAv4REREZEREREBEYERAPER8PDhEeDg0RHQ0MERwMCxEbCwoRGgoJERkJCBEYCAcRHwcGER4GBREdBQQRHAQDERsDAhEaAgERGQHbPIIAoPchkX+X+EJWHgHHBeLy9LOOEoIAmxcRGVYXoPgjuwERGQHy9JJXGOJWFlAGgQEB9FowbxgD/lYbklca4w1WF8IAjqJWG26zlxEbIG7y0ICUVxv4QuJwVhhyECNtbW3bPApWFqEKklcb4lYZkXGRcuICAREVAREcyFUgghBLZYrAUATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcfhCVhmTERejk1cXcOIRFqMZlhsC/BEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkQaAcQRhA1RAMCVhkBERvbPAxWGKEGERkGDBEWDAYRFQYMERQMBhETBgwREgwGEREGDBEQDBBvEM4QbRBrChBpCAYHBYUaAARVIQGsIREUERwRFBETERsRExESERoREhERERkREREQERgREA8RFw8OERYODREVDQwRFAwLERMLChESCgkREQkIERAIEH8QbhBdEJwQOxCaEFkQOBBHXiJY2zyIBPqOxjDTHwGCEBKGuYu68uCB0z/TPyDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4kMwbBPbPH/gIIIQHPDPgbqOnjDTHwGCEBzwz4G68uCB0z+BAQHXANM/VSBsE9s8f+AgghC2Ask1uuMCIB0lKjAE9imBAQEkWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjigX99IW6z8vQgbvLQgG8oW/hBbyQTXwMm4w+BXm0RGbMBERkB8vT4QhETERcRExESERYREhERERUREREQERQREA8REw8OERIODRERDQwREAwQvxCuEJ0QjBB7EGoQWaEeHyEC+IFLaVYgqgARFhEiERYRFREhERURFBEgERQRExEfERMREhEeERIREREdEREREBEcERAPERsPDhEaDg0RGQ0MERgMCxEXCwoRIgoJESEJCBEgCAcRHwcGER4GBREdBQQRHAQDERsDAhEaAgERGQERGHHbPAERGQGgAREaAb5sIAL+gUtpViCqABEWESIRFhEVESERFREUESARFBETER8RExESER4REhERER0REREQERwREA8RGw8OERoODREZDQwRGAwLERcLChEiCgkRIQkIESAIBxEfBwYRHgYFER0FBBEcBAMRGwMCERoCAREZAREYcds8AREZAaBWEKABERoBvmwgAAwBERgB8vQD4BBIEDdGUAQRGAQQI9s8ggCg9wHy9FYdbrOXER0gbvLQgJRXHfhC4vhCf4EBAVYfBVYfBVYfBQQRHwQDER4DAhEfAshVcNs8yRAlAREXAVYWASBulTBZ9FowlEEz9BXiAREZAREUcBEcgEARGn8RGlhvIiQBqlB4ygBQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhOBAQHPAAH6AoEBAc8AygDIWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgjAFggbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4skBzAHkyFVAghDonNRfUAbLHxTKABLLPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMs/yScEAxEbAwIRGAIRFwEUQzBtbds8DhEWDg0RFQ0MERQMCxETCwoREgoJEREJCBEQCFV3ECdeMkATlgT0ggCg9/hCVhABxwXy9CmBAQEkWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjigX99IW6z8vQgbvLQgG8obCIz+EFvJBNfAyWZgUtpAVYfvvL0nIFLaVYfVhugEr7y9OJSf4EBAfRaMCbCAJEz4w0gwgCRPeMNApFxkXLiQFOhJigpAvQRFxEeERcRFhEdERYRFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEeERAPER0PDhEcDg0RGw0MERoMCxEZCwoRGAoJER4JCBEdCAcGERsGBREaBQQRGQQDERgDAhEeAgERHQFWGwERGds8DFYaoREWER0RFoUnAJwRFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0REwsREgsKEREKCREQCRCPEH4QXBBLEDpJgBBXRhUBIg1wLnIQI21tbds8ERMsoRETlgGayFUgghCzBV/UUATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAIG6zjpdxASBu8tCAIqMLoyIEwgAQXBA1QUDbPJJbN+KIAhAw2zxsHNs8fyssAHrTHwGCELYCyTW68uCB+gDTP9IA0gD6ANN/03/Tf9N/03/UAdDTf9M/MBAsECsQKhApECgQJxAmECUQJBAjAvQRFhEiERYRFREhERURFBEgERQRExEfERMREhEeERIREREdEREREBEcERAPERsPDhEaDg0RGQ0MERgMCxEXCwoRIgoJESEJCBEgCAcRHwcGER4GBREdBQQRHAQDERsDAhEaAgERGQERGNs8+EFvJDAxgUtpMlYZoVYhoZItAfpWFr7y9HFWHcIAlFYcwgCRcOKSMHLeVhvCAJRWGsIAkXDikaTegV/yVhAiqFYaAb7y9BEikXqSgAvi+EJWGQERJKkEERgRIhEYERcRIREXERYRIBEWERURHxEVERQRHhEUERMRHRETERIRHBESERERGxERERARGhEQDxEZDy4C9A4RGA4NERcNDBEWDAsRFQsKERQKCRETCQgREggHEREHBhEQBhBfEE4QPRAsEGsaCREjCQgRJAgjEFgHEDZEFQMRJAMCESUCAds8MA1WF6AMVhigcvhCERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETWS8BbBESERQREhERERMREREQERIREA4REQ4CERACEN8QzhC9EKwQmxCKEHkQaBBXEEZAAwUEcXDbPIgESIIQo1wBprqPCDDbPGwX2zx/4CCCECPHL1i64wIgghDB+VPyujEyNT8AOtMfAYIQo1wBprry4IH6ANM/0gD6ANN/03/TP1VgAvQRFhEdERYRFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEXERAPER0PDhEcDg0RGw0MERoMCxEZCwoRGAoJERcJCBEdCAcRHAcGERsGBREaBQQRGQQDERgDAhEXAgERHQERHNs8+EFvJDAxgUtpMlYdoVYWvpIzAfzy9IFf8lYcVhC+8vSADPhCcFRwABEcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI40AuYQfRBsEKsQWhBJBBEjBFYj2zwwDVYXoHL4QhEYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREAIREAIQ7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDQScFhxcNs8WYgCEDDbPGwY2zx/NjcAPtMfAYIQI8cvWLry4IH6ANM/0gDTf9N/03/Tf9M/VXAD9BEWER4RFhEVER0RFREUERwRFBETERsRExESERoREhERERkREREQERgREA8RFw8OER4ODREdDQwRHAwLERsLChEaCgkRGQkIERgIBxEXBwYRHgYFER0FBBEcBAMRGwMCERoCAREZAREY2zz4QW8kE18DcFYewgCRcOMNkjg5AAhWHcIAA/qSMHHeVhzCAJRWG8IAkXDikaTegUtpAlYaoVYXIqi+EvL0gV/yVhAiqFYaAb7y9FYdwgCUVhzCAJFw4pRXHFcc4w1WGcIAlFYYwgCRcOKOEgQRHQQDERwDAhEZAlcXVxdfA+MNB1YRoHL4QhESERoREhERERkREREQERgREDo8PgH8gA34QnBUcAAgVh8oqQQRHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaOwFyViEKEIkQeFYoCFYoCAcGESgGBREnBQQDESgDAhEnAgERKNs8MBEbERoRFhEVERQRExESEREREFXgWQH+gA74QnBUcAAgVh1WIqkEER0RIxEdERwRIhEcERsRIREbERoRIBEaERkRHxEZERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8Q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ghC6BX6VuqVRY2kE/iBu8tCAby01NVszM3H4QW8kE18DKMAKkX+TKMAL4o4RNTaBS2lWH1YcoBW+FPL0ECTjDVKOgQEB9FowJ8IAkTPjDUR1yFUgghChuws/UATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAKcIAkTDjDXICIG7y0IBSXmFiAaCBS2kBViG+8vQugQEBLFn0DW+hkjBt3yBukjBtjijQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXADAQJRAkECNsFW8F4iBus5MwNDXjDVMCYCBu8tCAbyUkwgCTI8IAkXDikjMz4w0gwgCTIsIAkXDilF8DNDXjDVKNgQEB9FowDFRXAf41coAN+EJwVHAAIBEfES0RHxEeESwRHhEdESsRHREcESoRHBEbESkRGxEaESgRGhEZEScRGREYESYRGBEXESURFxEWESQRFhEVESMRFREUESIRFBETESERExESESAREhERES0REREQESwREA8RKw8OESoODREpDQwRKAwLEScLVQL8ChEmCgkRJQlWIgkQeBBnViEHVi4HBgURKgUEESkEAwIRKgIBESkBVivbPDARFhEkERYRFREjERURFBEiERQRExEhERMREhEgERIREREfEREREBEeERAPER0PDhEcDg0RGw0MERoMCxEZCwoRGAoJERcJCBEWCAcRFQcGERQGWVYAJgUREwUEERIEAxERAwIREAJQ/hMB+gOkgA74QnBUcAAgESIRKxEiESERKhEhESARKREgER8RKBEfER4RJxEeER0RJhEdERwRJREcERsRJBEbERoRIxEaERkRKxEZERgRKhEYERcRKREXERYRKBEWERURJxEVERQRJhEUERMRJRETERIRJBESERERIxERERARKxEQWAL8DxEqDw4RKQ4NESgNDBEnDFYkDBB7EGoJESwJCBEqCBBXEFYRLNs8MBEWER8RFhEVER4RFREUER0RFBETERwRExESERsREhERERoREREQERkREA8RGA8OERcODREWDQwRFQwLERQLChETCgkREgkIEREIBxEQBxBvEF4QTRA8WV0D5C+kLMAKkX+TLMAL4o4QLMAMkSmZLMANkSmSKbPi4uMNgQEB+CNw+EJtVhIEVhEEVhMEVhIEVhIEVhIEVhJRTFFPVTDIVcDbPMkCERUCVhMBIG6VMFn0WjCUQTP0FeIQvBAnVhEHEDYFERQFBAIRFAJQD1pxWwDEKbMmwgCTJcIAkXDikX+aJMIAkyPCAJFw4uKORYEBAVR3ZVN2yFVAUEWBAQHPABKBAQHPAIEBAc8AAciBAQHPABKBAQHPAMkBzMkCERQCVhMBIG6VMFn0WjCUQTP0FeIREt4BVBBoEFcQRhA1RDDIVeDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAFA1wA6oIQcmNhXQEREMsfHssHHMs/UAog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYYygAWgQEBzwAUgQEBzwACyIEBAc8AygASgQEBzwASgQEBzwACyIEBAc8AE4EBAc8AUAP6AhOBAQHPABPLP8lYzMkBzAAES6kD9iXAA470ERcRHxEXERYRHhEWERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEfDw4RHg4NER0NDBEcDAsRGwsKERoKCREZCQgRGAgHER8HBhEeBgUEERwEAxEbAwIRGgIBERkBVh8BERzbPAxWHqHjDYVfYAHiMxEWER4RFhEVER0RFREUERwRFBETERsRExESERoREhERERkREREQERgREA8RFw8OER4ODREdDQwRHAwLERsLChEaCgkRGQkIERgIBxEXBwYRHgYFER0FECQDERsDAhEaAgERGQERGFYeVhzbPAxWHqGFAKoRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEWDg0RFQ0RFAsREwsKERIKCRERCQgREAgQfxBuEF0MEDtKmBAkASBwKnIQI21tbds8EREooRERlgEgI6MKowTCABAqEDVEQBPbPIgCEDDbPGwX2zx/ZGUA6tMfAYIQIzQ7tLry4IEg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA0z+BAQHXANQB0IEBAdcAMBcWFRRDMALygUtp+EFvJBNfA1YdqgARFhEgERYRFREfERURFBEeERQRExEdERMREhEcERIREREbEREREBEaERAPERkPDhEYDg0RFw0MESAMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQDERcDAhEgAgERHwERHnLbPGxmAv4BER8BoFYQoAERHwG+AREfAfL0ggCg9/hCERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1ECQDER8DAhEeAgERHQHbPAERHQHy9CGkgQEBc3BTAHAh+CN/b2cD/lYkbrOXESQgbvLQgJRXJPhC4vhCEIlWJAlWJAlWJAkHBVCDFhQCESgCyFXA2zzJECUBERwBUjAgbpUwWfRaMJRBM/QV4nCAQH9zVHMzEDoQiQgRHQgHER8HBhEgBgURHgVANHACARElAREkEKsQeRBnEFYQRRA0ECPIVbDbPMlxc2gBcCcEAxEXAwIRFQIRGwEUQzBtbds8DhEWDg0RFQ0MERQMCxETCwoREgoJEREJCBEQCFV3EGdGRUMAlgTujwgw2zxsGNs8f+AgghBd1YRhuo7ZMNMfAYIQXdWEYbry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFUwbBTgIIIQ/DOHfbpqa3V2AJjTHwGCELoFfpW68uCB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA+gDTf9M/gQEB1wDUAdCBAQHXADAYFxYVFEMwAvKBS2n4QW8kE18DVh6qABEWESERFhEVESARFREUER8RFBETER4RExESER0REhERERwREREQERsREA8RGg8OERkODREYDQwRFwwLESELChEgCgkRHwkIER4IBxEdBwYRHAYFERsFBBEaBAMRGQMCERgCAREXAREhcts8bG4BKMABklYTklYS4vhBbyTbPAGgVhKgbQBkbDH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMPoAMXHXIfoAMfoAMKcDqwAC/AERIgGgVhCgAREXAb4BERcB8vSCAKD3+EIRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDUQJAERIAHbPAERIAHy9CGkgQEBdHBwIfgjf/hC+EIQeFYnCG9wAECBAQsqAnFBM/QKb6GUAdcAMJJbbeIgbpIwcOAgbvLQgAP+VicIVicIBxEnB1YmRlcEESgEAxEoyFXA2zzJECUBERwBUjAgbpUwWfRaMJRBM/QV4nCAQH90VDgzEHkIER4IBxEiBwYRIwYFESEFFAMRHwMCcAIBER4BER0QqxB5EGcQVhBFEDQQI8hVsNs8ySYEAxEYAwIREwIRFgEUQzBtbXFzdAHcUM3LBxrLP1AIINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFsoAFIEBAc8AEoEBAc8AAciBAQHPABLKAFj6AhKBAQHPABLKAFgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIUANyAF4gbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4slYzMkBzAC4ghD/V+VXUA3LHxvLPxnLBxfLP1AFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WE8oAgQEBzwCBAQHPAAHIgQEBzwASygASyz8SgQEBzwASgQEBzwDJAcwBXNs8DREWDQwRFQwLERQLChETCgkREgkIEREIBxEQBxBvEF4QTRA8S6kXEFZAAwSWAmIzggCg9/hCVhABxwXy9CLCAI6OcCNyECNtbW3bPFDuoQ2SMDHicHCAQhAjbW1t2zx/lpYEOo8IMNs8bBfbPH/gIIIQiOf5J7rjAiCCEJRqmLa6d3l/iwH20x8BghD8M4d9uvLggdIAAZLTB5JtAeLTP9M/INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAeAAEVWAD9oIAoPf4QlYQxwXy9PhBbyQwMYFLaTJWHb7y9CekgQEB+COCA/SAoFRpkFRpkFRpkFKQyFVw2zzJKhA8ASBulTBZ9FowlEEz9BXi+COCA/SAoBkYFxYVFEMwyFWA2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcvhCcHp8fgH0J26zm39QCcoAF4EBAc8AmDdwUAjKABBn4hXLPxPLPwEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4oEBAc8AyFggbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4lh7ABb6AhKBAQHPAMkBzAG0ghAX5suTUArLHxjLPyZus5p/AcoAFoEBAc8AljZwUAbKAOIUyz8Syz8BIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuKBAQHPAMhYfQBqIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuJY+gISgQEBzwDJAcwBDiAQRXFw2zyIA8ow0x8BghCI5/knuvLggdIA0z/TP1UgbBOCAKD3+EIsxwXy9IFLafhBbyQTXwNWGVYWoL7y9CSBAQEjWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjigStwIW6z8vQgbvLQgG8oCuMPf7eAgQF+XwcyUgSBAQH0WjBQM8hZghBLw0HVUAPLH8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAcvhCcCBxcNs8iAPyN4F6wfgjUAq+GfL0JG6zjiwEcSFukltwkbrimFAtgQEB9FowjhRSLIEBAfRaMFAqgQEB9FowEKwJCuJMzJIzM+JwI26zkyLCAJFw4uMAcCdus5MlwgCRcOKSNTbjDVJIgQEB9FowUEfIWYIQ20XkOFADyx/LP8s/yYKEhwL6MFMSIG7y0IARFxEeERcRFhEdERYRFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEeERAPER0PDhEcDg0RGw0MERoMCxEZCwoRGAoJER4JCBEdCAcRHAcGERsGBREaBQQRGQQDERgDAhEeAgERHQFWGAHbPAxWF6GFgwCoERYRHREWERURHBEVERQRGxEUERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNERMLERILChERCgkREAkQjxB+EG0QXBBLEDpJFVCHAvowJAcgbvLQgBEXER4RFxEWER0RFhEVERwRFREUERsRFBETERoRExESERkREhERERgREREQER4REA8RHQ8OERwODREbDQwRGgwLERkLChEYCgkRHgkIER0IBxEcBwYRGwYFERoFBBEZBAMRGAMCER4CAREdAVYaAds8ERkdoYWGASQhwgCOinBYcRAjbW1t2zyRW+KWAKIRFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0REwsREgsKEREKCREQCRCPEH4QbRBcEEsQOkmAEFcDBgUBYMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AHL4QgWjA6NxA26zkwTCAJI0cOIVREDbPIgC9hEbERwRGxEaERwRGhEZERwRGREYERwRGBEXERwRFxEWERwRFhEVERwRFREUERwRFBETERwRExESERwREhERERwREREQERwREA8RHA8OERwODREcDQwRHAwLERwLChEcCgkRHAkIERwIBxEcBwYRHAYFERwFBBEcBNs8IImKAL74J28QVhKhVhOhJKAjoPhBbyQTXwOhcAG2CSBWGLYIVhgBoXACVhmhErYJBsABklYbklYa4vhBbyQTXwNYoQOoEqFQBKAiwgCScDPfWKEhwgCScDLfAaEBklYRkXDioQGCwgCOjgERGAFwAXIQI21tbds8kzBXF+IRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ6WAmSOqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gwACRMOMNcJWMArT5ASCC8GyPRPRf7bTN/tTejbFKpbE61V1DD3WdBmkhC3TEj+Pfuo6GMNs8f9sx4ILwvPr3dpB8cZzI03nY8ZSqqifoyihxzVkXgXIfIVpFRQG6joXbPH/bMeCNkAQQ2zzbPDlwiBqRjo+UAA6CANAwKvL0ABYAAAAAUmVzdW1lZAQQ2zzbPDl/iBqRkpOUABL4QlKwxwXy4IQAEIIAnbAqs/L0ABYAAAAAU3RvcHBlZAEO+EIBf23bPJUBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8lgHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wCXAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAUDI+EMBzH8BygARFxEWERURFBETERIREREQVeDbPMntVJkB5gERFgERF4EBAc8AAREUAYEBAc8AARESAYEBAc8AERDIgQEBzwAfgQEBzwAdgQEBzwALyIEBAc8AGoEBAc8AGIEBAc8ABsiBAQHPABWBAQHPAFADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFiaANYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSygAS9ABQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhP0ABTLPxT0AAXI9AAWyz8W9AAWyz/JWMzJUAPMyVADzMlYzMkBzAIBIJyuAgEgnakCASCepwIBZp+jAqCpm9s8ERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXElcQXw9QZ18GIG6SMG2ZIG7y0IBvKG8I4rGgAT6BAQEoAln0DW+hkjBt3yBukjBtjofQ2zxsGG8I4lJgoQGm0gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA+gCBAQHXANIA1AHQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGiAHQg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIxECgQJxAmECUQJBAjAriq8ts8ERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxs82yDASBukjBtmSBu8tCAby1vDeIBIG6SMG2ZIG7y0IBvJW8F4rGkAbwlgQEBIln0DW+hkjBt3yBukjBtjofQ2zxsHW8N4oEBAVRGE1n0DW+hkjBt3yBukjBtjijQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXADAQJRAkECNsFW8F4iRZpQHM0wfTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gCBAQHXAIEBAdcA1AHQgQEB1wDSAPoAgQEB1wDSAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1DDQpgB0INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iMRB9EHwQexB6EHkQeAIZtC97Z5tniuIL4e2OMLGoAAIpAgHHqqwC0KrhIG6SMG2OHCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Iji2zwRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPGzdPT09PT09PT09PVWSsasAem0hbrOOHDCBAQsBIG7y0IAqWXFBM/QKb6GUAdcAMJJbbeKRMeJWF1YRVhFWGVYZVhlWGVYZVhlWF1YXVhcCGKkd2zzbPFcQXw9scbGtAAIqAgEgr7sCASCwuQKhtEK7Z4IiwiLiIsIioiLCIqIigiKiIoIiYiKCImIiQiJiIkIiIiJCIiIiAiIiIgHiIgHqodtniuJK4gvh6gzr4MQN0kYNsyQN3loQDeUN4RxQsbYCoO1E0NQB+GPSAAGOrts8VxcRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7g+CjXCwqDCbry4ImBAQHXAAEB0ds8srQBxoEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wCBAQHXANQw0IEBAdcAgQEB1wCBAQHXANQw0IEBAdcAgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQw0LMA0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gD0BPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9ATTP/QE1DDQ9ATTP/QE0z8wERQRFxEUERQRFhEUERQRFREUAaIwgQC0ggpiWgCCEAVdSoBcggiYloCCCcnDgIIK+vCAghAF9eEAcCBtbXFtbSJtIfhC+EJwgQEL+EJ/JhBOIW6VW1n0WTCYyAHPAEEz9EHiU7u1AGzIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAsQOkeJEDZeQAEBPoEBASMCWfQNb6GSMG3fIG6SMG2Oh9DbPGwYbwjiUhC3AfTSAAGVgQEB1wCSbQHi0z/TPyDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gGBAQHXANQB0CDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gH6AIEBAbgAGtcAMBA4EDcQNhA1EDQB3bd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4TsunLVmnZbmdB0s2yjN0UkE4UfSBfLbAqhHRd4I7ZzXo5cE4SJg0M1N0Uhs/cCPfAqjHxMLoAJIJwQM51aecV+dJQsB1hbiZHsgIBSLy9ABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVViZ2o4cHZkSzV0bnh1SmVGZVh0d2JlTmNVWEhVWTNGUFZmaVFIWm5ib0RYggb/Qu/w==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initOrderBook_init_args({ $$type: 'OrderBook_init_args', deployId })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const OrderBook_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
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
    { "name": "UpdateConfig", "header": 3413829863, "fields": [{ "name": "executorLength", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "executors", "type": { "kind": "dict", "key": "int", "value": "ExecutorParam", "valueFormat": "ref" } }, { "name": "compensator", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "minTimeDelayTrader", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "lpMinExecutionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "perpMinExecutionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "lpGasConsumption", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "perpGasConsumption", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "poolLpGasConsumption", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "poolPerpGasConsumption", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "minTonsForStorage", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "gasTransferJetton", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "pool", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "SendProtocolFee", "header": 1574274145, "fields": [{ "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "executor", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "feeReceiver", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "CreateIncreaseLPPositionOrder", "header": 1616896555, "fields": [{ "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "liquidityDelta", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "CreateDecreaseLPPositionOrder", "header": 2519524171, "fields": [{ "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "liquidityDelta", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "CancelLPPositionOrder", "header": 2106714934, "fields": [{ "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "executionFeeReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }] },
    { "name": "ExecuteLPPositionOrder", "header": 310819211, "fields": [{ "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "executionFeeReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }] },
    { "name": "UpdateLPPosition", "header": 3902592095, "fields": [{ "name": "isIncrease", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "account", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "liquidityDelta", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "UpdateLPPositionSuccess", "header": 485543809, "fields": [{ "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "receiveDelta", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "CreateCompensate", "header": 4231235453, "fields": [{ "name": "orderType", "type": { "kind": "simple", "type": "uint", "optional": true, "format": 8 } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "refundReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "refundAmount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "executionFeeReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }] },
    { "name": "ExecuteOrCancelCompensate", "header": 2296903975, "fields": [{ "name": "isCancel", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "compensateId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "CreateIncreasePerpPositionOrder", "header": 3053635893, "fields": [{ "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "isMarket", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "isLong", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "marginDelta", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "sizeDelta", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "triggerPrice", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "tpSize", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "tpPrice", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "slSize", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "slPrice", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "CreateDecreasePerpPositionOrder", "header": 2740715942, "fields": [{ "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "isLong", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "marginDelta", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "sizeDelta", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "triggerPrice", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "CreateTpSlPerpPositionOrder", "header": 600256344, "fields": [{ "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "isLong", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "tpSize", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "tpPrice", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "slSize", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "slPrice", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "CancelPerpPositionOrder", "header": 3254342642, "fields": [{ "name": "executionFeeReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "ExecutePerpPositionOrder", "header": 2650410712, "fields": [{ "name": "executionFeeReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "price", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "premiumRate", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "LiquidatePerpPosition", "header": 590625716, "fields": [{ "name": "liquidationFeeReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "account", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "isLong", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "price", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "premiumRate", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "ADLPerpPosition", "header": 3120922261, "fields": [{ "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "account", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "isLong", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "marginDelta", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "sizeDelta", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 128 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "price", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "premiumRate", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "UpdatePerpPosition", "header": 4283950423, "fields": [{ "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "opType", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "account", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "isLong", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "marginDelta", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "sizeDelta", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "triggerPrice", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "triggerAbove", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "price", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "premiumRate", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "UpdatePerpPositionSuccess", "header": 4009870004, "fields": [{ "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "receiveDelta", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "LPPositionOrderCreatedEvent", "header": 3021458540, "fields": [{ "name": "opType", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "account", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "liquidityDelta", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "orderId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "LPPositionOrderCancelledEvent", "header": 1264945856, "fields": [{ "name": "opType", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "LPPositionOrderExecutedEvent", "header": 3003473876, "fields": [{ "name": "opType", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "PerpPositionOrderCreatedEvent", "header": 1919115613, "fields": [{ "name": "opType", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "account", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "isLong", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "marginDelta", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "sizeDelta", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "triggerPrice", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "triggerAbove", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "tpSize", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "tpPrice", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "slSize", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "slPrice", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "orderId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "PerpPositionOrderCancelledEvent", "header": 2151571829, "fields": [{ "name": "opType", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "PerpPositionOrderExecutedEvent", "header": 2713389887, "fields": [{ "name": "opType", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "CompensateCreatedEvent", "header": 401001363, "fields": [{ "name": "compensateId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "orderType", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "orderId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "refundReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "refundAmount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "executionFeeReceiver", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "executionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "unlockTime", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "CompensateCancelledEvent", "header": 1271087573, "fields": [{ "name": "compensateId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "CompensateExecutedEvent", "header": 3678790712, "fields": [{ "name": "compensateId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "trxId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "ConfigData", "header": null, "fields": [{ "name": "isExecutor", "type": { "kind": "simple", "type": "bool", "optional": true } }, { "name": "minTimeDelayTrader", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "lpMinExecutionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "perpMinExecutionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "lpGasConsumption", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "perpGasConsumption", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "poolLpGasConsumption", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "poolPerpGasConsumption", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "minTonsForStorage", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "gasTransferJetton", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "totalExecutionFee", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "totalFund", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "pool", "type": { "kind": "simple", "type": "address", "optional": false } }] },
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
    { "receiver": "internal", "message": { "kind": "typed", "type": "CreateIncreaseLPPositionOrder" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "CreateDecreaseLPPositionOrder" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "CancelLPPositionOrder" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "ExecuteLPPositionOrder" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateLPPositionSuccess" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "CreateIncreasePerpPositionOrder" } },
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

    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean | null | undefined }, message: UpdateConfig | null | CreateIncreaseLPPositionOrder | CreateDecreaseLPPositionOrder | CancelLPPositionOrder | ExecuteLPPositionOrder | UpdateLPPositionSuccess | CreateIncreasePerpPositionOrder | CreateDecreasePerpPositionOrder | CreateTpSlPerpPositionOrder | CancelPerpPositionOrder | ExecutePerpPositionOrder | UpdatePerpPositionSuccess | LiquidatePerpPosition | ADLPerpPosition | SendProtocolFee | CreateCompensate | ExecuteOrCancelCompensate | Deploy | 'Resume' | 'Stop') {

        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateDecreaseLPPositionOrder') {
            body = beginCell().store(storeCreateDecreaseLPPositionOrder(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }

        await provider.internal(via, { ...args, body: body });

    }
}