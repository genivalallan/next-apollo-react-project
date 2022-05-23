import { useLazyQuery } from "@apollo/client";
import { FormEventHandler, useEffect, useState } from "react";
import { ASSET_SEARCH } from "../graphql/queries";
import { Match } from "../graphql/types";
import Loading from "./loading";
import styles from "./searchBar.module.css";

interface SearchBarProps {
  callbackCreateAssets: (matchs: Match[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ callbackCreateAssets }) => {
  const [search, { data, loading }] = useLazyQuery<{
    search: Match[];
  }>(ASSET_SEARCH, { fetchPolicy: "network-only" });
  const [keyword, setkeyword] = useState("");

  useEffect(() => {
    if (data && data.search.length > 0) {
      callbackCreateAssets(data.search);
      setkeyword("");
    }
  }, [data]);

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const sanitizedInput = keyword.trim();

    if (sanitizedInput) {
      search({ variables: { keyword: sanitizedInput } });
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleOnSubmit}>
        <input
          className={styles.formInput}
          type="text"
          value={keyword}
          placeholder='Pesquise por "AAPL" ou "WEGE3"'
          onChange={(e) => setkeyword(e.target.value)}
        />
      </form>
      {loading && <Loading />}
    </div>
  );
};

export default SearchBar;
