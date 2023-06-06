import ProtectFeature from "@/components/protect-feature";
import { ReactElement } from "react";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <ProtectFeature planLevel="standard" featureName="Top Accounts">
      {children}
    </ProtectFeature>
  );
}
