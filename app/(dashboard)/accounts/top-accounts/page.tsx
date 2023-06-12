import AccountRank from "./account-rank";
import { PageHeader } from "@/components/header";
import { siteConfig } from "@/config/site";
import Loading from "./loading";
import { formatDataAsPercentChange } from "@/lib/utils";
async function getData() {
  const rankType = "followers";
  const res = await fetch(`${siteConfig.url}/api/top-accounts`, {
    cache: "no-store",
  });
  const rawData = await res.json();
  const formattedData = await formatDataAsPercentChange(rawData);
  const orderedData = formattedData
    .sort(
      (a: any, b: any) => b[rankType].percentChange - a[rankType].percentChange
    )
    .slice(0, 7);

  return orderedData;
}

export default async function TopAccounts() {
  const data = await getData();
  return (
    <>
      <PageHeader
        heading={"Top Accounts"}
        text={
          "Discover the top sellers and analyze their performance over time."
        }
      />
      <div className="w-full border-t">
        <div className="w-full container  md:pt-6  flex flex-col min-h-screen items-center  ">
          <div className="flex flex-row  w-full  h-full  gap-8  rounded-md ">
            <AccountRank data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
