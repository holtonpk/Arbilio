import { AccountDataType } from "@/types";
import { siteConfig } from "@/config/site";
import { ProductType } from "@/types";
import ViewProduct from "./view-product";
import Loading from "./loading";
const getData = async (recordId: string): Promise<ProductType> => {
  const res = await fetch(`${siteConfig.url}/api/view-product/${recordId}`, {
    cache: "no-cache",
  });
  const record = await res.json();
  const productInfoId = getAliIdFromUrl(record?.supplierUrl);
  const productInfo = await fetch(
    `${siteConfig.url}/api/scrape/aliexpress/${productInfoId}`
  );

  const accountData: AccountDataType[] = [];
  for (const account of record.accounts) {
    const res = await fetch(`${siteConfig.url}/api/view-account/${account}`, {
      cache: "no-cache",
    });
    const data: AccountDataType = await res.json();
    accountData.push(data);
  }

  return {
    ...record,
    productInfo: await productInfo.json(),
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

  return <>{data ? <ViewProduct data={data} /> : <div>loading...</div>}</>;
}

function getAliIdFromUrl(url: string): string {
  const match = url.match(/\/item\/(\d+)\.html/);
  return match ? match[1] : "";
}
