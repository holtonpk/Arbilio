import ViewAccount from "./view-account";
import { AccountDataType } from "@/types";
import { siteConfig } from "@/config/site";
import Loading from "./loading";

// export async function getStaticPaths() {
//   const res = await fetch(`${siteConfig.url}/api/accountDatabase`);
//   const data = await res.json();
//   const paths = data.map((item: AccountDataType) => ({
//     params: { id: item.id },
//   }));

//   return { paths, fallback: true };
// }

const getData = async (id: string): Promise<AccountDataType> => {
  console.log("id====>", id);
  const res = await fetch(`${siteConfig.url}/api/view-account/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export default async function Account({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const data = await getData(params.id);
  return <ViewAccount data={data} />;
}

// export async function generateStaticParams() {
//   const res = await fetch(`${siteConfig.url}/api/get-all-accounts`);
//   const data = await res.json();

//   return data.map((item: AccountDataType) => ({
//     item,
//   }));
// }
