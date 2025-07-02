"use client";
import Image from "next/image";

export default function LandingPage({ isConnected, connect, execute }) {
  return (
    <div className="flex flex-col items-center sm:items-start">
      <Image
        className="dark:invert"
        src="/twentyone.svg"
        alt="Next.js logo"
        width={300}
        height={50}
        priority
      />

      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <div>
          {isConnected ? (
            <button
              onClick={execute}
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              <Image
                className="dark:invert"
                src="/ethereum.svg"
                alt="ethereum logo"
                width={20}
                height={20}
              />
              Play
            </button>
          ) : (
            <button
              onClick={connect}
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              <Image
                className="dark:invert"
                src="/ethereum.svg"
                alt="Ethereum logo"
                width={20}
                height={20}
              />
              Connect
            </button>
          )}
        </div>
        <a
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          href="https://codehawks.cyfrin.io/c/2024-11-twentyone/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read our docs
        </a>
      </div>
    </div>
  );
}
