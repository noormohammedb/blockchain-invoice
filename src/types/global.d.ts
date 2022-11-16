interface Window {
  ethereum: any;
}

interface ProviderProp {
  provider: providers.Web3Provider;
}

interface ComponentProp extends ProviderProp {
  setContract: React.Dispatch<React.SetStateAction<Contract | undefined>>;
}
