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

export const walletClient = createWalletClient({
  transport: http("http://localhost:8545"),
});

export const publicClient = createPublicClient({
  chain: foundry,
  transport: http(),
});

export const mine = async () => {
  const mine = await testClient.mine({ blocks: 1 });
};

export type NodeInfo = {
  currentBlockNumber: `0x${string}` | number;
  currentBlockTimestamp: number;
  currentBlockHash: `0x${string}` | number;
  hardFork: string;
  transactionOrder: string;
  environment: Environment;
  forkConfig: ForkConfig;
};

export type Environment = {
  baseFee: `0x${string}` | number;
  chainId: `0x${string}` | number;
  gasLimit: `0x${string}` | number;
  gasPrice: `0x${string}` | number;
};

export type ForkConfig = {
  forkUrl: string;
  forkBlockNumber: `0x${string}` | number;
  forkRetryBackoff: number;
};
