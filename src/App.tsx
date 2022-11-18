import { providers } from "ethers";
import { useState, useEffect } from "react";
import MainApp from "./components/MainApp";

function App() {
  const [provider, setProvider] = useState<providers.Web3Provider>();
  // const [signer, setSigner] = useState<providers.JsonRpcSigner>();
  // const _signer = _provider.getSigner();

  useEffect(() => {
    if (window.ethereum) {
      const _provider = new providers.Web3Provider(window.ethereum);
      setProvider(_provider);
    } else {
      alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    // setSigner(_signer);
  }, []);

  if (!window.ethereum) {
    return (
      <>
        <div>
          <h1>Please install metamask and refresh the app</h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <MainApp provider={provider} />
        </div>
      </>
    );
  }
}

export default App;
