import ViewAccount from "./view-account";
import { AccountDataType } from "@/types";
import { siteConfig } from "@/config/site";
import Loading from "./loading";

const getData = async (recordId: string): Promise<AccountDataType> => {
  const res = await fetch(`${siteConfig.url}/api/view-account/${recordId}`, {
    cache: "no-cache",
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
