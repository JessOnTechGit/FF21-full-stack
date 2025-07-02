"use client";

import { useState, useEffect } from "react";
import { ethers, parseEther } from "ethers";
//import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { abi } from "../constants/abi";
import LandingPage from "./components/LandingPageUI";
import Game from "./components/Game";

const contractAddress = "0xbdEd0D2bf404bdcBa897a74E6657f1f12e5C6fb6";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: { 31337: process.env.NEXT_PUBLIC_RPC_URL },
    },
  },
};

export default function Home() {
  const [web3Modal, setWeb3Modal] = useState(null);
  const [playersHand, setPlayersHand] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [isClient, setIsClient] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [gameResultSet, setGameResultSet] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      import("web3modal").then(({ default: Web3Modal }) => {
        setWeb3Modal(new Web3Modal({ cacheProvider: false, providerOptions }));
      });
    }
  }, []);

  // Event listener functions
  const gameOver = (dealersCards, playersCards) => {
    console.log(
      "Game Ended! Dealer's cards:",
      dealersCards,
      "Player's cards:",
      playersCards
    );
    setPlayersHand([]);
    // Just clear the hand, let the specific win/loss events handle the popup
  };

  const calculateHandTotal = (cards) => {
    let total = 0;
    for (let i = 0; i < cards.length; i++) {
      const cardValue = Number(cards[i]) % 13;
      if (cardValue === 0 || cardValue >= 10) {
        total += 10;
      } else {
        total += cardValue;
      }
    }
    return total;
  };

  const playerWon = (message, cardsTotal) => {
    console.log("PlayerWonTheGame:", message, cardsTotal);
    setGameResult({
      type: "win",
      message: message,
      cardsTotal: Number(cardsTotal),
    });
    setShowResultPopup(true);
    setGameResultSet(true);
  };

  const playerLost = (message, cardsTotal) => {
    console.log("PlayerLostTheGame:", message, cardsTotal);
    setGameResult({
      type: "loss",
      message: message,
      cardsTotal: Number(cardsTotal),
    });
    setShowResultPopup(true);
    setGameResultSet(true);
  };

  const listenToEvents = async () => {
    if (!signer) {
      console.log("No signer available. Please connect your wallet first.");
      return;
    }

    const contract = new ethers.Contract(contractAddress, abi, signer);

    contract.on("GameOver", gameOver);
    contract.on("PlayerWonTheGame", playerWon);
    contract.on("PlayerLostTheGame", playerLost);
  };

  async function connect() {
    if (!web3Modal) {
      console.log("Web3Modal is not initialized yet.");
      return;
    }
    try {
      const web3ModalProvider = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(web3ModalProvider);
      const signer = await provider.getSigner();
      setIsConnected(true);
      setSigner(signer);
    } catch (e) {
      console.error("Error connecting wallet:", e);
    }
  }

  async function execute() {
    if (!signer) {
      console.log("No signer available. Please connect your wallet first.");
      return;
    }

    const contract = new ethers.Contract(contractAddress, abi, signer);
    const playerAddress = await signer.getAddress();
    try {
      const activeGameStatus = await contract.activeGame(playerAddress);
      console.log("Game status:", activeGameStatus);

      if (!activeGameStatus) {
        console.log("No active game found, starting a new one...");

        // Try startGame with value directly (contract is payable)
        console.log("Starting game with payment...");
        const tx = await contract.startGame({
          value: ethers.parseEther("1"),
        });
        await tx.wait();
        console.log("Game started successfully");
      } else {
        console.log("Game already active.");
      }

      try {
        console.log("About to call getPlayerCards...");
        console.log("Player address:", playerAddress);
        console.log("Contract address:", contractAddress);

        // Check if contract exists first
        const provider = signer.provider;
        const contractCode = await provider.getCode(contractAddress);
        if (contractCode === "0x") {
          throw new Error("No contract deployed at this address");
        }

        let existingHand = await contract.getPlayerCards(playerAddress);
        console.log("Player's Hand:", existingHand);
        setPlayersHand(existingHand.map((card) => Number(card)));
      } catch (cardError) {
        console.error("Error calling getPlayerCards:", cardError);

        if (cardError.code === "CALL_EXCEPTION") {
          console.log(
            "Contract call failed - may indicate no active game or contract issue"
          );
          // Don't set empty hand yet, let user start a game first
        } else {
          console.log("Falling back to empty hand");
          setPlayersHand([]);
        }
      }
    } catch (e) {
      console.error("Transaction failed:", e);

      // Enhanced error logging
      if (e.reason) {
        console.error("Revert Reason:", e.reason);
      }
      if (e.data) {
        console.error("Error Data:", e.data);
      }

      // Try to get more details about the contract state
      try {
        const provider = signer.provider;
        const balance = await provider.getBalance(contractAddress);
        console.log("Contract balance:", ethers.formatEther(balance));

        const playerBalance = await provider.getBalance(playerAddress);
        console.log("Player balance:", ethers.formatEther(playerBalance));
      } catch (balanceError) {
        console.error("Error checking balances:", balanceError);
      }
    }
  }

  async function callGame() {
    if (!signer)
      return console.log(
        "No signer available. Please connect your wallet first."
      );
    const playerAddress = await signer.getAddress();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      listenToEvents();

      const tx = await contract.stand({ gasLimit: 500000 });
      console.log("Transaction Hash:", tx.hash);

      const receipt = await tx.wait();
      console.log("Transaction Successful! Block:", receipt.blockNumber);

      contract.off("GameOver", gameOver);
      contract.off("PlayerWonTheGame", playerWon);
      contract.off("PlayerLostTheGame", playerLost);
    } catch (e) {
      console.error("Transaction failed:", e);

      if (e.data) {
        console.error("Revert Reason:", e.data.message);
      }
    }
  }

  async function hitGame() {
    if (!signer)
      return console.log(
        "No signer available. Please connect your wallet first."
      );
    const playerAddress = await signer.getAddress();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const waitForHit = await contract.hit({ gasLimit: 500000 });
      await waitForHit.wait();

      try {
        const existingHand = await contract.getPlayerCards(playerAddress);
        setPlayersHand(existingHand.map((card) => Number(card)));
      } catch (cardError) {
        console.error("Error getting player cards after hit:", cardError);
        // Try to get cards from the hit transaction return value if available
        if (waitForHit.data) {
          console.log("Attempting to decode cards from transaction data");
        }
      }
    } catch (e) {
      console.error("Hit transaction failed:", e);
      if (e.code === "CALL_EXCEPTION") {
        alert("Unable to hit - please ensure you have an active game");
      }
    }
  }

  if (!isClient) {
    return (
      <main>
        <LandingPage
          isConnected={false}
          connect={() => {}}
          execute={() => {}}
        />
      </main>
    );
  }

  return (
    <main>
      {playersHand.length > 0 ? (
        <Game
          isConnected={isConnected}
          playersHand={playersHand}
          callGame={callGame}
          hitGame={hitGame}
        />
      ) : (
        <LandingPage
          isConnected={isConnected}
          connect={connect}
          execute={execute}
        />
      )}

      {/* Game Result Popup */}
      {showResultPopup && gameResult && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl border-4 border-black p-8 text-center max-w-md w-11/12">
            <h2
              className={`text-4xl font-bold mb-6 ${
                gameResult.type === "win" ? "text-green-600" : "text-red-600"
              }`}
            >
              {gameResult.type === "win" ? "🎉 You Won!" : "😞 You Lost!"}
            </h2>
            <p className="text-black text-lg mb-4 font-medium">
              {gameResult.message}
            </p>
            <p className="text-black text-xl mb-8 font-bold">
              Final Score: {gameResult.cardsTotal}
            </p>
            <button
              onClick={() => {
                setShowResultPopup(false);
                setGameResult(null);
                setPlayersHand([]);
                setGameResultSet(false);
              }}
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 mx-auto"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
