"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
interface DataSearchProps extends React.HTMLAttributes<HTMLFormElement> {
  placeholder?: string;
  searchFunction: (searchTerm: string) => void;
}

export function DataSearch({
  placeholder,
  searchFunction,
  className,
  ...props
}: DataSearchProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (inputRef?.current) searchFunction(inputRef.current.value);
  }

  return (
    <form className={cn("relative w-full h-fit ", className)} {...props}>
      <Icons.search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className=" w-full sm:pr-12 pl-12 bg-muted py-6"
        ref={inputRef}
        onChange={onSubmit}
      />
      {/* <Button className="absolute right-0 top-0 h-full w-[150px] rounded-l-none">
        Search
      </Button> */}
    </form>
  );
}
