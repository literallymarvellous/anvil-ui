import { Address, Hash, Hex, TransactionRequestEIP1559, TransactionRequestEIP2930, TransactionRequestLegacy } from "viem";
import { testClient } from "./clients";

type Quantity = `0x${string}`

type SendUnsignedTransactionParameters = TransactionRequestLegacy<bigint, number> | TransactionRequestEIP2930<bigint, number> | TransactionRequestEIP1559<bigint, number>

export const setBalance = async ({
  address,
  value,
}: {
  address: `0x${string}`;
  value: bigint;
}) => {
  await testClient.setBalance({ address, value });
};

export const setNonce = async ({
  address,
  nonce,
}: {
  address: `0x${string}`;
  nonce: number;
}) => {
  await testClient.setNonce({ address, nonce });
};

export const setMiningInterval = async (interval: number) => {
  await testClient.setIntervalMining({ interval })
}

export const stopIntervalMinig = async () => {
  await testClient.setIntervalMining({ interval: 0 })
}

export const startIntervalMinig = async () => {
  await testClient.setIntervalMining({ interval: 1 })
}

export const setAutoMine = async (bool: boolean) => {
  await testClient.setAutomine(bool)
}

export const setNextBlockTimeStamp = async (timestamp: number) => {
  await testClient.setNextBlockTimestamp({ timestamp: BigInt(timestamp) })
}

export const setNextBlockTimeStampInterval = async (interval: number) => {
  await testClient.setBlockTimestampInterval({ interval })
}

export const setBlockGasLimit = async (gasLimit: number) => {
  await testClient.setBlockGasLimit({ gasLimit: BigInt(gasLimit) })
}

export const removeNextBlockTimeStampInterval = async (interval: number) => {
  await testClient.removeBlockTimestampInterval()
}

export const dropTransaction = async (hash: Hash) => {
  await testClient.dropTransaction({ hash })
}

export const resetNode = async ({ blockNumber, jsonRpcUrl }: {
  blockNumber?: bigint
  jsonRpcUrl?: string
}) => {
  await testClient.reset({ blockNumber, jsonRpcUrl })
}

export const setContractCode = async ({ address, bytecode }: {
  address: Address;
  bytecode: Hex;
}) => {
  await testClient.setCode({ address, bytecode })
}

export const setMinGasPrice = async (gasPrice: number) => {
  await testClient.setMinGasPrice({ gasPrice: BigInt(gasPrice) })
}

export const setRpcUrl = async (url: string) => {
  await testClient.setRpcUrl(url)
}

export const takeSnapshot = async () => {
  const snapshotId = await testClient.snapshot()
  return snapshotId
}

export const revertState = async ({ id }: {
  id: Quantity;
}) => {
  await testClient.revert({ id })
}

export const increaseTime = async ({ seconds }: { seconds: number }) => {
  await testClient.increaseTime({ seconds })
}

export const inspectTxpool = async () => {
  const txpool = await testClient.inspectTxpool()
  return txpool
}

export const getTxpoolContent = async () => {
  const txpoolContent = await testClient.getTxpoolContent()
  return txpoolContent
}

export const getTxpoolStatus = async () => {
  const txpoolStatus = await testClient.getTxpoolStatus()
  return txpoolStatus
}

export const sendUnsignedTransaction = async (tx: SendUnsignedTransactionParameters) => {
  const txResult = await testClient.sendUnsignedTransaction(tx)
  return txResult
}

export const setLoggingEnabled = async (bool: boolean) => {
  await testClient.setLoggingEnabled(bool)
}