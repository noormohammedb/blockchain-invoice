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
    if (userEthAddress && contractProvider) {
      (async () => {
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
        rows={80}
        value={JSON.stringify(invoiceFromStore, null, 2)}
        onChange={() => {}}
      ></textarea>
    </>
  );
};

export default LIstInvoice;
