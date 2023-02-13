import React, { useEffect, useState } from "react";
import Link from "next/link";

function Nav() {
  const [walletAddress, setWalletAddress] = useState();

  useEffect(() => {
    connectCurrentWallet();
    walletListener();
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const addr = accounts[0];
        let addrs =
          addr.substring(0, 5) + "..." + addr.substring(addr.length - 4);
        setWalletAddress(addrs);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Install Metamask");
    }
  };
  const connectCurrentWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        accounts
          ? setWalletAddress(accounts[0])
          : setWalletAddress("Connect Wallet");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Install Metamask");
    }
  };

  const walletListener = async () => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
      });
    } else {
      setWalletAddress("");
    }
  };

  return (
    <nav className="flex justify-between items-center  bg-black font-bold px-5 py-5  sm:max-w-[1978px] text-white font-serif border-b-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-white  hover:text-[#64f4ab] lap:hidden "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
        />
      </svg>
      <div className="hidden lap:block">
        <Link
          href="/components/Home"
          className=" text-white hover:text-[#64f4ab]"
        >
          Home
        </Link>
      </div>
      <div className="hidden lap:block">
        <Link
          href="/components/Auction"
          className=" text-white hover:text-[#64f4ab]"
        >
          Auction
        </Link>
      </div>
      <div className="hidden lap:block">
        <Link
          href="/components/Profile"
          className=" text-white hover:text-[#64f4ab]"
        >
          Profile
        </Link>
      </div>

      <div>
        <button
          onClick={() => connectWallet()}
          className="text-[#64f4ab] p-3 hover:bg-[#64f4ab] hover:text-white rounded-2xl bg-gray-900 shadow-lg shadow-[#64f4ab]"
        >
          {walletAddress
            ? walletAddress.substring(0, 5) +
              "..." +
              walletAddress.substring(walletAddress.length - 4)
            : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
}

export default Nav;
