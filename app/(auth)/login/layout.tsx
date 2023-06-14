import { AuthProvider } from "@/context/user-auth";
import UserSignedIn from "../user-signed-in";
interface AuthLayoutProps {
  children: React.ReactElement;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <UserSignedIn>{children}</UserSignedIn>;
}
