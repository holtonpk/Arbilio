import React, { useEffect } from "react";
import { AccountDataType } from "@/types";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
const AccountManage = () => {
  // const [accountData, setAccountData] = React.useState<
  //   AccountDataType[] | undefined
  // >(dummyData);
  const [accountData, setAccountData] = React.useState<
    AccountDataType[] | undefined
  >(undefined);

  // const [expandedAccount, setExpandedAccount] = React.useState<AccountDataType>(
  //   dummyData[0]
  // );
  const [expandedAccount, setExpandedAccount] = React.useState<
    AccountDataType | undefined
  >(undefined);

  useEffect(() => {
    async function getAccountData() {
      console.log("fetching account data");
      const url = `${siteConfig.url}/api/accountDatabase`;
      const records = await fetch(url);
      const data = await records.json();
      setAccountData(data);
    }
    getAccountData();
  }, []);
  const [selectedFields, setSelectedFields] = React.useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;

    setSelectedFields((prevKeys) => {
      if (checked && !prevKeys.includes(value)) {
        return [...prevKeys, value];
      } else if (!checked && prevKeys.includes(value)) {
        return prevKeys.filter((field) => field !== value);
      }

      return prevKeys;
    });
  };

  return (
    <div className="grid grid-cols-[20%_40%_1fr] h-full">
      {accountData && expandedAccount ? (
        <>
          <div className="flex flex-col">
            <div className="w-full h-fit">
              {Object.keys(expandedAccount).map((key) => (
                <div key={key}>
                  <label>
                    <input
                      type="checkbox"
                      value={key}
                      checked={selectedFields.includes(key)}
                      onChange={handleCheckboxChange}
                    />
                    {key}
                  </label>
                </div>
              ))}
            </div>
            <div>Selected fields: {selectedFields.join(", ")}</div>
          </div>
          <div className="flex flex-col divide-y divide-border w-full max-h-[80vh] rounded-md border overflow-scroll">
            {accountData.map((account, i) => {
              return (
                <div key={i} className="flex flex-row  gap-4 items-center p-4">
                  <div className="h-10 w-10 rounded-md relative overflow-hidden">
                    <Image
                      src={account.avatar}
                      alt={account.nickname}
                      fill
                      sizes="(max-width: 768px) 100vw,
(max-width: 1200px) 50vw,
33vw"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-lg font-bold">{account.nickname}</div>
                    <div className="text-sm">{account.recordId}</div>
                    <div className="text-sm">{account.id}</div>
                  </div>

                  <Button
                    className="ml-auto"
                    onClick={() => setExpandedAccount(account)}
                  >
                    <Icons.chevronRight />{" "}
                  </Button>
                </div>
              );
            })}
          </div>
          <ExpandedAccount item={expandedAccount} />
        </>
      ) : (
        <>loading...</>
      )}
    </div>
  );
};

export default AccountManage;

interface ExpandedAccountProps {
  item: AccountDataType;
}

const ExpandedAccount = ({ item }: ExpandedAccountProps) => {
  return (
    <div className="h-full flex flex-col  items-center">
      <div className="h-20 w-20 relative rounded-md overflow-hidden">
        <Image
          src={item.avatar}
          alt={item.nickname}
          fill
          sizes="(max-width: 768px) 100vw,
(max-width: 1200px) 50vw,
33vw"
        />
      </div>
      <div className="text-lg font-bold">{item.nickname}</div>
      <div className="text-sm">{"recordID:" + item.recordId}</div>
      <div className="text-sm">{"id:" + item.id}</div>
      <div className="text-sm">{"store:" + item.bioLink}</div>
      <div className="text-sm">{"product:" + item.product?.title}</div>
      <div className="text-sm">
        {"posts:" + (item?.topPosts ? item.topPosts.length : "no posts data")}
      </div>
    </div>
  );
};
