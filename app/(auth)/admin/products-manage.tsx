import React, { useEffect } from "react";
import { ProductType } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { db } from "@/context/Auth";
import Link from "next/link";
import {
  collection,
  getDoc,
  limit,
  query,
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { siteConfig } from "@/config/site";

const ProductManage = () => {
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const [expanded, setExpanded] = React.useState<ProductType>();
  const [updateIsLoading, setUpdateIsLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("/api/product-database");
      const data = await res.json();
      setProducts(data.data);
    };
    getProducts();
  });

  const BATCH_SIZE = 10; // Adjust batch size based on your rate limits and performance considerations

  const Update = async () => {
    setUpdateIsLoading(true);
    const collectionRef = collection(db, "tiktokProducts");

    for (let i = 0; i < products.length; i += BATCH_SIZE) {
      const batch = products.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (product, index) => {
          console.log(i + index, "/", products.length);
          const docRef = doc(collectionRef, product.id);
          const docSnap = await getDoc(docRef);
          const docData = docSnap.data();
          if (!docData || docData.supplierInfo || !docData?.supplierId) return;
          const supplierId = docData.supplierId;
          try {
            const productInfoRes = await fetch(
              `${siteConfig.url}/api/scrape/aliexpress/${supplierId}`
            );
            if (!productInfoRes.ok) {
              console.log(
                `Failed to fetch info for product with ID ${supplierId}`
              );
              return;
            }
            const productInfo = await productInfoRes.json();
            const productInfoData = {
              supplierImages: productInfo.images,
              supplierTitle: productInfo.title,
              supplierPrice: productInfo.salePrice,
            };
            await updateDoc(docRef, {
              supplierInfo: productInfoData,
            });
          } catch (error) {
            console.error(
              `Error processing product with ID ${supplierId}: ${error}`
            );
          }
        })
      );
    }
    setUpdateIsLoading(false);
  };

  return (
    <>
      {products.length > 0 ? (
        <>
          <Button onClick={Update} className="w-fit">
            {updateIsLoading ? (
              <Icons.spinner className="animate-spin" />
            ) : null}
            Update
          </Button>
          <div className="grid grid-cols-[60%_1fr] gap-4">
            <div className="grid gap-2 ">
              <div className="grid max-h-[80vh] overflow-scroll divide-y divide-border border rounded-md max-w-full ">
                {products.map((product, i) => (
                  <div
                    onClick={() => setExpanded(product)}
                    key={i}
                    className="flex p-4 gap-4 items-center w-full cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-md relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt="no image"
                        fill
                        sizes="(max-width: 768px) 100vw,
(max-width: 1200px) 50vw,
33vw"
                      />
                    </div>
                    <h1>{product.title}</h1>

                    {product.supplierInfo ? (
                      <h1 className=" whitespace-nowrap overflow-hidden text-ellipsis bg-green-500/60 text-primary font-bold  rounded-md p-2 w-fit ">
                        Supplier Data
                      </h1>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            {expanded && <Expanded item={expanded} />}
          </div>
        </>
      ) : (
        <>loading...</>
      )}
    </>
  );
};

export default ProductManage;

interface ExpandedProps {
  item: ProductType;
}

const Expanded = ({ item }: ExpandedProps) => {
  return (
    <div className="h-full w-full border rounded-md flex flex-col p-4  items-center">
      <div className="w-40 aspect-square relative overflow-hidden rounded-md">
        <Image
          src={item.image}
          alt="no image"
          fill
          sizes="(max-width: 768px) 100vw,"
        />
      </div>
      <div className="grid gap-3 w-full">
        <UpdateFieldInput item={item} field="title" />
        <UpdateFieldInput item={item} field="supplierUrl" />
        <UpdateFieldInput item={item} field="supplierId" />
        {item.supplierInfo ? (
          <div className="grid grid-cols-4 gap-4">
            {item.supplierInfo.supplierImages.map((image, i) => (
              <div
                key={i}
                className="w-full aspect-square relative rounded-md overflow-hidden"
              >
                <Image
                  src={image}
                  alt="no image"
                  fill
                  sizes="(max-width: 768px) 100vw,"
                />
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

type UpdateFieldInputProps<T extends keyof ProductType> = {
  item: ProductType;
  field: T;
};

const UpdateFieldInput = <T extends keyof ProductType>({
  item,
  field,
}: UpdateFieldInputProps<T>) => {
  const [value, setValue] = React.useState<string>(
    (item[field] as unknown as string) || ""
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const updateField = async () => {
    setIsLoading(true);
    const collectionRef = collection(db, "tiktokProducts");
    const docRef = doc(collectionRef, item.id);
    await updateDoc(docRef, {
      [field]: value,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    setValue(item[field] as unknown as string);
  }, [value, item, field]);

  return (
    <div className="grid gap-1 items-center w-full">
      <h1>{field}</h1>
      <div className="flex gap-2 w-full">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border rounded-md p-2 w-full"
        />
        <Button onClick={updateField} className="w-fit">
          {isLoading ? <Icons.spinner className="animate-spin" /> : null}
          Update
        </Button>
      </div>
    </div>
  );
};
