import {
  createPublicClient,
  createTestClient,
  createWalletClient,
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
