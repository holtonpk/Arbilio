import { AccountDataType } from "@/types";
import { siteConfig } from "@/config/site";
import { ProductType } from "@/types";
import ViewProduct from "./view-product";
import { Query } from "firebase/firestore";

const getData = async (id: string): Promise<ProductType> => {
  const res = await fetch(`${siteConfig.url}/api/view-product/${id}`, {
    cache: "no-cache",
  });

  const record = await res.json();

  const accountDataRes = await fetch(
    `${siteConfig.url}/api/get-product-accounts/${id}`,
    {
      cache: "no-cache",
    }
  );
  const accountData: AccountDataType[] = await accountDataRes.json();

  // const accountPromises = record.accounts.map((account: string) =>
  //   fetch(`${siteConfig.url}/api/view-account/${account}`, {
  //     cache: "no-cache",
  //   }).then((res) => res.json())
  // );

  // const accountData: AccountDataType[] = await Promise.all(accountPromises);

  return {
    ...record,
    accountsData: accountData,
  };
};

export default async function Product({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const data = await getData(params.id);

  return <ViewProduct data={data} />;
}
