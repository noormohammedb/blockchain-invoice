import React, { useState } from "react";
import { addLocalProduct, incrementTotalInvoices } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import ListLocalProds from "./ListLocalProds";

const AddInvoiceHeader = ({ contractSigner }: AddinvoiceProp) => {
  const localProducts = useSelector((state: any) => state.wallet.localProducts);
  const dispatch = useDispatch();
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState(0);
  const [prodQty, setProdQty] = useState(0);

  const formSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("localProducts: ", localProducts);
    const dataFromBlockchain = await contractSigner?.addInvoice(localProducts);
    console.log("transaction: ", dataFromBlockchain);
    const tx = await dataFromBlockchain.wait();
    console.log("tx complete: ", tx);
    dispatch(incrementTotalInvoices());
  };

  const addProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const newProd = [prodName, prodPrice, prodQty];

    dispatch(addLocalProduct(newProd));
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
          <button onClick={addProduct}>Add</button>
          <br />
          <br />
          <br />
          <button>submit</button>
        </form>
        <ListLocalProds />
      </div>
    </>
  );
};

export default AddInvoiceHeader;
