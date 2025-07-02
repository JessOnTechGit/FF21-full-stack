"use client";
import { useEffect, useState } from "react";

const suits = ["♠️", "♥️", "♦️", "♣️"];
const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export default function Game({ isConnected, playersHand, callGame, hitGame }) {
  const [formattedHand, setFormattedHand] = useState([]);

  useEffect(() => {
    if (playersHand.length > 0) {
      console.log("player hand:", playersHand);

      const formatted = playersHand.map((cardNum) => {
        const adjustedCard = cardNum - 1;
        return {
          suit: suits[Math.floor(adjustedCard / 13)], // Get suit (♠️, ♥️, ♦️, ♣️)
          rank: ranks[adjustedCard % 13], // Get rank (A, 2, ..., K)
        };
      });

      setFormattedHand(formatted);
    } else {
      setFormattedHand([]);
    }
  }, [playersHand]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-white text-4xl font-bold mb-6">Your Hand</h2>

      {/* Display formatted cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {formattedHand.length > 0 ? (
          formattedHand.map((card, index) => (
            <div
              key={index}
              className="w-32 h-48 bg-white rounded-xl shadow-2xl border-4 border-black flex flex-col items-center justify-between p-4"
            >
              <span className="text-4xl">{card.suit}</span>
              <span className="text-6xl font-extrabold">{card.rank}</span>
              <span className="text-4xl rotate-180">{card.suit}</span>
            </div>
          ))
        ) : (
          <p className="text-white text-2xl">Loading cards...</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        {isConnected ? (
          <>
            <button
              onClick={callGame}
              className="w-32 sm:w-40 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              Call
            </button>
            <button
              onClick={hitGame}
              className="w-32 sm:w-40 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              Hit
            </button>
          </>
        ) : (
          <h1 className="text-white text-xl">Wallet Disconnected</h1>
        )}
      </div>
    </div>
  );
}
