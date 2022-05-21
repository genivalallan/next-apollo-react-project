export interface MatchResponse {
  ["1. symbol"]: string;
  ["2. name"]: string;
  ["3. type"]: string;
  ["4. region"]: string;
  ["5. marketOpen"]: string;
  ["6. marketClose"]: string;
  ["7. timezone"]: string;
  ["8. currency"]: string;
  ["9. matchScore"]: string;
}

export interface SearchResponse {
  bestMatches: MatchResponse[];
}

export interface Match {
  symbol: string;
  name: string;
  region: string;
}
