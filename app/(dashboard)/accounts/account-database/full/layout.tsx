import ProtectFeature from "@/components/protect-feature";
import { ReactElement } from "react";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <ProtectFeature planLevel={1} featureName="Account Database">
      {children}
    </ProtectFeature>
  );
}
