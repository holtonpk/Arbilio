"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
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
    <form className={cn("relative w-full", className)} {...props}>
      <Input
        type="search"
        placeholder={placeholder}
        className=" w-full sm:pr-12"
        ref={inputRef}
        onChange={onSubmit}
      />
    </form>
  );
}
