"use client";
import { Icons } from "@/components/icons";
import Tooltip from "@/components/ui/tooltip";
interface PageHeaderProps {
  heading: string;
  text?: string;
  tooltip?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  heading,
  text,
  children,
  tooltip,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between  mb-4 ">
      <div className="grid gap-1  container">
        <div className="flex items-center">
          <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
          {tooltip && (
            <Tooltip content={tooltip}>
              <div className="flex h-4 w-8 justify-center">
                <Icons.helpCircle className="h-4 w-4 text-muted-foreground" />
              </div>
            </Tooltip>
          )}
        </div>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  );
}
