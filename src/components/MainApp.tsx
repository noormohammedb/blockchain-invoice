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
  const [codeBinaryFromChain, setCodeBinaryFromChain] = useState<String>();

  const userEthAddress = useSelector((store: any) => store.wallet.address);

  useEffect(() => {
    (async () => {
      const codeBinaryFromChain = await provider?.getCode(contractAddress);
      if (codeBinaryFromChain?.length < 100) {
        alert("Please connect to mumbai test network");
      } else {
        setCodeBinaryFromChain(codeBinaryFromChain);
      }
    })();
  }, [provider]);

  useEffect(() => {
    if (userEthAddress) {
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
      <hr />
      {codeBinaryFromChain && contractSigner && (
        <>
          <AddInvoiceHeader contractSigner={contractSigner} />
          <LIstInvoice contractProvider={contractProvider} />
        </>
      )}
    </>
  );
};

export default MainApp;
