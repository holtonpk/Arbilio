import CollectionData from "./collection-data";
import { siteConfig } from "@/config/site";
import Loading from "./loading";
async function getData(collectionId: string) {
  const res = await fetch(
    `${siteConfig.url}/api/accounts/collection/${collectionId}`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function CollectionPage({
  params,
}: {
  params: { collectionId: string };
}) {
  const data = await getData(params.collectionId);

  console.log("data", data);

  return (
    <div className="w-full container   flex flex-col min-h-screen items-center  ">
      <div className="flex flex-col gap-4 w-full ">
        <div className="w-full z-20   rounded-md  flex flex-col    ">
          <CollectionData data={data} />
        </div>
      </div>
    </div>
  );
}
