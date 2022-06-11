import { Dispatch, SetStateAction, useContext } from "react";
import { Asset } from "../graphql/types";
import { ThemeContext } from "../pages/_app";
import RemoveAssetButton from "./removeAssetButton";
import SharesInput from "./sharesInput";

interface StockCardProps {
  asset: Asset;
  wallet: Asset[];
  callbackSetState: Dispatch<SetStateAction<Asset[]>>;
}

const StockCard: React.FC<StockCardProps> = ({
  asset: { tickerName, tickerSymbol, tickerRegion, numberOfShares },
  wallet,
  callbackSetState,
}) => {
  const { theme } = useContext(ThemeContext);

  const cardTheme = tickerRegion.includes("Brazil")
    ? theme.brazilianTheme
    : theme.usaTheme;

  return (
    // Card
    <div className={`relative border-2 rounded-xl w-80 h-40 ${cardTheme.card}`}>
      {/* Stock name and region */}
      <div className="absolute top-3 left-4 space-y-3">
        <span
          className={`block w-48 whitespace-nowrap overflow-hidden text-2xl font-bold drop-shadow-md ${cardTheme.textShadow}`}
        >
          {tickerName}
        </span>
        <span className="block font-bold">{tickerRegion}</span>
      </div>
      <SharesInput
        numberOfShares={numberOfShares}
        tickerSymbol={tickerSymbol}
        tickerRegion={tickerRegion}
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
