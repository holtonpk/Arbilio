"use client";
import React from "react";
import { PageHeader } from "@/components/header";
import { Icons } from "@/components/icons";
import KeyFeatures from "@/app/(dashboard)/dashboard/key-features";
import { useUserCollections } from "@/context/user-collections";
import CollectionDisplay from "@/app/(dashboard)/accounts/account-collections/collection-display";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { CreateCollectionButton } from "@/components/buttons/create-collection-button";
import Tooltip from "@/components/ui/tooltip";
import { LinkButton } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { useUserProductTrack } from "@/context/user-product-track";
import { RemoveTrackProductButton } from "@/components/buttons/remove-track-product-button";
import Image from "next/image";
const DashboardLayout = () => {
  return (
    <div className="grid  gap-4 container">
      <div className="grid gap-4 ">
        {/* <AccountStatDisplay /> */}

        <div className="grid md:grid-cols-2 gap-8">
          <AccountCollectionDisplay />
          <ProductTrackDisplay />
        </div>
        {/* <CollectionDisplay /> */}
        {/* <KeyFeatures /> */}
      </div>
    </div>
  );
};

export default DashboardLayout;

const ProductTrackDisplay = () => {
  //   const { userCollections, loading } = useUserCollections();
  const { trackedProducts, unTrackProduct } = useUserProductTrack()!;

  const subscriptionCollectionLimit = 3;

  return (
    <div className="grid border rounded-md relative shadow-lg ">
      <div className="flex justify-between w-full">
        <div className=" p-4 rounded-md flex w-fit  h-fit items-center gap-4">
          <span className=" aspect-square p-2 h-fit rounded-md bg-theme-blue">
            <Icons.products className="h-6 w-6 text-white" />
          </span>
          <div className="flex flex-col">
            <div className="flex items-center">
              <h1 className="font-bold capitalize text-lg text-primary whitespace-nowrap">
                Tracked Products
              </h1>
              <Tooltip content="Create account to collections to easily monitor account performance">
                <div className="flex h-4 w-8 justify-center">
                  <Icons.helpCircle className="h-4 w-4 text-muted-foreground" />
                </div>
              </Tooltip>
            </div>
            <div className="absolute top-3 right-3 text-xl font-bold text-primary flex items-center w-fit ">
              {trackedProducts?.length || 0}
              <h2 className="text-muted-foreground text-sm ">
                /{subscriptionCollectionLimit}
              </h2>
            </div>
          </div>
        </div>
      </div>
      {trackedProducts && trackedProducts?.length > 0 ? (
        <div className="divide-y divide-border rounded-b-md border-t w-full bg-background">
          {trackedProducts.map((product: any, i: number) => (
            <div key={i} className="flex gap-4 items-center p-2 cursor-pointer">
              <div className="flex justify-between w-full">
                <div className="grid gap-1 grid-cols-[48px_1fr] items-center">
                  <div className="h-12 relative overflow-hidden aspect-square bg-muted rounded-md">
                    <Image
                      src={product.image}
                      layout="fill"
                      objectFit="cover"
                      alt={product.title}
                    />
                  </div>
                  <h1 className="font-semibold">{product.title}</h1>
                </div>
              </div>
              <RemoveTrackProductButton
                id={product.id}
                variant={"link"}
                className="whitespace-nowrap  text-destructive "
              >
                remove
              </RemoveTrackProductButton>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-6 pb-6">
          <EmptyPlaceholder className="w-full h-fit min-h-fit  rounded-md  px-4">
            {/* <EmptyPlaceholder.Icon name="collection" /> */}
            <EmptyPlaceholder.Title className=" mt-0">
              No products tracked
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description className="mb-4 w-full">
              Track products to monitor their performance and get insights
            </EmptyPlaceholder.Description>
            <LinkButton href={"/products/product-database"}>
              Browse Products
            </LinkButton>
          </EmptyPlaceholder>
        </div>
      )}
    </div>
  );
};

const AccountCollectionDisplay = () => {
  const { userCollections, loading } = useUserCollections();
  //   const userCollections = undefined;

  console.log("userCollections", userCollections);

  const subscriptionCollectionLimit = 5;

  return (
    <div className="flex flex-col border rounded-md relative shadow-lg">
      <div className="flex  w-full h-fit ">
        <div className=" p-4 rounded-md flex w-fit  h-fit items-center gap-4">
          <span className=" aspect-square p-2 h-fit rounded-md bg-theme-blue">
            <Icons.accounts className="h-6 w-6 text-white" />
          </span>
          <div className="flex flex-col">
            <div className="flex items-center">
              <h1 className="font-bold capitalize text-lg text-primary whitespace-nowrap">
                Accounts Collections
              </h1>
              <Tooltip content="Create account to collections to easily monitor account performance">
                <div className="flex h-4 w-8 justify-center">
                  <Icons.helpCircle className="h-4 w-4 text-muted-foreground" />
                </div>
              </Tooltip>
            </div>
            <div className="absolute top-3 right-3 text-xl font-bold text-primary flex items-center w-fit ">
              {userCollections?.length || 0}
              <h2 className="text-muted-foreground text-sm ">
                /{subscriptionCollectionLimit}
              </h2>
            </div>
          </div>
        </div>
      </div>
      {userCollections && userCollections?.length > 0 ? (
        <div className="divide-y divide-border rounded-b-md border-t h-fit w-full bg-background">
          {userCollections.map((collection: any, i: number) => (
            <CollectionDisplay key={i} collection={collection} />
          ))}
        </div>
      ) : (
        <div className="px-6 pb-6">
          <EmptyPlaceholder className="w-full h-fit min-h-fit  rounded-md  px-4">
            {/* <EmptyPlaceholder.Icon name="collection" /> */}
            <EmptyPlaceholder.Title className=" mt-0">
              No collections created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description className="mb-4 w-full">
              Create account to collections to easily monitor account
              performance
            </EmptyPlaceholder.Description>
            <CreateCollectionButton>+ New Collection</CreateCollectionButton>
          </EmptyPlaceholder>
        </div>
      )}
    </div>
  );
};

// const AccountStatDisplay = () => {
//   return (
//     <div className="flex gap-4">
//       <div className="border p-4 rounded-md flex  h-fit items-center gap-4">
//         <span className="p-2 aspect-square h-10 rounded bg-muted">
//           <Icons.accounts className="h-6 w-6 text-primary" />
//         </span>
//         <div className="flex flex-col">
//           <h1 className="font-bold capitalize text-base text-muted-foreground whitespace-nowrap">
//             Tracked accounts
//           </h1>
//           <div className="text-4xl font-bold flex items-center ">
//             16
//             <h2 className="text-muted-foreground text-xl ">/20</h2>
//           </div>
//         </div>
//       </div>
//       <div className="border p-4 rounded-md flex  h-fit items-center gap-4">
//         <span className="p-2 aspect-square h-10 rounded bg-muted">
//           <Icons.products className="h-6 w-6 text-primary" />
//         </span>
//         <div className="flex flex-col">
//           <h1 className="font-bold capitalize text-base text-muted-foreground whitespace-nowrap">
//             Tracked products
//           </h1>
//           <div className="text-4xl font-bold flex items-center ">
//             23
//             <h2 className="text-muted-foreground text-xl ">/30</h2>
//           </div>
//         </div>
//       </div>
//       <div className="border p-4 rounded-md flex  h-fit items-center gap-4">
//         <span className="p-2 aspect-square h-10 rounded bg-muted">
//           <Icons.store className="h-6 w-6 text-primary" />
//         </span>
//         <div className="flex flex-col">
//           <h1 className="font-bold capitalize text-base text-muted-foreground whitespace-nowrap">
//             Linked Stores
//           </h1>
//           <div className="text-4xl font-bold flex items-center ">
//             1<h2 className="text-muted-foreground text-xl ">/3</h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
