import { AuthProvider } from "@/context/Auth";
interface AuthLayoutProps {
  children: React.ReactElement;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
