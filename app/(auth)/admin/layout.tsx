import { AuthProvider } from "@/context/user-auth";
import UserAdmin from "./is-user-admin";
interface AuthLayoutProps {
  children: React.ReactElement;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <UserAdmin>{children}</UserAdmin>;
}
