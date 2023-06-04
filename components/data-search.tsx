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
      <Icons.search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
      <Input
        type="search"
        placeholder={placeholder}
        className=" w-full sm:pr-12 pl-10  text-primary"
        ref={inputRef}
        onChange={onSubmit}
      />
    </form>
  );
}
