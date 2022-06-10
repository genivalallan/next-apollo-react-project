import { Dispatch, SetStateAction } from "react";
import { Asset } from "../graphql/types";
import RemoveAssetButton from "./removeAssetButton";
import SharesInput from "./sharesInput";

const BRAZILIAN_CARD_THEME = "border-green-500 text-green-500";
const USA_CARD_THEME = "border-sky-500 text-sky-500";

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
  const cardTheme = tickerRegion.includes("Brazil")
    ? BRAZILIAN_CARD_THEME
    : USA_CARD_THEME;

  return (
    // Card
    <div className={`relative border-2 rounded-xl w-80 h-40 ${cardTheme}`}>
      {/* Stock name and region */}
      <div className="absolute top-3 left-4 space-y-3">
        <span className="block w-48 whitespace-nowrap overflow-hidden text-2xl font-dosis font-bold drop-shadow-md">
          {tickerName}
        </span>
        <span className="block font-dosis font-bold">{tickerRegion}</span>
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
