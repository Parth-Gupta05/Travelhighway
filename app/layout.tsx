import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import "remixicon/fonts/remixicon.css";
import { SearchProvider } from "./context/SearchContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Highway Delite",
  description: "Travel booking app, for your exiting travel story!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SearchProvider>
          <div className="p-0 m-0 h-screen bg-white text-black">
            <Toaster position="top-center" reverseOrder={false} />
                    <Navbar />        {children}       {" "}
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
