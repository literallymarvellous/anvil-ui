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
