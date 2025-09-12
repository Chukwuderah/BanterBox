import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Banter Box - AI Chat Interface",
  description:
    "A beautiful AI chat interface with multiple personalities, voice input/output, and conversation export capabilities.",
  keywords: "AI, chat, interface, voice, export, personalities, responsive",
  authors: [{ name: "AI Chat Interface" }],
  icons: {
    icon: { url: "/logo-transparent.png", sizes: "16x16", type: "image/png" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
