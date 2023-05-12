import CollectionData from "./collection-data";
import Loading from "./loading";
async function getData(collectionId: string) {
  const res = await fetch(
    `http://localhost:3000/api/collection/${collectionId}`,
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
    <div className="flex flex-col gap-4 w-full ">
      <div className="w-full z-20   rounded-md  flex flex-col    ">
        <CollectionData data={data} />
      </div>
    </div>
  );
}
