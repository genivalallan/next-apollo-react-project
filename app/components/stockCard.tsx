import { Dispatch, SetStateAction } from "react";
import { Asset } from "../graphql/types";
import RemoveAssetButton from "./removeAssetButton";
import SharesInput from "./sharesInput";
import styles from "./stockCard.module.css";

const BRAZILIAN_ASSET = "Brazil";
const NORTH_AMERICAN_ASSET = "United States";
const BR_THEME_COLOR = "#55B585";
const USA_THEME_COLOR = "#4E45E5";

interface StockCardProps {
  tickerName: string;
  tickerSymbol: string;
  tickerRegion: string;
  numberOfShares: number;
  wallet: Asset[];
  callbackSetState: Dispatch<SetStateAction<Asset[]>>;
}

const StockCard: React.FC<StockCardProps> = ({
  tickerName,
  tickerSymbol,
  tickerRegion,
  numberOfShares,
  wallet,
  callbackSetState,
}) => {
  return (
    // Card
    <div
      style={{
        borderColor: tickerRegion.includes(BRAZILIAN_ASSET)
          ? BR_THEME_COLOR
          : USA_THEME_COLOR,
        color: tickerRegion.includes(BRAZILIAN_ASSET)
          ? BR_THEME_COLOR
          : USA_THEME_COLOR,
      }}
      className={styles.card}
    >
      {/* Stock name and region */}
      <div className={styles.cardTitle}>
        <span className={styles.stockName}>{tickerName}</span>
        <span className={styles.stockRegion}>{tickerRegion}</span>
      </div>
      <SharesInput
        numberOfShares={numberOfShares}
        tickerSymbol={tickerSymbol}
      />
      <RemoveAssetButton
        callbackSetState={callbackSetState}
        wallet={wallet}
        tickerSymbol={tickerSymbol}
      />
    </div>
  );
};

export default StockCard;
