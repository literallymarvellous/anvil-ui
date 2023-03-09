import { useQuery } from "@tanstack/react-query";
import AccountItem from "./AccountItem";
import { getAccounts } from "@/utils/ethMethods";

const AccountsList = () => {
  const { data: accounts } = useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts,
  });

  console.log(accounts);

  return (
    <div>
      {accounts &&
        accounts.map((account) => (
          <AccountItem account={account} key={account} />
        ))}
    </div>
  );
};

export default AccountsList;
