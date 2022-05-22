import { gql } from "@apollo/client";

const ASSET_SEARCH = gql`
  query Search($keyword: String!) {
    search(keyword: $keyword) {
      symbol
      name
      region
    }
  }
`;

const GET_ASSETS = gql`
  query Assets {
    assets {
      tickerSymbol
      tickerName
      tickerRegion
      numberOfShares
      createdAt
      lastUpdatedAt
    }
  }
`;

const GET_ASSET = gql`
  query Asset($symbol: String!) {
    asset(tickerSymbol: $symbol) {
      tickerSymbol
      tickerName
      tickerRegion
      numberOfShares
      createdAt
      lastUpdatedAt
    }
  }
`;

const ADD_ASSET = gql`
  mutation AddAsset($newAsset: AssetInput!) {
    addAsset(newAsset: $newAsset) {
      tickerSymbol
      tickerName
      tickerRegion
      numberOfShares
      createdAt
      lastUpdatedAt
    }
  }
`;

const ADD_ASSETS = gql`
  mutation AddAssets($matches: [AssetInput!]!) {
    addAssets(matches: $matches)
  }
`;

const REMOVE_ASSET = gql`
  mutation RemoveAsset($tickerSymbol: String!) {
    removeAsset(tickerSymbol: $tickerSymbol) {
      tickerSymbol
      tickerName
      tickerRegion
      numberOfShares
      createdAt
      lastUpdatedAt
    }
  }
`;

const UPDATE_ASSET = gql`
  mutation UpdateShare($assetUpdate: UpdateShareInput!) {
    updateShare(assetUpdate: $assetUpdate) {
      tickerSymbol
      tickerName
      tickerRegion
      numberOfShares
      createdAt
      lastUpdatedAt
    }
  }
`;

export {
  ASSET_SEARCH,
  GET_ASSET,
  GET_ASSETS,
  ADD_ASSET,
  ADD_ASSETS,
  REMOVE_ASSET,
  UPDATE_ASSET,
};
