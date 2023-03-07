import { getNodeInfo } from "@/utils/testClient";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const AnvilInfo = () => {
  const { data: nodeInfo } = useQuery({
    queryKey: ["nodeInfo"],
    queryFn: getNodeInfo,
  });

  console.log(nodeInfo);

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
            {nodeInfo?.environment.gasPrice}
          </div>
        </div>
        <div className="flex flex-col">
          <div>Gas Limit</div>
          <div className="text-yellow-600">
            {nodeInfo?.environment.gasLimit}
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
