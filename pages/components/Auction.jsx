import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import DutchAuctionAbi, { contractAddress } from "../Abi/DutchAuctionAbi";

import AuctionLeftText from "./AuctionLeftText";
import AuctionNft from "./AuctionNft";
import AuctionRightText from "./AuctionRightText";

function Auction() {
  const [currentPrice, setCurrentPrice] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    getPrice();
    const intervalId = setInterval(getPrice, 300000);
    return () => clearInterval(intervalId);
  }, []);

  const getPrice = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        DutchAuctionAbi,
        signer
      );
      try {
        const price = await contract.getPrice();
        countdownn();
        setCurrentPrice(ethers.utils.formatEther(price.toString()));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Install Metamask");
    }
  };
  const countdownn = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        DutchAuctionAbi,
        signer
      );
      try {
        const price = await contract.countdown();
        setTime(price.toString());
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Install Metamask");
    }
  };

  const Buy = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        DutchAuctionAbi,
        signer
      );
      try {
        const price = await contract.buy({
          value: ethers.utils.parseEther(currentPrice),
        });
        const transactionReceipt = await provider.waitForTransaction(
          transaction.hash
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Install Metamask");
    }
  };

  return (
    <div className="   bg-black min-h-screen  font-mono    flex justify-center ">
      <section className="bg-gray-900 lap:flex items-center lap:mt-5 lap:gap-x-20 h-fit  justify-center text-white font-semibold   lap:p-5   rounded-2xl shadow-md shadow-[#64f4ab]   space-y-10 w-fit ">
        <AuctionLeftText />

        <AuctionNft Buy={Buy} />

        <AuctionRightText currentPrice={currentPrice} time={time} />
      </section>
    </div>
  );
}

export default Auction;
