import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import ResponsiveDrawer from "./components/MenuDrawer";
import PrayerTimeline from "./components/PrayerTimeline";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  maximumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Muslim assistant",
  description:
    "Sometimes we need some help to do our daily muslim activities. This app will help you to do that.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["muslim", "prayer", "coran", "mosque"],

  authors: [
    { name: "Pauline Didier" },
    {
      name: "Pauline Didier",
      url: "",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <body className={inter.className}>
            <main className="h-screen w-screen flex flex-col">
              <ResponsiveDrawer />
              <section className="container mx-auto px-4 h-full">
                {children}
              </section>
            </main>
          </body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
