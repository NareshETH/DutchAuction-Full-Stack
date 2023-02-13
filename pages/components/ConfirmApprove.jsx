import React, { useState } from "react";

import Start from "./Start";
import Approve from "./Approve";

function ConfirmApprove({ setAddAuction, addr, id, setStatus, Nft }) {
  const [isConfirm, setIsConfirm] = useState(false);

  return (
    <main>
      {!isConfirm ? (
        <Approve
          addr={addr}
          id={id}
          setIsConfirm={setIsConfirm}
          setAddAuction={setAddAuction}
          setStatus={setStatus}
        />
      ) : (
        <Start addr={addr} id={id} Nft={Nft} />
      )}
    </main>
  );
}

export default ConfirmApprove;
