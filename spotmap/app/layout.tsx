import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MobileDock } from "@/components/navigation/mobile-nav";
import { AddReviewFab } from "@/components/navigation/add-review-fab";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpotMap · Social Map entre amis",
  description:
    "SpotMap est un réseau social géolocalisé pour partager tes meilleures adresses et explorer la carte de tes amis.",
};

export const viewport: Viewport = {
  themeColor: "#05050a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <div className="relative flex min-h-dvh flex-col">
          <main className="flex-1 pb-28 md:pb-10">{children}</main>
          <MobileDock />
          <div className="pointer-events-none fixed bottom-8 right-6 hidden md:block">
            <AddReviewFab className="pointer-events-auto shadow-rose-500/30" />
          </div>
        </div>
      </body>
    </html>
  );
}
