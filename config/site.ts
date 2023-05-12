import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "TikDrop.io",
  description:
    "An open source application built using the new router, server components and everything new in Next.js 13.",
  url: process.env.NEXT_PUBLIC_SITE_URL as string,
  ogImage: "https://tx.shadcn.com/og.jpg",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/taxonomy",
  },
};
