import React, { useState } from "react";
import { ethers } from "ethers";
import NftAbi from "../Abi/NftAbi";
import { contractAddress } from "../Abi/DutchAuctionAbi";

function Approve({ addr, id, setIsConfirm, setAddAuction, setStatus }) {
  const [approving, setApproving] = useState(false);
  const approve = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(addr, NftAbi, signer);

      try {
        const transaction = await contract.approve(contractAddress, id);
        // Wait for the transaction to be mined
        const transactionReceipt = await provider.waitForTransaction(
          transaction.hash
        );
        setIsConfirm(true);
      } catch (error) {
        console.log(error);
        setAddAuction(false);
      }
    } else {
      console.log("Install Metamask");
      3;
    }
  };

  return (
    <div>
      {!approving ? (
        <div className="flex justify-center min-h-screen  bg-black">
          <div class="mt-24 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
            <div class="relative w-full h-full max-w-md md:h-auto">
              <div class="relative  bg-gray-900 shadow-md shadow-[#64f4ab] rounded-lg  ">
                <div class="p-6 text-center space-x-4">
                  <svg
                    aria-hidden="true"
                    class="mx-auto mb-4 text-white w-14 h-14 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 class="mb-5 text-lg  text-white font-bold">
                    Are you sure! you want to Approve?
                  </h3>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={() => {
                      approve();
                      setStatus("success");
                      setApproving(true);
                    }}
                    class=" bg-green-400 hover:bg-green-600 text-white focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm px-5 py-2.5  focus:z-10    font-bold"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={() => {
                      setAddAuction(false);
                    }}
                    class=" bg-red-500 hover:bg-red-700 text-white focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 py-2.5  focus:z-10   font-bold"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex justify-center  pt-36">
          <h1 className="text-[#64f4ab] shadow-md shadow-[#64f4ab] font-bold rounded-2xl bg-gray-900 p-5 h-fit text-2xl w-fit">
            Approving..........
          </h1>
        </div>
      )}
    </div>
  );
}

export default Approve;
