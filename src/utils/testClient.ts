import {
  createPublicClient,
  createTestClient,
  createWalletClient,
  formatEther,
  http,
} from "viem";
import { foundry } from "viem/chains";

export const testClient = createTestClient({
  chain: foundry,
  mode: "anvil",
  transport: http(),
});

const walletClient = createWalletClient({
  transport: http("http://localhost:8545"),
});

const publicClient = createPublicClient({
  chain: foundry,
  transport: http(),
});

export const mine = async () => {
  const mine = await testClient.mine({ blocks: 1 });
};

export const getAccounts = async () => {
  const accounts = await walletClient.request({ method: "eth_accounts" });
  return accounts;
};

export const getNodeInfo = async () => {
  // const accounts = await testClient.request({ method: "anvil_nodeInfo" });
  const response = await fetch("http://127.0.0.1:8545", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: `anvil_nodeInfo`,
      params: [],
      id: 1,
    }),
  });
  const { result, error } = await response.json();
  console.log(result);
  return result as NodeInfo;
};

export const getBalance = async (address: `0x${string}`) => {
  const balance = await publicClient.getBalance({
    address,
  });

  return formatEther(balance);
};

export const getTxCount = async (address: `0x${string}`) => {
  const count = await publicClient.getTransactionCount({
    address,
  });

  return count.toString();
};

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

export type NodeInfo = {
  currentBlockNumber: string;
  currentBlockTimestamp: number;
  currentBlockHash: string;
  hardFork: string;
  transactionOrder: string;
  environment: Environment;
  forkConfig: ForkConfig;
};

export type Environment = {
  baseFee: string;
  chainId: string;
  gasLimit: string;
  gasPrice: string;
};

export type ForkConfig = {
  forkUrl: null;
  forkBlockNumber: null;
  forkRetryBackoff: null;
};
