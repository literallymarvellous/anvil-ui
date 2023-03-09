import { testClient } from "./clients";

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

export const stopAutoMine = async () => {
  await testClient.setAutomine(false)
}

export const startAutoMine = async () => {
  await testClient.setAutomine(true)
}