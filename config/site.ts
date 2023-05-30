import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Arbilo",
  description: "",
  url: process.env.NEXT_PUBLIC_SITE_URL as string,
  ogImage: "https://tx.shadcn.com/og.jpg",
  links: {
    twitter: "",
    github: "",
  },
};
