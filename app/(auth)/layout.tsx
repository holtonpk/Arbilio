import { AuthProvider } from "@/context/Auth";
interface AuthLayoutProps {
  children: React.ReactElement;
}
import Link from "next/link";

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AuthProvider>
      <Link
        href="/"
        className=" items-center space-x-2 flex w-fit absolute top-4 left-4 "
      >
        <span className="text-base p-2 text-primary font-bold inline-block ">
          <span className=" text-primary">TikDrop</span>
          .io
        </span>
      </Link>

      {children}
    </AuthProvider>
  );
}
