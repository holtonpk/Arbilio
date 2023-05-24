"use client";
import { useState } from "react";
import Skeleton from "@/components/ui/custom-skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { ComboBoxType } from "@/types";

interface ComboBoxProps {
  dropList: ComboBoxType;
  onSelect: (item: any) => void;
}

const ComboBox = ({ dropList, onSelect }: ComboBoxProps) => {
  const [selected, setSelected] = useState(dropList.items[0]);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleSelect = (item: any) => {
    onSelect(item.value);
    setSelected(item);
    setOpen(false);
  };

  return (
    <div className="relative w-fit">
      <Button
        onClick={toggleOpen}
        className="flex items-center justify-center whitespace-nowrap"
        variant="outline"
      >
        {dropList.title + ": " + selected.title}
        <Icons.chevronDown
          className={`${
            open ? "rotate-180" : "rotate-0"
          } ml-8 h-6 w-6 transition-all`}
        />
      </Button>
      {open && (
        <div className="absolute min-w-fit -bottom-2 translate-y-full left-0 w-full h-fit p-2 bg-background border border-border z-40 rounded-md shadow-lg">
          {dropList.items.map((item, i) => (
            <MenuItem
              item={item}
              handleSelect={handleSelect}
              selected={selected}
              key={i}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComboBox;

interface MenuItemProps {
  item: {
    title: string;
    icon?: keyof typeof Icons;
  };
  handleSelect: (item: any) => void;
  selected: any;
}

const MenuItem = ({ item, handleSelect, selected }: any) => {
  return (
    <button
      onClick={() => handleSelect(item)}
      className="text-primary text-sm cursor-pointer flex items-center gap-2 w-full h-10 px-2 py-2 hover:bg-accent group rounded-md "
    >
      {item.icon && <MenuItemIcon name={item.icon} />}
      <p>{item.title}</p>
      {item.title == selected.title && (
        <Icons.check className="absolute right-4  h-2 w-2 text-primary group-hover:text-primary" />
      )}
    </button>
  );
};

interface MenuItemIconProps extends Partial<React.SVGProps<SVGSVGElement>> {
  name: keyof typeof Icons;
}

function MenuItemIcon({ name, className, ...props }: MenuItemIconProps) {
  const Icon = Icons[name];

  if (!Icon) {
    return null;
  }

  return (
    <div className="text-primary group-hover:text-primary">
      <Icon className={cn("h-4 w-4", className)} {...props} />
    </div>
  );
}

export const ComboBoxSkeleton = () => {
  return <Skeleton height={40} width={200} />;
};
