"use client";
import "@/styles/globals.css";
import "@/styles/animations.css";
import "@/styles/skeletonStyle.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/Auth";
interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body className="min-h-screen ">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
