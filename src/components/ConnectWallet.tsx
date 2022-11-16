import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../store";

const ConnectWallet = ({ provider }: ProviderProp) => {
  const dispatch = useDispatch();

  // @ts-ignore
  const walletStore = useSelector((store) => store.wallet);
  const address = walletStore.address;
  const connectButton = async (e: MouseEvent) => {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const ethAddress = await signer.getAddress();
    console.log("ethAddress: ", ethAddress);
    dispatch(setAddress(ethAddress));
  };
  return (
    <>
      <button onClick={connectButton}>connect wallet</button>
      {address && <p>{address}</p>}
    </>
  );
};

export default ConnectWallet;
