/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import "./styles/globals.css";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ModalProvider } from "@/components/providers/modal-provider";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logos/logo-light.svg",
        href: "/logos/logo-light.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logos/logo-dark.svg",
        href: "/logos/logo-dark.svg",
      },
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            {children}
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
