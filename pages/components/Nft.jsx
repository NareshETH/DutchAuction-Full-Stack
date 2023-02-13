import React from "react";

function Nft({ Nfts, check, setAddAuction }) {
  return (
    <section className="grid grid-cols-4 gap-x-5 p-5 text-white font-semibold font-serif">
      {Nfts.map((nft) => {
        const a = nft.contract.address;
        const i = nft.id.tokenId.substr(nft.id.tokenId.length - 5);
        const img = nft.metadata.image;
        const titl = nft.title;
        return (
          <article key={a} className="w-64 rounded-2xl border-white border-2">
            <img
              src={nft.metadata.image}
              alt="Nft"
              className="w-full rounded-t-2xl h-60 bg-gray-100"
            />
            <div className="bg-black  rounded-b-2xl">
              <header className="flex flex-col justify-center text-center p-3">
                <h1>{nft.title}</h1>
              </header>
              <footer
                onClick={() => {
                  check(a, i, img, titl);
                  setAddAuction(true);
                }}
                className="flex flex-col  justify-center p-3 hover:bg-[#64f4ab] rounded-b-2xl"
              >
                <button>ADD TO AUCTION</button>
              </footer>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default Nft;
