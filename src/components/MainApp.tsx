import { useState, useEffect } from "react";
import { Contract } from "ethers";
import ConnectWallet from "./ConnectWallet";
import { useSelector } from "react-redux";
import abi, { contractAddress } from "../util/contract_config";
import AddInvoiceHeader from "./AddInvoice/AddInvoiceHeader";
import LIstInvoice from "./AddInvoice/ListInvoice/LIstInvoice";

const MainApp = ({ provider }: ProviderProp) => {
  const [contractProvider, setContractProvider] = useState<Contract>();
  const [contractSigner, setContractSigner] = useState<Contract>();

  const userEthAddress = useSelector((store: any) => store.wallet.address);
  useEffect(() => {
    if (userEthAddress) {
      console.log("userEthAddress: ", userEthAddress);
      const contractRead = new Contract(contractAddress, abi, provider);
      const signer = provider.getSigner();
      const contractWrite = new Contract(contractAddress, abi, signer);
      setContractSigner(contractWrite);
      setContractProvider(contractRead);
    }
  }, [userEthAddress]);

  return (
    <>
      <div>MainApp</div>

      <ConnectWallet provider={provider} />

      {contractSigner && <AddInvoiceHeader contractSigner={contractSigner} />}
      <hr />
      {contractProvider && <LIstInvoice contractProvider={contractProvider} />}
    </>
  );
};

export default MainApp;
