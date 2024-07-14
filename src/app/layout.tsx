import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navigation from "@/components/Navigation";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/lib/reactQueryProvider";
import NextTopLoader from "nextjs-toploader";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Zerox | exercise note",
  description: "Personal exercise data recording note.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <Providers>
          <NextTopLoader />
          <header className="relative min-h-[80px]">
            <Navigation />
          </header>
          <main>{children}</main>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
