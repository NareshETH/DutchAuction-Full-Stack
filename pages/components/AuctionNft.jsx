import React, { useEffect, useState } from "react";

function AuctionNft({ Buy }) {
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    const i = localStorage.getItem("Image");
    const t = localStorage.getItem("title");
    setImg(i);
    setTitle(t);
  };

  return (
    <div className="shadow-lg shadow-[#64f4ab] w-fit rounded-b-2xl flex flex-col items-center">
      <article className="lap:w-64 w-56  rounded-t-2xl ">
        <img
          src={img}
          alt="AUCTIONING NFT"
          className="w-full rounded-t-2xl lap:h-60 h-36"
        />
        <div className="  rounded-b-2xl bg-black">
          <header className="flex flex-col justify-center lap:space-y-3 text-center lap:p-3">
            <h1>{title}</h1>
            <h1>#0001</h1>
          </header>
          <footer className="flex flex-col justify-center lap:p-3 lap:bg-none lap:hover:bg-[#64f4ab]   rounded-b-2xl">
            <button onClick={() => Buy()} className="rounded-b-2xl">
              BUY
            </button>
          </footer>
        </div>
      </article>
    </div>
  );
}

export default AuctionNft;
