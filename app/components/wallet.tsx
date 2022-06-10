import styles from "./wallet.module.css";
import StockCard from "./stockCard";
import { Asset } from "../graphql/types";
import { Dispatch, SetStateAction } from "react";

interface WalletProps {
  wallet: Asset[];
  callbackSetState: Dispatch<SetStateAction<Asset[]>>;
}

const Wallet: React.FC<WalletProps> = ({ wallet, callbackSetState }) => {
  return (
    // Wallet grid container
    <div className="flex justify-content-center justify-center">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {wallet.length > 0 &&
          wallet.map((asset) => (
            <StockCard
              key={asset.tickerSymbol}
              asset={asset}
              wallet={wallet}
              callbackSetState={callbackSetState}
            />
          ))}
      </div>
    </div>
  );
};

export default Wallet;
