import React, { useState } from "react";
import Auction from "./Auction";
import StartingAuction from "./StartingAuction";

function ConfirmStart({ Startt, setStart, auction, setAuction }) {
  return (
    <div>
      {!auction ? (
        <StartingAuction
          Startt={Startt}
          setStart={setStart}
          setAuction={setAuction}
        />
      ) : (
        <Auction />
      )}
    </div>
  );
}

export default ConfirmStart;
