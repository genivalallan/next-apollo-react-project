import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { UPDATE_ASSET } from "../graphql/queries";
import styles from "./sharesInput.module.css";

const DEFAULT_CURSOR = "default";
const TEXT_CURSOR = "text";

interface SharesInputProps {
  numberOfShares: number;
  tickerSymbol: string;
}

const SharesInput: React.FC<SharesInputProps> = ({
  numberOfShares,
  tickerSymbol,
}) => {
  const [sharesInput, setSharesInput] = useState(numberOfShares.toString());
  const [lastValidInput, setLastValidInput] = useState(numberOfShares);
  const [inputCursor, setInputCursor] = useState(DEFAULT_CURSOR);
  const [updateSharesMutation, _] = useMutation(UPDATE_ASSET, {
    fetchPolicy: "network-only",
  });

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

  const handleOnFocus = () => {
    setInputCursor(TEXT_CURSOR);
  };

  const handleOnBlur = () => {
    setInputCursor(DEFAULT_CURSOR);

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
    setInputCursor(DEFAULT_CURSOR);
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
    <form className={styles.sharesInputForm} onSubmit={handleOnSubmit}>
      <input
        id="shares-input"
        className={styles.sharesInput}
        style={{ cursor: inputCursor }}
        type="text"
        value={sharesInput}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
      />
    </form>
  );
};

export default SharesInput;
