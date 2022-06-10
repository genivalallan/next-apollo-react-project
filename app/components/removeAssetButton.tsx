import { useMutation } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";
import { REMOVE_ASSET } from "../graphql/queries";
import { Asset } from "../graphql/types";

interface RemoveAssetButtonProps {
  tickerSymbol: string;
  wallet: Asset[];
  callbackSetState: Dispatch<SetStateAction<Asset[]>>;
}

const RemoveAssetButton: React.FC<RemoveAssetButtonProps> = ({
  tickerSymbol,
  wallet,
  callbackSetState,
}) => {
  const [removeAssetMutation, _] = useMutation(REMOVE_ASSET);

  const handleRemoveBtnClick = () => {
    removeAssetMutation({ variables: { tickerSymbol: tickerSymbol } });

    const indexOfAsset = wallet.findIndex(
      (asset) => asset.tickerSymbol === tickerSymbol
    );
    const newState = [
      ...wallet.slice(0, indexOfAsset),
      ...wallet.slice(indexOfAsset + 1),
    ];

    callbackSetState(newState);
  };

  return (
    <div
      className="absolute bottom-1 left-2 p-2 text-xl rounded-xl text-red-700 font-dosis font-bold drop-shadow-md cursor-pointer"
      onClick={handleRemoveBtnClick}
    >
      REMOVER
    </div>
  );
};

export default RemoveAssetButton;
