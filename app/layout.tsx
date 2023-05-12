"use client";
import "@/styles/globals.css";
import "@/styles/animations.css";
import "@/styles/skeletonStyle.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/Auth";
interface IProps {
  children: React.ReactNode;
  session: any;
}

export default function RootLayout({ children, session }: IProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
