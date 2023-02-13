import React, { useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import DutchAuctionAbi, { contractAddress } from "../Abi/DutchAuctionAbi";
import ConfirmStart from "./ConfirmStart";

function Start({ addr, id }) {
  const [etherValue, setEtherValue] = useState("");
  const [etherValuee, setEtherValuee] = useState("");
  const [weiValue, setWeiValue] = useState("");
  const [weiValuee, setWeiValuee] = useState("");
  const [start, setStart] = useState(false);
  const [auction, setAuction] = useState(false);
  const router = useRouter();

  const Startt = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        DutchAuctionAbi,
        signer
      );
      try {
        const transaction = await contract.start(weiValue, weiValuee, id, addr);
        const transactionReceipt = await provider.waitForTransaction(
          transaction.hash
        );
        setAuction(true);
        router.push("/components/Auction");
      } catch (error) {
        console.log(error);
        setStart(false);
      }
    } else {
      console.log("Install Metamask");
    }
  };

  const handleConversion = () => {
    try {
      const wei = ethers.utils.parseEther(etherValue.toString());
      setWeiValue(wei.toString());
      const weii = ethers.utils.parseEther(etherValuee.toString());
      setWeiValuee(weii.toString());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-black pt-24">
      {!start ? (
        <div className=" text-[#64f4ab] font-semibold font-mono">
          <form
            onSubmit={() => {
              handleConversion();
              setStart(true);
            }}
            className="flex p-4 flex-col text-left w-72 gap-y-5 rounded-lg shadow-md shadow-[#64f4ab] "
          >
            <div>
              <label htmlFor="ether-value">Starting Price</label>

              <input
                type="number"
                name="ether-value"
                placeholder="Min-0.0001 MATIC"
                value={etherValue}
                required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setEtherValue(e.target.value)}
              />
            </div>
            <div>
              {" "}
              <label htmlFor="ether-value">Discount Rate</label>
              <input
                type="number"
                name="ether-value"
                placeholder="Rate"
                value={etherValuee}
                required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setEtherValuee(e.target.value)}
              />
            </div>

            <button
              className="hover:bg-[#64f4ab] shadow-md shadow-[#64f4ab] p-1 rounded-lg bg-gray-900 hover:text-white"
              type="submit"
            >
              START
            </button>
          </form>
          <br />
          <br />
        </div>
      ) : (
        <ConfirmStart
          Startt={Startt}
          setStart={setStart}
          auction={auction}
          setAuction={setAuction}
        />
      )}
    </div>
  );
}

export default Start;
