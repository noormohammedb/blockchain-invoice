import { MouseEvent, useState } from "react";
import { providers } from "ethers";
import { useDispatch, useSelector } from "react-redux";

import { setProvider, setSigner, setAddress } from "../store";

declare global {
  interface Window {
    ethereum: any;
  }
}

const ConnectWallet = () => {
  // const walletStore = useSelector((store) => store.wallet);
  // @ts-ignore
  const walletStore = useSelector((store) => store.wallet);
  // @ts-ignore
  const address = walletStore.address;
  const dispatch = useDispatch();
  const connectButton = async (e: MouseEvent) => {
    console.log("Button Clicked, evnet: ", e);
    const provider = new providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const ethAddress = await signer.getAddress();
    console.log("ethAddress: ", ethAddress);
    console.log("signer: ", signer);
    dispatch(setProvider(provider));
    dispatch(setSigner(signer));
    dispatch(setAddress(ethAddress));

    console.log("walletStore: ", walletStore);
  };
  return (
    <>
      <button onClick={connectButton}>connect wallet</button>
      {address && <p>{address}</p>}
    </>
  );
};

export default ConnectWallet;
