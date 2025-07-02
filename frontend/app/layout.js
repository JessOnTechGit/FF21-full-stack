import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TwentyOne",
  description: "Created by Jess",
};

import Image from "next/image";

export function Footer({ children }) {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://codehawks.cyfrin.io/c/2024-11-twentyone/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/file.svg"
          alt="File icon"
          width={16}
          height={16}
        />
        Mock Audits
      </a>
      <a
        className="flex items-center gap-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/window.svg"
          alt="Window icon"
          width={16}
          height={16}
        />
        Created by Jess
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://updraft.cyfrin.io/dashboard"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/globe.svg"
          alt="Globe icon"
          width={16}
          height={16}
        />
        Learn on UpDraft →
      </a>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen pb-8 ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className="flex-grow flex flex-col items-center justify-center p-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
