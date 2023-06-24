import { AuthProvider } from "@/context/user-auth";
import { siteConfig } from "@/config/site";
import UserSignedIn from "././user-signed-in";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = constructMetadata({
  title: `Register - ${siteConfig.name}`,
});

interface AuthLayoutProps {
  children: React.ReactElement;
}
import Link from "next/link";
import Background from "@/components/background";

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AuthProvider>
      <>
        <Link
          href="/"
          className=" items-center space-x-2 flex w-fit absolute top-4 left-4"
        >
          <span className=" text-lg md:text-2xl p-2 text-primary font-bold  flex items-center ">
            <div className="md:h-8 md:w-8 h-6 w-6 relative">
              <Image src="/image/circleLogo.png" alt="logo" fill />
            </div>
            <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-[#F66896] to-[#7640DF]">
              {siteConfig.name}
            </span>
          </span>
        </Link>

        {children}
        <Background />
      </>
    </AuthProvider>
  );
}
