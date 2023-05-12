import ViewAccount from "./view-account";
import { AccountDataType } from "@/types";

const getData = async (recordId: string): Promise<AccountDataType> => {
  const res = await fetch(`http://localhost:3000/api/view-account/${recordId}`);
  console.log("res", res);
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
