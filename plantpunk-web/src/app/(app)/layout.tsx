import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/sass/style.scss";
import Header from "@/components/Header/Header";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "PlantPunk",
  description: "Houseplant care encyclopedia",
};

export default function AppLayout({
  children,
  panel,
}: Readonly<{
  children: React.ReactNode;
  panel: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        {panel}
      </body>
    </html>
  );
}
