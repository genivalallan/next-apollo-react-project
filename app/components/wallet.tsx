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
    <div className={styles.wallet}>
      {wallet.length > 0 &&
        wallet.map((asset) => (
          <StockCard
            key={asset.tickerSymbol}
            tickerName={asset.tickerName}
            tickerSymbol={asset.tickerSymbol}
            tickerRegion={asset.tickerRegion}
            numberOfShares={asset.numberOfShares}
            wallet={wallet}
            callbackSetState={callbackSetState}
          />
        ))}
    </div>
  );
};

export default Wallet;
