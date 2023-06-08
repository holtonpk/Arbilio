import React, { useEffect } from "react";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { toast } from "@/components/ui/use-toast";
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
import { useUserProductTrack } from "@/context/user-product-track";
import { set } from "date-fns";
import { ProductType, ProductDataBaseType } from "@/types";
import Image from "next/image";

const TRACK_LIMIT = 5;

interface TrackProductButtonProps extends ButtonProps {
  product: ProductType | ProductDataBaseType;
  trackingVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "defualt"
    | null
    | undefined;
}

export const TrackProductButton = ({
  product,
  className,
  variant,
  children,
  trackingVariant = "outline",
  ...props
}: TrackProductButtonProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showManageModal, setShowManageModal] = React.useState<boolean>(false);
  const [showTrackingLimitDialog, setShowTrackingLimitDialog] =
    React.useState<boolean>(false);

  const { trackProduct, trackedProducts, trackedProductsIds } =
    useUserProductTrack()!;

  const handleAddToCollection = async () => {
    await trackProduct(product.id);
  };

  const handleClick = async () => {
    if (trackedProductsIds.includes(product.id)) {
      setShowManageModal(true);
    } else if (trackedProductsIds.length + 1 > TRACK_LIMIT) {
      setShowTrackingLimitDialog(true);
    } else {
      handleTrackProduct();
    }
  };

  const handleTrackProduct = async () => {
    setIsLoading(true);
    await handleAddToCollection();
    setShowTrackingLimitDialog(false);
    setIsLoading(false);
    toast({
      title: "Product added to tracking list",
      description: "You can now track this product in your dashboard.",
    });
  };

  useEffect(() => {
    if (trackedProductsIds.length == 0) {
      setShowManageModal(false);
    }
  }, [trackedProductsIds]);

  return (
    <>
      <button
        onClick={handleClick}
        className={cn(
          buttonVariants({
            variant: trackedProductsIds.includes(product.id)
              ? (trackingVariant as typeof variant)
              : variant,
          }),
          className
        )}
        {...props}
      >
        {children}
        {trackedProductsIds.includes(product.id) ? (
          <>
            <Icons.check className="mr-2 h-4 w-4" />
            Tracking Product
          </>
        ) : (
          <>
            {isLoading ? (
              <Icons.spinner className="animate-spin mr-2 h-4 w-4" />
            ) : (
              <Icons.add className="mr-2 h-4 w-4" />
            )}
            Track Product
          </>
        )}
      </button>
      <AlertDialog
        open={showTrackingLimitDialog}
        onOpenChange={setShowTrackingLimitDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription className="text-destructive">
              *You&apos;ve reached your tracking limit. Please remove a product
              from your list or upgrade.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="divide-y divide-border rounded-md border max-h-[200px] overflow-scroll">
            {trackedProducts.map((product, i) => (
              <ProductDisplay
                key={i}
                product={product}
                handleClick={handleTrackProduct}
              />
            ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <LinkButton href="/settings/upgrade">
              <span>Upgrade Subscription</span>
            </LinkButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showManageModal} onOpenChange={setShowManageModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Your Tracking List</AlertDialogTitle>
            <AlertDialogDescription>
              Product tracking allows you to closely monitor activity related to
              your product.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="divide-y divide-border rounded-md border max-h-[200px] overflow-scroll">
            {trackedProducts.map((product, i) => (
              <ProductDisplay key={i} product={product} />
            ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TrackProductButton;

const ProductDisplay = ({
  product,
  handleClick,
}: {
  product: ProductType;
  handleClick?: () => void;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { unTrackProduct } = useUserProductTrack()!;

  const handleRemoveProduct = async () => {
    setIsLoading(true);
    await unTrackProduct(product.id);
    if (handleClick) {
      handleClick();
    }
    setIsLoading(false);
  };

  return (
    <div className="flex gap-4 items-center p-2 cursor-pointer">
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

      <Button onClick={handleRemoveProduct} variant="destructive">
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Remove
      </Button>
    </div>
  );
};
