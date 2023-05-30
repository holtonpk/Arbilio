import React, { useEffect, useState } from "react";
import { AccountStatsType, PostType, ProductType } from "@/types";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { Icons } from "@/components/icons";
import { db } from "@/context/Auth";
import { downloadImageAndUploadToFirebase } from "./data-scrape";
import { storage } from "@/config/data-storage";
import {
  collection,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  getDocs,
  onSnapshot,
  addDoc,
  query,
  where,
  deleteField,
  deleteDoc,
} from "firebase/firestore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogAction,
} from "@/components/ui/dialog";
import { LinkButton } from "@/components/ui/link";
import { Input } from "@/components/ui/input";

interface AccountDataType {
  accountStats: AccountStatsType[];
  avatar: string;
  id: string;
  secUid: string;
  posts: any;
  product: string;
  topPosts: PostType[] | undefined;
  uniqueId: string;
  userInfo: any;
  storeUrl: string;
}

const AccountManage = () => {
  const [accountData, setAccountData] = React.useState<AccountDataType[]>([]);
  const [expanded, setExpanded] = React.useState<AccountDataType | undefined>(
    undefined
  );
  const [failedScrapes, setFailedScrapes] = React.useState<string[]>([]);
  const [products, setProducts] = React.useState<ProductType[]>([]);

  useEffect(() => {
    const collectionRef = collection(db, "tiktokProducts");
    const q = query(collectionRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newProducts = snapshot.docs.map((doc) =>
        doc.data()
      ) as ProductType[];
      setProducts(newProducts);
    });

    // Cleanup function that will be called when the component unmounts
    return () => unsubscribe();
  });

  useEffect(() => {
    const q = query(collection(db, storage.accounts));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newAccounts = snapshot.docs.map((doc) => doc.data()) as any;
      setAccountData(newAccounts);
    });

    // Cleanup function that will be called when the component unmounts
    return () => unsubscribe();
  });

  useEffect(() => {
    const q = query(collection(db, "tiktokBadAccounts"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newAccounts = snapshot.docs.map((doc) => doc.data().id) as any;
      setFailedScrapes(newAccounts);
    });

    // Cleanup function that will be called when the component unmounts
    return () => unsubscribe();
  });

  useEffect(() => {
    if (expanded) {
      accountData.forEach((account) => {
        if (account.id === expanded.id) {
          setExpanded(account);
        }
      });
    }
  }, [accountData, expanded]);

  const [activeFilters, setActiveFilters] = React.useState<Filters[]>([]);

  type Filters =
    | "failedScrapes"
    | "topPosts"
    | "accountStats"
    | "product"
    | "storeUrl";

  const handleFilterChange = (filter: Filters) => {
    if (filter === "failedScrapes") {
      if (activeFilters.includes("failedScrapes")) {
        setActiveFilters(
          activeFilters.filter((item) => item !== "failedScrapes")
        );
      } else {
        setActiveFilters([...activeFilters, "failedScrapes"]);
      }
    } else {
      if (activeFilters.includes(filter)) {
        setActiveFilters(activeFilters.filter((item) => item !== filter));
      } else {
        setActiveFilters([...activeFilters, filter]);
      }
    }
  };

  const [badAccounts, setBadAccounts] = useState<AccountDataType[]>([]);
  const [goodAccounts, setGoodAccounts] = useState<AccountDataType[]>([]);

  const [hiddenList, setHiddenList] = useState<string[]>([]);

  useEffect(() => {
    if (activeFilters.length > 0) {
      const bad = accountData?.filter((account) => {
        if (
          activeFilters.includes("failedScrapes") &&
          failedScrapes.includes(account.id)
        ) {
          return true;
        }

        for (const filter of activeFilters) {
          if (filter !== "failedScrapes") {
            if (
              account[filter] === undefined ||
              account[filter] === null ||
              (filter !== "product" || "storeUrl"
                ? account[filter]?.length === 0
                : account[filter] === "")
            ) {
              return true;
            }
          }
        }

        return false;
      });

      const good = accountData?.filter((account) => {
        if (
          activeFilters.includes("failedScrapes") &&
          failedScrapes.includes(account.id)
        ) {
          return false;
        }

        for (const filter of activeFilters) {
          if (filter !== "failedScrapes") {
            if (
              account[filter] === undefined ||
              account[filter] === null ||
              (filter !== "product" || "storeUrl"
                ? account[filter]?.length === 0
                : account[filter] === "")
            ) {
              return false;
            }
          }
        }

        return true;
      });

      const filteredBad = bad.filter(
        (account) => !hiddenList.includes(account.id)
      );

      setBadAccounts(filteredBad);
      setGoodAccounts(good);
    } else {
      setGoodAccounts(accountData);
    }
  }, [accountData, activeFilters, failedScrapes, hiddenList]);

  const [updateIsLoading, setUpdateIsLoading] = React.useState<boolean>(false);

  const ConvertPosts = async () => {
    setUpdateIsLoading(true);
    const collectionRef = collection(db, storage.accounts);
    const BATCH_SIZE = 10;
    for (let i = 0; i < accountData.length; i += BATCH_SIZE) {
      const batch = accountData.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (account, index) => {
          console.log(i + index, "/", accountData.length);
          const docRef = doc(collectionRef, account.id);
          const docSnap = await getDoc(docRef);
          const docData = docSnap.data();
          if (!docData) return;
          if (docData?.topPosts) {
            try {
              const NewPostIDs = docData.topPosts.map(async (post: any) => {
                const postRef = doc(db, storage.posts, post);
                const postSnap = await getDoc(postRef);
                const postData = postSnap.data();
                return postData?.postId;
              });
              const NewPosts = await Promise.all(NewPostIDs);
              console.log(docData.id, NewPosts);
              await updateDoc(docRef, {
                ...docData,
                topPosts: NewPosts,
              });
            } catch (error) {
              console.log("error:", docData);
            }
          } else {
            console.log("no Posts");
          }
        })
      );
    }
    setUpdateIsLoading(false);
  };

  const UpdateAll = async () => {
    setUpdateIsLoading(true);
    const collectionRef = collection(db, "tiktok-posts-test");
    const BATCH_SIZE = 10;
    const res = await getDocs(collectionRef);
    const postData = res.docs;
    for (let i = 0; i < postData.length; i += BATCH_SIZE) {
      const batch = postData.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (account, index) => {
          console.log(i + index, "/", accountData.length);
          const docRef = doc(collectionRef, account.id);
          const docSnap = await getDoc(docRef);
          const docData = docSnap.data();
          try {
            const newDocRef = doc(collection(db, storage.posts), account.id);
            await setDoc(newDocRef, docData);
          } catch (error) {
            console.log("error:", docData);
          }
        })
      );
    }
    setUpdateIsLoading(false);
  };

  const addNew = async () => {
    setUpdateIsLoading(true);
    await UpdateAll();
    setUpdateIsLoading(false);
  };

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex gap-4  items-center">
          <input
            type="checkbox"
            checked={activeFilters.includes("failedScrapes")}
            onChange={() => handleFilterChange("failedScrapes")}
          />
          <label>Failed Scrapes</label>
          <input
            type="checkbox"
            checked={activeFilters.includes("topPosts")}
            onChange={() => handleFilterChange("topPosts")}
          />
          <label>No Top Posts</label>
          <input
            type="checkbox"
            checked={activeFilters.includes("accountStats")}
            onChange={() => handleFilterChange("accountStats")}
          />
          <label>No Stats</label>
          <input
            type="checkbox"
            checked={activeFilters.includes("product")}
            onChange={() => handleFilterChange("product")}
          />
          <label>No Product</label>
          <input
            type="checkbox"
            checked={activeFilters.includes("storeUrl")}
            onChange={() => handleFilterChange("storeUrl")}
          />
          <label>Store Url</label>
        </div>
        <Button onClick={addNew} variant="outline" className="w-fit">
          {updateIsLoading ? <Icons.spinner className="animate-spin" /> : null}
          update all
        </Button>
      </div>
      <div
        className={`grid gap-4 ${
          expanded && badAccounts.length > 0
            ? "grid-cols-[30%_30%_1fr]"
            : expanded
            ? "grid-cols-[60%_1fr]"
            : badAccounts.length > 0
            ? "grid-cols-[50%_50%]"
            : null
        }`}
      >
        {accountData.length > 0 ? (
          <>
            {goodAccounts && goodAccounts.length > 0 && (
              <div
                className={`"flex flex-col divide-y  w-full max-h-[80vh] rounded-md border overflow-scroll 
              ${
                activeFilters.length > 0
                  ? "divide-green-500 border-green-500"
                  : null
              }
              `}
              >
                <div className="h-fit p-2 flex z-10 text-lg sticky top-0 w-full bg-muted">
                  {goodAccounts.length}
                </div>

                {goodAccounts.map((account, i) => {
                  return (
                    <div
                      onClick={() => setExpanded(account)}
                      key={i}
                      className={`${
                        expanded && expanded.id == account.id
                          ? "bg-muted"
                          : "hover:bg-muted"
                      }  flex flex-row  gap-4 items-center p-4 cursor-pointer`}
                    >
                      <div className="h-10 w-10 rounded-md relative overflow-hidden">
                        <Image src={account.avatar} alt={"img"} fill />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-lg font-bold">
                          {account.uniqueId}
                        </div>
                        <div className="text-sm">{account.id}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {badAccounts && badAccounts.length > 0 && (
              <div className="flex flex-col divide-y  divide-destructive border-destructive w-full max-h-[80vh] rounded-md border overflow-scroll">
                <div className="h-fit p-2 flex z-30 text-lg sticky top-0 w-full bg-muted">
                  {badAccounts.length}
                  {hiddenList.length > 0 && (
                    <>{" hiding " + hiddenList.length}</>
                  )}

                  <Button
                    onClick={() => setHiddenList([])}
                    variant={"ghost"}
                    className="ml-auto"
                    size={"xsm"}
                  >
                    clear
                  </Button>
                </div>

                {badAccounts.map((account, i) => {
                  const remove = () => {
                    setHiddenList([...hiddenList, account.id]);
                  };

                  return (
                    <div
                      key={i}
                      className={`${
                        expanded && expanded.id == account.id
                          ? "bg-muted"
                          : "group-"
                      }  flex flex-row relative gap-2 items-center p-4 pl-0 cursor-pointer`}
                    >
                      <Button
                        onClick={remove}
                        variant={"ghost"}
                        className="relative z-20"
                      >
                        X
                      </Button>
                      <div
                        onClick={() => setExpanded(account)}
                        className="absolute w-full h-full z-10 group hover:bg-muted left-0 top-0 "
                      ></div>

                      <div className="h-10 w-10 rounded-md relative z-20 overflow-hidden pointer-events-none">
                        <Image src={account.avatar} alt={"img"} fill />
                      </div>
                      <div className="flex flex-col relative z-20 pointer-events-none">
                        <div className="text-lg font-bold">
                          {account.uniqueId}
                        </div>
                        <div className="text-sm">{account.id}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {expanded && (
              <div
                className={`${
                  activeFilters.length > 0
                    ? goodAccounts.includes(expanded)
                      ? "border-green-500"
                      : "border-destructive"
                    : null
                } h-full w-full border rounded-md flex flex-col p-4  items-center relative`}
              >
                <Button
                  className="absolute top-4 left-4"
                  variant="outline"
                  onClick={() => setExpanded(undefined)}
                >
                  X
                </Button>
                <Expanded
                  item={expanded}
                  products={products}
                  setExpanded={setExpanded}
                />
              </div>
            )}
          </>
        ) : (
          <>loading...</>
        )}
      </div>
    </>
  );
};

export default AccountManage;

interface expandedProps {
  item: AccountDataType;
  products: ProductType[];
  setExpanded: React.Dispatch<
    React.SetStateAction<AccountDataType | undefined>
  >;
}

const Expanded = ({ item, products, setExpanded }: expandedProps) => {
  const getUrlWithProtocol = (url: string) => {
    try {
      return new URL(url).href;
    } catch {
      return `https://${url}`;
    }
  };

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const handleDelete = async () => {
    //  delete doc
    const docRef = doc(db, storage.accounts, item.id);
    await deleteDoc(docRef);
    setExpanded(undefined);
  };

  return (
    <>
      <div className="h-full flex flex-col w-full items-center">
        <div className="h-20 w-20 relative rounded-md overflow-hidden">
          <Image src={item.avatar} alt={"img"} fill />
        </div>
        <div className="absolute grid gap-4 grid-cols-2 top-4 right-4">
          <LinkButton
            href={`https://www.tiktok.com/@${item.uniqueId}`}
            target="_blank"
            className="text-sm  "
          >
            <Icons.profile className="w-4 h-4" />
          </LinkButton>
          {item.storeUrl && (
            <LinkButton
              href={getUrlWithProtocol(item.storeUrl)}
              target="_blank"
              className="text-sm "
            >
              <Icons.store className="w-4 h-4" />
            </LinkButton>
          )}
        </div>
        <Button
          onClick={() => setShowDeleteAlert(true)}
          className="absolute bottom-4 right-4"
          variant={"destructive"}
        >
          Delete
        </Button>
        <UpdateFieldInput item={item} field="id" />
        <UpdateFieldInput item={item} field="uniqueId" />
        <UpdateFieldInput item={item} field="secUid" />
        <UpdateFieldInput item={item} field="storeUrl" />
        <ProductDisplay
          productId={item.product}
          products={products}
          accountId={item.id}
        />
      </div>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this account?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

const ProductDisplay = ({
  accountId,
  productId,
  products,
}: {
  accountId: string;
  productId: string;
  products: ProductType[];
}) => {
  const [productData, setProductData] = useState<ProductType>();

  const [showMenu, setShowMenu] = useState(false);
  const [createProduct, setCreateProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId || productId === "") {
        setProductData(undefined);
      } else {
        const docRef = doc(db, "tiktokProducts", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setProductData(docSnap.data() as ProductType);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    };
    fetchProduct();
  }, [productId]);

  const addProductToAccount = async (product: ProductType) => {
    const docRef = doc(db, storage.accounts, accountId);
    await updateDoc(docRef, {
      product: product.id,
    });
    setShowMenu(false);
  };

  const titleRef = React.useRef<HTMLInputElement>(null);
  const supplierUrlRef = React.useRef<HTMLInputElement>(null);
  const imageUrlRef = React.useRef<HTMLInputElement>(null);

  const createNewProduct = async () => {
    setIsLoading(true);
    if (
      !supplierUrlRef.current?.value ||
      supplierUrlRef.current?.value === "" ||
      titleRef.current?.value === ""
    )
      return;

    const docRef = await addDoc(collection(db, "tiktokProducts"), {
      title: titleRef.current?.value,
      supplierUrl: supplierUrlRef.current?.value,
    });

    if (images) {
      const image = await downloadImageAndUploadToFirebase(
        "products",
        images[0],
        docRef.id
      );
      await updateDoc(docRef, {
        image: image,
        id: docRef.id,
      });
    } else {
      await updateDoc(docRef, {
        id: docRef.id,
      });
    }
    setImages(undefined);
    setCreateProduct(false);
    setIsLoading(false);
  };
  const [images, setImages] = useState<File[]>();

  const onDrop = (acceptedFiles: File[]) => {
    setImages(acceptedFiles);
  };

  const downloadImageAndUploadToFirebase = async (
    path: string,
    file: File,
    id: string
  ): Promise<string> => {
    // Create a root reference
    const storage = getStorage();

    // Create a reference to the file
    const storageRef = ref(storage, `${path}/${id}`);

    // Upload the file
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type, // use the MIME type of the file
    });

    // Create a promise to handle the upload task
    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // You may want to use these to provide feedback to the user
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Upload failed", error);
          reject(error);
        },
        async () => {
          // Handle successful uploads on complete
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        }
      );
    });
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  async function getImageFile(): Promise<File> {
    if (imageUrlRef.current?.value) {
      const url = imageUrlRef.current.value;
      const response = await fetch(url);

      // The ok property of the Response will be false if the request was not successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();

      // create a File object
      const file = new File([blob], "image.jpg", { type: blob.type });
      setImages([file]);
      return file;
    } else {
      throw new Error("Image URL is not defined");
    }
  }

  return (
    <div className="  w-full mt-2 relative">
      {productData ? (
        <Button
          variant="outline"
          onClick={() => setShowMenu(!showMenu)}
          className="grid grid-cols-[48px_1fr] gap-2 items-center h-fit w-full"
        >
          <>
            <div className="h-12 w-12 relative rounded-md overflow-hidden">
              <Image src={productData.image} alt={"img"} fill />
            </div>

            <div className="text-lg font-bold w-fit">{productData.title}</div>
          </>
        </Button>
      ) : (
        <div className=" grid grid-cols-[50%_1fr] gap-2">
          <Button
            variant="outline"
            className="w-full py-4"
            onClick={() => setShowMenu(!showMenu)}
          >
            Add product
          </Button>
          <Button
            variant="outline"
            onClick={() => setCreateProduct(true)}
            className="w-full  "
          >
            Create product +
          </Button>
        </div>
      )}
      {showMenu && (
        <>
          <div
            onClick={() => setShowMenu(false)}
            className="fixed top-0 left-0 z-40 w-screen h-screen bg-black/80 cursor pointer"
          />
          <div className="fixed w-[80vw] h-[80vh] z-50 bg-muted rounded-md overflow-scroll p-4 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <div className=" grid grid-cols-10 gap-2  h-fit">
              {products.map((product, i) => {
                return (
                  <div
                    onClick={() => addProductToAccount(product)}
                    key={i}
                    className="w-full aspect-square overflow-hidden rounded-md relative hover:opacity-60 cursor-pointer"
                  >
                    <Image src={product.image} alt={product.title} fill />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      <Dialog open={createProduct} onOpenChange={setCreateProduct}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2">
            <Input ref={titleRef} placeholder="Enter a title" />
            <Input ref={supplierUrlRef} placeholder="supplier url" />
            {images && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, i) => {
                  return (
                    <div
                      key={i}
                      className="w-full aspect-square overflow-hidden rounded-md relative hover:opacity-60 cursor-pointer"
                    >
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                        fill
                      />
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex gap-2">
              <Input ref={imageUrlRef} placeholder="Image url" />
              <Button onClick={getImageFile}>
                <Icons.download />
              </Button>
            </div>

            <Button onClick={open} variant="outline">
              <Icons.media className="h-6 w-6" />
              Upload image
            </Button>
          </div>

          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <DialogAction onClick={createNewProduct} className="bg-primary">
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.add className="mr-2 h-4 w-4" />
              )}
              <span>Create Product </span>
            </DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

type UpdateFieldInputProps<T extends keyof AccountDataType> = {
  item: AccountDataType;
  field: T;
};

const UpdateFieldInput = <T extends keyof AccountDataType>({
  item,
  field,
}: UpdateFieldInputProps<T>) => {
  const getNestedFieldValue = (object: any, path: string) =>
    path.split(".").reduce((o, k) => (o || {})[k], object);

  const [value, setValue] = useState<string>(
    getNestedFieldValue(item, field as unknown as string) || ""
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const updateField = async () => {
    setIsLoading(true);
    const collectionRef = collection(db, storage.accounts);
    const docRef = doc(collectionRef, item.id);
    await updateDoc(docRef, {
      [field]: value,
    });
    setIsLoading(false);
    setIsUpdated(true);
    setTimeout(() => setIsUpdated(false), 3000);
  };

  useEffect(() => {
    setValue(getNestedFieldValue(item, field as unknown as string));
  }, [item, field]); // Removed 'value' from dependencies

  async function copyToClipboard(): Promise<void> {
    if (!navigator.clipboard) {
      throw new Error("Clipboard API not available");
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      throw new Error("Failed to copy text");
    }
  }

  return (
    <>
      <AlertDialog open={showUpdateAlert} onOpenChange={setShowUpdateAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want update this value?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={updateField}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Update</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="grid gap-1 items-center w-full">
        <h1>{field}</h1>
        <div className="flex gap-2 w-full">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
          <Button variant="outline" onClick={copyToClipboard} className="w-fit">
            {copied ? (
              <Icons.check className="h-4 w-4" />
            ) : (
              <Icons.copy className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowUpdateAlert(true)}
            className="w-fit"
          >
            {isUpdated ? <Icons.check className="h-4 w-4" /> : "Update"}
          </Button>
        </div>
      </div>
    </>
  );
};
