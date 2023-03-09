import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Dialog from "@radix-ui/react-dialog";
import { XSquare } from "lucide-react";
import { useState } from "react";
import { parseEther } from "viem";
import { setBalance, setNonce } from "@/utils/anvilMethods";
import { getBalance, getTxCount } from "@/utils/ethMethods";

const setInfo = async ({
  address,
  balance,
  nonce,
}: {
  address: `0x${string}`;
  balance?: string;
  nonce?: string;
}) => {
  if (balance && nonce) {
    await setBalance({ address, value: parseEther(balance as `${number}`) });
    await setNonce({ address, nonce: parseInt(nonce) });
  } else if (balance) {
    await setBalance({
      address,
      value: parseEther(balance as `${number}`),
    });
  } else if (nonce) {
    await setNonce({ address, nonce: parseInt(nonce) });
  }
};

const AccountItem = ({ account }: { account: `0x${string}` }) => {
  const queryClient = useQueryClient();

  const { data: accountInfo } = useQuery({
    queryKey: ["accountInfo", account],
    queryFn: async () => {
      const balance = await getBalance(account);
      const txCount = await getTxCount(account);

      return { balance, txCount };
    },
  });

  const accountInfoMutation = useMutation({
    mutationFn: (info: {
      address: `0x${string}`;
      balance?: string;
      nonce?: string;
    }) => setInfo(info),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accountInfo", account] });
    },
  });
  const [balance, setBalance] = useState("");
  const [nonce, setNonce] = useState("");

  return (
    <Dialog.Root>
      <Dialog.Trigger className="w-full">
        <div className="flex justify-around items-center py-2 hover:cursor-pointer">
          <div className="flex flex-col w-1/2">
            <div className="text-left">Address</div>
            <div className="text-left">{account}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-left">Balance</div>
            <div className="text-left">{accountInfo?.balance} ETH</div>
          </div>
          <div className="flex flex-col">
            <div className="text-left">Transaction Count</div>
            <div className="text-left">{accountInfo?.txCount}</div>
          </div>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-black m-0 text-[17px] font-medium">
            Manage Account
          </Dialog.Title>
          <Dialog.Description className="text-black mt-[10px] mb-5 text-[15px] leading-normal">
            Set Account balance and nonce
          </Dialog.Description>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-gray-600 w-[90px] text-right text-[15px]"
              htmlFor="name"
            >
              Balance
            </label>
            <input
              className="text-black shadow-violet7 bg-gray-200 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="name"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder={`${accountInfo?.balance} ETH`}
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-gray-600 w-[90px] text-right text-[15px]"
              htmlFor="username"
            >
              Nonce
            </label>
            <input
              className="text-black shadow-violet7 bg-gray-200  focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="username"
              value={nonce}
              onChange={(e) => setNonce(e.target.value)}
              placeholder={accountInfo?.txCount}
            />
          </fieldset>

          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                className="bg-blue-200 text-black hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                onClick={() => {
                  accountInfoMutation.mutate({
                    address: account,
                    balance,
                    nonce,
                  });
                }}
              >
                Make Changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-black hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <XSquare />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AccountItem;
