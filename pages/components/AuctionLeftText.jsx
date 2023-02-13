import React, { useEffect, useState } from "react";
import CountdownDuration from "./CoundownDuration";
import { ethers } from "ethers";
import DutchAuctionAbi, { contractAddress } from "../Abi/DutchAuctionAbi";

function AuctionLeftText() {
  const [startAt, setStartAt] = useState();
  const [endAt, setEndAt] = useState();
  const [remainingTime, setRemainingTime] = useState(0);
  useEffect(() => {
    StartAt();
    EndAt();
    getRemainingTime();
  }, []);
  const getRemainingTime = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        DutchAuctionAbi,
        signer
      );
      try {
        const time = await contract.getRemainingTime();
        setRemainingTime(time.toString());
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Install Metamask");
    }
  };

  const StartAt = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        DutchAuctionAbi,
        signer
      );
      try {
        const startAt = await contract.startAt();

        const timestamp = startAt;
        const date = new Date(timestamp * 1000);
        const f = new Intl.DateTimeFormat("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        });

        setStartAt(f.format(date));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Install Metamask");
    }
  };

  const EndAt = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        DutchAuctionAbi,
        signer
      );
      try {
        const endAtt = await contract.endAt();

        const timestamp = endAtt;
        const date = new Date(timestamp * 1000);
        const f = new Intl.DateTimeFormat("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        });

        setEndAt(f.format(date));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Install Metamask");
    }
  };

  return (
    <div className="lap:text-2xl text-xs gap-y-5 lap:items-start  text-[#64f4ab] flex flex-col items-center">
      <section className=" space-y-1 text-center lap:text-left">
        <h1>Start At</h1>
        <h1 className="bg-black w-fit  rounded-2xl shadow-md shadow-[#64f4ab] lap:w-80 p-2 ">
          {startAt}
        </h1>
      </section>
      <section className=" space-y-1 text-center lap:text-left">
        <h1>Remaining Duration</h1>
        <CountdownDuration remainingTime={remainingTime} />
      </section>
      <section className=" space-y-1 text-center lap:text-left">
        <h1>End At</h1>
        <h1 className="bg-black w-fit rounded-2xl shadow-md shadow-[#64f4ab] lap:w-80 p-2">
          {endAt}
        </h1>
      </section>
    </div>
  );
}

export default AuctionLeftText;
