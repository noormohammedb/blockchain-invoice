import React, { useState } from "react";
import { Contract } from "ethers";

interface AddinvoiceProp extends ProviderProp {
  contractWrite: Contract | undefined;
}

const AddInvoiceHeader = ({ provider, contractWrite }: AddinvoiceProp) => {
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState(0);
  const [prodQty, setProdQty] = useState(0);
  const formSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataFromBlockchain = await contractWrite?.addInvoice([
      [prodName, prodPrice, prodQty],
    ]);
    const tx = await dataFromBlockchain.wait();
    console.log("tx: ", tx);
  };
  return (
    <>
      <div>
        <form onSubmit={formSubmission}>
          <label htmlFor="prod_name">Product name: </label>
          <input
            type="text"
            name="prod_name"
            id="prod_name"
            value={prodName}
            onChange={(e) => setProdName(e.target.value)}
          />
          <br />
          <label htmlFor="prod_price">Product price: </label>
          <input
            type="number"
            name="prod_price"
            id="prod_price"
            value={prodPrice}
            onChange={(e) => setProdPrice(+e.target.value)}
          />
          <br />
          <label htmlFor="prod_qty">Product quantity: </label>
          <input
            type="number"
            name="prod_qty"
            id="prod_qty"
            value={prodQty}
            onChange={(e) => setProdQty(+e.target.value)}
          />
          <br />
          <button>submit</button>
        </form>
      </div>
    </>
  );
};

export default AddInvoiceHeader;
