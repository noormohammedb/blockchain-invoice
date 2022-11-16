import { providers } from "ethers";
import { useState, useEffect } from "react";
import MainApp from "./components/MainApp";

function App() {
  const [provider, setProvider] = useState<providers.Web3Provider>();
  // const [signer, setSigner] = useState<providers.JsonRpcSigner>();
  const _provider = new providers.Web3Provider(window.ethereum);
  // const _signer = _provider.getSigner();

  useEffect(() => {
    setProvider(_provider);
    // setSigner(_signer);
  }, []);

  return (
    <>
      <div>
        <MainApp provider={provider} />
      </div>
    </>
  );
}

export default App;
