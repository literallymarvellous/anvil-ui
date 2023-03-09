import { NodeInfo } from "@/utils/clients";
import { getNodeInfo } from "@/utils/ethMethods";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";
import { fromHex } from "viem";

const AnvilInfo = () => {
  const { data: nodeInfo } = useQuery({
    queryKey: ["nodeInfo"],
    queryFn: getNodeInfo,
    select: useCallback(
      (data: NodeInfo) => ({
        ...data,
        currentBlockNumber: fromHex(
          data.currentBlockNumber as `0x${string}`,
          "number"
        ),
        currentBlockHash: fromHex(
          data.currentBlockHash as `0x${string}`,
          "number"
        ),
        environment: {
          baseFee: fromHex(data.environment.baseFee as `0x${string}`, "number"),
          chainId: fromHex(data.environment.chainId as `0x${string}`, "number"),
          gasLimit: fromHex(
            data.environment.gasLimit as `0x${string}`,
            "number"
          ),
          gasPrice: fromHex(
            data.environment.gasPrice as `0x${string}`,
            "number"
          ),
        },
      }),
      []
    ),
  });

  return (
    <div className="py-4">
      <div className="flex justify-around items-center">
        <div className="flex flex-col">
          <div>Current Block</div>
          <div className="text-yellow-600">{nodeInfo?.currentBlockNumber}</div>
        </div>
        <div className="flex flex-col">
          <div>Current BlockNumber</div>
          <div className="text-yellow-600">
            {nodeInfo?.currentBlockTimestamp}
          </div>
        </div>
        <div className="flex flex-col">
          <div>Gas Price</div>
          <div className="text-yellow-600">
            {nodeInfo?.environment.gasPrice.toLocaleString("en-US")} wei
          </div>
        </div>
        <div className="flex flex-col">
          <div>Block Gas Limit</div>
          <div className="text-yellow-600">
            {nodeInfo?.environment.gasLimit.toLocaleString("en-US")} uints
          </div>
        </div>
        <div className="flex flex-col">
          <div>HardFork</div>
          <div className="text-yellow-600">{nodeInfo?.hardFork}</div>
        </div>
        <div className="flex flex-col">
          <div>ChainId</div>
          <div className="text-yellow-600">{nodeInfo?.environment.chainId}</div>
        </div>
      </div>
    </div>
  );
};

export default AnvilInfo;
