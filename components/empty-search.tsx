import React from "react";
import { Icons } from "@/components/icons";

const EmptySearch = () => {
  return (
    <div className="h-fit w-full p-10 flex flex-col items-center gap-3 border">
      <div className="aspect-square bg-muted p-4 rounded-md flex justify-center items-center">
        <Icons.search className="h-16 w-16 text-primary" />
      </div>
      <h1 className="text-primary text-2xl">No results found</h1>
      <p className="text-muted-foreground">
        It seems we can’t find any results based on your search.
      </p>
    </div>
  );
};

export default EmptySearch;
