import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewInvoice } from "../../../store";
import { loadInvoices } from "../../../util/loadData";

const LIstInvoice = ({ contractProvider }: ListInvoiceProp) => {
  const dispatch = useDispatch();
  const invoiceFromStore = useSelector((store: any) => store.wallet.invoice);
  const userEthAddress = useSelector((store: any) => store.wallet.address);
  const totalInvoices = useSelector((store: any) => store.wallet.totalInvoices);

  useEffect(() => {
    if (userEthAddress) {
      (async () => {
        console.log("update invoice store");
        const properInvoice = await loadInvoices(contractProvider);
        dispatch(setNewInvoice(properInvoice));
      })();
    }
  }, [userEthAddress, totalInvoices]);

  return (
    <>
      <div>LIstInvoice</div>
      <textarea
        cols={70}
        rows={999}
        value={JSON.stringify(invoiceFromStore, null, 2)}
        onChange={() => {}}
      ></textarea>
      {/* {invoiceFromStore.map((data) => {
        return <p>{JSON.stringify(data, null, "2")}</p>;
      })} */}
    </>
  );
};

export default LIstInvoice;
