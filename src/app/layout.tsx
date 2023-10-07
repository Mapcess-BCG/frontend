import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FlagIcon } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MapCess - Accessible Routing",
  description: "MapCess provides accessible routing information for everyone.",
  manifest: "/manifest.json",
  themeColor: "#B3E9C0",
  applicationName: "MapCess - Accessible Routing",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MapCess - Accessible Routing",
  },
  icons: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/icons/ios/180.png",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen w-screen">
            {children}
            <ModeToggle className="fixed bottom-4 right-4 z-10" />
            <Button
              className="fixed bottom-16 right-4 z-10"
              variant="outline"
              size="icon"
              asChild
            >
              <Link href="/report?location=BCG">
                <FlagIcon className="h-6 w-6" />
              </Link>
            </Button>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
