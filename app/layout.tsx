import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Providers } from "./provider";

import { Toaster } from 'sonner';
import Navbar from "@/components/Navbar";
import ChatbotEmbed from "@/components/Chatbot";
import VoiceNavigation from "@/components/VoiceNavigationcomponent";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <Navbar/>
        {children}
        {/* <ChatbotEmbed /> */}
        <VoiceNavigation/>
        <Toaster position="top-center" richColors />
      </body>
    </html>
    </Providers>
  );
}
