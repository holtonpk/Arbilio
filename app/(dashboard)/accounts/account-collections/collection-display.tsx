import Link from "next/link";
import { Icons } from "@/components/icons";
import Image from "next/image";
import { CollectionType } from "@/types";
import { CollectionOperations } from "@/components/buttons/collection-operations";
import { siteConfig } from "@/config/site";

interface CollectionDisplayProps {
  collection: CollectionType;
}

const CollectionDisplay = ({ collection }: CollectionDisplayProps) => {
  return (
    <div className="flex items-center justify-between p-4 relative overflow-hidden group">
      <Link
        href={`accounts/account-collections/collection/${collection.id}`}
        className="w-full h-full absolute group-hover:bg-muted top-0 left-0 z-0 "
      />
      <div className="flex w-fit items-center gap-4 ">
        <div className="grid gap-1 relative z-10 pointer-events-none">
          <h1 className=" font-bold ">{collection.name}</h1>
          <p className="text-sm text-muted-foreground ">
            {`${collection.ids.length} accounts`}
          </p>
        </div>
        <div>
          {collection.first3Items && (
            <div className="flex justify-center space-x-[-10px]">
              {collection.first3Items.map((item: any, i: number) => (
                <Link
                  href={`${siteConfig.url}/accounts/account/${item.id}`}
                  key={i}
                  className="aspect-square  relative h-10 overflow-hidden rounded-full bg-muted border flex items-center justify-center hover:z-30"
                >
                  <Image
                    src={item.avatar}
                    alt="img"
                    fill
                    sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                  />
                </Link>
              ))}
              <span className="aspect-square text-sm relative h-10 overflow-hidden rounded-full bg-muted border flex items-center justify-center pointer-events-none">
                {`+${collection.ids.length - 3}`}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="h-fit w-fit relative z-10">
        <CollectionOperations collection={collection} variant="outline">
          <Icons.ellipsis className="h-4 w-4" />
        </CollectionOperations>
      </div>
    </div>
  );
};

export default CollectionDisplay;
