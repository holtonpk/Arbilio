"use client";

import { Dispatch, SetStateAction } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = ({
  fn,
  trackDimensions = "h-4 w-8",
  thumbDimensions = "h-3 w-3",
  thumbTranslate = "translate-x-4",
  checked = true,
  disabled = false,
}: {
  fn: Dispatch<SetStateAction<boolean>> | (() => void);
  trackDimensions?: string;
  thumbDimensions?: string;
  thumbTranslate?: string;
  checked?: boolean;
  disabled?: boolean;
}) => {
  console.log("Switch", checked);
  return (
    <SwitchPrimitive.Root
      checked={checked}
      name="switch"
      onCheckedChange={(checked) => fn(checked)}
      disabled={disabled}
      className={cn(
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        checked ? "bg-gray-200" : "bg-theme-blue",
        `relative inline-flex ${trackDimensions}  flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 `
      )}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          checked ? "translate-x-0" : "translate-x-6",
          `pointer-events-none ${thumbDimensions} transform  rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`
        )}
      />
    </SwitchPrimitive.Root>
  );
};

export default Switch;
