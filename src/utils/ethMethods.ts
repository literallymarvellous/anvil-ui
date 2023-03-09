import { formatEther } from "viem";
import { NodeInfo, publicClient, walletClient } from "./clients";

export const getAccounts = async () => {
  const accounts = await walletClient.getAddresses()
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
