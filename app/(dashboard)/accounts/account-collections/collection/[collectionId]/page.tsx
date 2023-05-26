import CollectionData from "./collection-data";
import { siteConfig } from "@/config/site";
import Loading from "./loading";
import { Icons } from "@/components/icons";
import { LinkButton } from "@/components/ui/link";
import { CollectionOperations } from "@/components/buttons/collection-operations";

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
    <>
      <div className="flex gap-4  w-full items-center justify-between container mb-4">
        <div className="flex flex-row items-center gap-2">
          <LinkButton
            variant="ghost"
            href="/accounts/account-collections"
            className="w-fit "
            size="sm"
          >
            <Icons.chevronLeft className=" h-6 w-6" />
          </LinkButton>

          <h1 className="text-3xl h-fit  font-bold flex items-center text-primary  pb-0">
            {/* <Icons.collection className="h-8 w-8 mr-2" /> */}
            {data.collection.name}
          </h1>
        </div>
        <CollectionOperations collection={data.collection} variant="outline">
          <Icons.ellipsis className="h-5 w-5" />
        </CollectionOperations>
      </div>

      <div className="w-full border-t bg-muted/60">
        <div className="w-full container   pt-4  flex flex-col min-h-screen items-center  ">
          <CollectionData data={data} />
        </div>
      </div>
    </>
  );
}
