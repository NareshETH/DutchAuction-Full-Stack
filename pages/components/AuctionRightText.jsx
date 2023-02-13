import React, { useEffect, useState } from "react";
import Countdown from "./Countdown";
import { ethers } from "ethers";
import DutchAuctionAbi, { contractAddress } from "../Abi/DutchAuctionAbi";

function AuctionRightText({ currentPrice, time }) {
  const [price, setStartingPrice] = useState();

  useEffect(() => {
    StartingPrice();
  }, []);

  const StartingPrice = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        DutchAuctionAbi,
        signer
      );
      try {
        const startingPrice = await contract.startingPrice();
        setStartingPrice(ethers.utils.formatEther(startingPrice.toString()));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Install Metamask");
    }
  };

  return (
    <div className="lap:text-2xl text-xs  gap-y-5 text-[#64f4ab] flex flex-col lap:items-start items-center ">
      <div className=" space-y-1 text-center lap:text-left ">
        <h1>STARTING PRICE</h1>
        <h1 className="bg-black w-fit lap:p-3 p-2 rounded-2xl lap:text-xl shadow-md shadow-[#64f4ab]">
          {price} MATIC
        </h1>
      </div>
      <div className=" text-center lap:text-left">
        <h1>CURRENT PRICE</h1>
        <h1 className="bg-black w-fit lap:p-3 p-2 rounded-2xl lap:text-xl shadow-md shadow-[#64f4ab]">
          {currentPrice} MATIC
        </h1>
      </div>
      <div className=" text-center lap:text-left">
        <h1>Next Price Drop </h1>

        <Countdown time={time} />
      </div>
    </div>
  );
}

export default AuctionRightText;
