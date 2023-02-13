import React from "react";
import Link from "next/link";

function Home() {
  return (
    <div className="min-h-screen bg-black text-center pt-20 px-14 text-white font-semibold leading-10 text-xl flex flex-col space-y-12 font-serif">
      <div className="bg-gray-900 p-3 shadow-md shadow-[#64f4ab]">
        {" "}
        <h1 className="text-2xl">
          Hi buddy! Today we Learn about DutchAuction
        </h1>
        <p>
          A Dutch auction is a type of auction in which the price of the item
          being auctioned is lowered until a bidder accepts the price. In the
          case of non-fungible tokens (NFTs), a Dutch auction could be used to
          sell a unique digital item, by starting the auction at a high price
          and gradually lowering the price until someone is willing to pay the
          final price. The winner of the auction is the first person to accept
          the final price. Dutch auctions can be a useful way for sellers to
          determine the market value of an NFT.
        </p>
      </div>

      <Link
        href="/components/Auction"
        className="hover:bg-[#64f4ab] hover:text-black p-5 w-fit self-center whitespace-nowrap rounded-2xl shadow-md shadow-[#64f4ab] "
      >
        <h1>Lets get into the Auction</h1>
      </Link>
    </div>
  );
}

export default Home;
