import React from "react";
import Image from "next/image";

interface ProductImageProps {
  images: string[];
}

export const ProductImage = ({ images }: ProductImageProps) => {
  const [mainImage, setMainImage] = React.useState(images[0]);

  return (
    <div className=" grid md:grid-cols-1 grid-cols-[60%_1fr] sm:gap-4 gap-2 rounded-md h-fit ">
      <div className="aspect-square full relative rounded-md shadow bg-muted">
        <Image
          src={mainImage}
          alt="product image"
          fill
          className="rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4  w-full  rounded-md ">
        {images.map((image, index) => (
          <button
            onClick={() => setMainImage(image)}
            key={index}
            className={`${
              mainImage == image
                ? "border-2 border-primary box-border"
                : "hover:opacity-60"
            } w-full aspect-square relative rounded-md overflow-hidden shadow bg-muted`}
          >
            <Image src={image} alt="product image" fill />
          </button>
        ))}
      </div>
    </div>
  );
};
