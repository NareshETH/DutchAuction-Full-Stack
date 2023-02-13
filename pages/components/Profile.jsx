import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Nft from "./Nft";
import ConfirmApprove from "./ConfirmApprove";

function Profile() {
  const [Nfts, setNfts] = useState([]);
  const [addr, setaddr] = useState();
  const [id, setId] = useState();
  const [addAuction, setAddAuction] = useState(false);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    async function fetchNfts() {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        let nfts;

        const baseURL =
          "https://polygon-mumbai.g.alchemy.com/v2/AGQnY2ei_6spc0PAyNxUlN_G3UfyfUF0";
        const url = `${baseURL}/getNFTs/?owner=${address}`;

        try {
          const requestOptions = {
            method: "get",
            redirect: "follow",
          };
          nfts = await fetch(url, requestOptions).then((data) => data.json());

          const ownednfts = await nfts.ownedNfts;
          console.log(ownednfts);
          setNfts(ownednfts);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchNfts();
  }, []);

  const check = async (a, i, img, titl) => {
    setaddr(a);
    setId(i);
    localStorage.setItem("Image", img);
    localStorage.setItem("title", titl);
    console.log(`hi${img}`);
  };
  return (
    <main className="bg-black min-h-screen ">
      {!addAuction && Nfts ? (
        <div>
          {Nfts.length === 0 ? (
            <div className="min-h-screen grid place-content-center">
              <h1 className="text-[#64f4ab] font-semibold text-3xl">
                OOPS! You Dont Have Any Nfts Yet...
              </h1>
            </div>
          ) : (
            <Nft Nfts={Nfts} check={check} setAddAuction={setAddAuction} />
          )}
        </div>
      ) : (
        <ConfirmApprove
          setAddAuction={setAddAuction}
          id={id}
          addr={addr}
          setStatus={setStatus}
        />
      )}
    </main>
  );
}

export default Profile;
