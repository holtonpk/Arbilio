import { marketingConfig } from "@/config/marketing";
import { LinkButton } from "@/components/ui/link";
import { MainNav } from "@/components/nav/main-nav";
import { SiteFooter } from "@/components/site-footer";
import Background from "@/components/background";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40  top-0">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav className="hidden md:flex gap-4 w-fit ">
            <LinkButton
              href="/login"
              variant="outline"
              size="sm"
              className="px-4 mr-2 whitespace-nowrap"
            >
              Login
            </LinkButton>
            <LinkButton
              href="/onboarding/register"
              variant="default"
              size="sm"
              className="px-4 whitespace-nowrap"
            >
              Sign up
            </LinkButton>
          </nav>
        </div>
      </header>
      <main className="flex-1 z-10">{children}</main>
      <SiteFooter />
      <Background />
    </div>
  );
}
