import { useLazyQuery } from "@apollo/client";
import { FormEventHandler, useContext, useEffect, useState } from "react";
import { ASSET_SEARCH } from "../graphql/queries";
import { Match } from "../graphql/types";
import { ThemeContext } from "../pages/_app";
import Loading from "./loading";

interface SearchBarProps {
  callbackCreateAssets: (matchs: Match[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ callbackCreateAssets }) => {
  const [search, { data, loading }] = useLazyQuery<{
    search: Match[];
  }>(ASSET_SEARCH, { fetchPolicy: "network-only" });
  const [keyword, setkeyword] = useState("");
  const { theme } = useContext(ThemeContext);

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
    <div className="w-1/4 my-3 mx-auto">
      <form onSubmit={handleOnSubmit}>
        <input
          className={`w-full px-4 py-2 border rounded-xl font-source-code-pro font-bold outline-none focus:outline-offset-0 easy-in duration-200 ${theme.searchBar}`}
          type="text"
          value={keyword}
          placeholder='Pesquise por "AAPL" ou "WEGE3"'
          onChange={(e) => {
            setkeyword(e.target.value.toUpperCase());
          }}
        />
      </form>
      {loading && <Loading />}
    </div>
  );
};

export default SearchBar;
