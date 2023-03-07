import { getNodeInfo } from "@/utils/testClient";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const AnvilInfo = () => {
  const { data } = useQuery({ queryKey: ["nodeInfo"], queryFn: getNodeInfo });

  return (
    <div className="py-4">
      <div className="flex justify-around items-center">
        <div className="flex flex-col">
          <div>Current Block</div>
          <div className="text-yellow-600">{data?.currentBlockNumber}</div>
        </div>
        <div className="flex flex-col">
          <div>Current BlockNumber</div>
          <div className="text-yellow-600">{data?.currentBlockTimestamp}</div>
        </div>
        <div className="flex flex-col">
          <div>Gas Price</div>
          <div className="text-yellow-600">{data?.environment.gasPrice}</div>
        </div>
        <div className="flex flex-col">
          <div>Gas Limit</div>
          <div className="text-yellow-600">{data?.environment.gasLimit}</div>
        </div>
        <div className="flex flex-col">
          <div>HardFork</div>
          <div className="text-yellow-600">{data?.hardFork}</div>
        </div>
        <div className="flex flex-col">
          <div>ChainId</div>
          <div className="text-yellow-600">{data?.environment.chainId}</div>
        </div>
      </div>
    </div>
  );
};

export default AnvilInfo;
