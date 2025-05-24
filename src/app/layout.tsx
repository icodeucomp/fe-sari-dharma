import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./globals.css";
import { Footer, Header } from "@/components/ui";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Klinik Utama Rawat Inap Sari Dharma",
  description: "Official website for Klinik Utama Rawat Inap Sari Dharma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen overflow-x-hidden`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
