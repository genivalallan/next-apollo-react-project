import { useMutation } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { UPDATE_ASSET } from "../graphql/queries";
import { ThemeContext } from "../pages/_app";

interface SharesInputProps {
  numberOfShares: number;
  tickerSymbol: string;
  tickerRegion: string;
}

const SharesInput: React.FC<SharesInputProps> = ({
  numberOfShares,
  tickerSymbol,
  tickerRegion,
}) => {
  const [sharesInput, setSharesInput] = useState(numberOfShares.toString());
  const [lastValidInput, setLastValidInput] = useState(numberOfShares);
  const [updateSharesMutation, _] = useMutation(UPDATE_ASSET, {
    fetchPolicy: "network-only",
  });
  const { theme } = useContext(ThemeContext);
  const inputOutline = tickerRegion.includes("Brazil")
    ? theme.brazilianTheme.inputOutline
    : theme.usaTheme.inputOutline;

  useEffect(() => {
    executeUpdate();
  }, [lastValidInput]);

  const executeUpdate = () => {
    updateSharesMutation({
      variables: {
        assetUpdate: { tickerSymbol: tickerSymbol, shares: lastValidInput },
      },
    });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = validate(e.target.value);

    if (value === "") {
      setSharesInput(value);
    } else if (value) {
      setSharesInput(value);
      setLastValidInput(parseInt(value));
    } else {
      setSharesInput(lastValidInput.toString());
    }
  };

  const handleOnBlur = () => {
    const value = validate(sharesInput);

    if (value === "") {
      setSharesInput("0");
      setLastValidInput(0);
    } else if (value) {
      setSharesInput(value);
      setLastValidInput(parseInt(value));
    } else {
      setSharesInput(lastValidInput.toString());
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = document.getElementById(
      "shares-input"
    ) as HTMLInputElement & { value: string };

    if (input.value === "") {
      setSharesInput("0");
      setLastValidInput(0);
    }

    input.blur();

    executeUpdate();
  };

  const validate = (value: string): string | null => {
    if (value === "") return value;

    const parsed = parseInt(value);

    return !!value.match(/^[^\D]{0,3}$/) && parsed >= 0 && parsed <= 100
      ? value
      : null;
  };

  return (
    <form
      className="absolute top-6 right-5 w-20 h-12"
      onSubmit={handleOnSubmit}
    >
      <input
        id="shares-input"
        className={`w-full h-full rounded-xl text-2xl text-center font-source-code-pro font-bold hover:cursor-default focus:cursor-text outline-none focus:outline-offset-0 easy-in duration-200 ${theme.sharesInput} ${inputOutline}`}
        type="text"
        value={sharesInput}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
      />
    </form>
  );
};

export default SharesInput;
