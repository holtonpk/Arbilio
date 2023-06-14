import "@/styles/globals.css";
import "@/styles/animations.css";
import "@/styles/skeletonStyle.css";
import "@/styles/mdx.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/user-auth";
import { siteConfig } from "@/config/site";
import Head from "next/head";

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <head />
      <body className="min-h-screen ">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
