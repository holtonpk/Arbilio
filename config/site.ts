import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Arbilio",
  title:
    "Arbilio - a platform built for optimizing product sourcing and analytics",
  description: "a platform built for optimizing product sourcing and analytics",
  url: process.env.NEXT_PUBLIC_SITE_URL as string,
  logo: "/logo.png",
  links: {
    twitter: "",
    github: "",
  },
  contact: {
    supportEmail: "support@arbilio.io",
  },
};
