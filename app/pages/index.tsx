import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/header";
import SearchBar from "../components/searchBar";
import Wallet from "../components/wallet";
import { ADD_ASSETS, GET_ASSETS } from "../graphql/queries";
import { Asset, Match } from "../graphql/types";
import styles from "./index.module.css";

const MinhaCarteira: NextPage = () => {
  const [searchQuery, { data: assetsQueryResult }] = useLazyQuery<{
    assets: Asset[];
  }>(GET_ASSETS, { fetchPolicy: "network-only" });

  const [createAssetsMutation, { data: createAssetMutationResult }] =
    useMutation<{
      addAssets: string;
    }>(ADD_ASSETS, { fetchPolicy: "network-only" });

  const [wallet, setWallet] = useState(() => {
    searchQuery();
    return [] as Asset[];
  });

  useEffect(() => {
    if (assetsQueryResult) setWallet(assetsQueryResult.assets);
  }, [assetsQueryResult]);

  useEffect(() => {
    if (createAssetMutationResult) searchQuery();
  }, [createAssetMutationResult]);

  const createAsset = (matches: Match[]) => {
    const list = matches.map((match) => ({
      symbol: match.symbol,
      name: match.name,
      region: match.region,
    }));

    createAssetsMutation({
      variables: {
        matches: list,
      },
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Minha Carteira</title>
      </Head>

      <main>
        <Header title="Minha Carteira" />
        <SearchBar callbackCreateAssets={createAsset} />
        <Wallet wallet={wallet} callbackSetState={setWallet} />
      </main>
    </div>
  );
};

export default MinhaCarteira;
