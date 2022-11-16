import React, { useState } from "react";
import { Contract } from "ethers";
import { incrementTotalInvoices } from "../../store";
import { useDispatch } from "react-redux";

const AddInvoiceHeader = ({ contractSigner }: AddinvoiceProp) => {
  const dispatch = useDispatch();
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState(0);
  const [prodQty, setProdQty] = useState(0);
  const formSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataFromBlockchain = await contractSigner?.addInvoice([
      [prodName, prodPrice, prodQty],
    ]);
    console.log("transaction: ", dataFromBlockchain);
    const tx = await dataFromBlockchain.wait();
    console.log("tx complete: ", tx);
    dispatch(incrementTotalInvoices());
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
