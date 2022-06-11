interface RegionThemeProps {
  card: string;
  inputOutline: string;
  textShadow: string;
}
export interface ThemeProps {
  body: string;
  header: string;
  loading: string;
  removeAssetBtn: string;
  searchBar: string;
  sharesInput: string;
  brazilianTheme: RegionThemeProps;
  usaTheme: RegionThemeProps;
}

export interface Themes {
  light: ThemeProps;
  dark: ThemeProps;
}

export interface Theme {
  darkMode: boolean;
  theme: ThemeProps;
  toggleTheme: () => void;
}

export const themes: Themes = {
  light: {
    body: "bg-zinc-50",
    header: "text-sky-600 drop-shadow-[0_2px_4px_rgba(2,132,199,0.25)]",
    loading: "bg-gray-100 text-slate-500",
    removeAssetBtn: "text-red-700 drop-shadow-[0_2px_4px_rgba(185,28,28,0.25)]",
    searchBar:
      "bg-zinc-50 drop-shadow-[0_3px_5px_rgba(0,0,0,0.25)] text-gray-500 focus:outline-stone-400",
    sharesInput: "bg-gray-200 text-slate-500",
    brazilianTheme: {
      card: "border-green-500 text-green-500",
      inputOutline: "focus:outline-green-500",
      textShadow: "drop-shadow-[0_2px_4px_rgba(34,197,94,0.25)]",
    },
    usaTheme: {
      card: "border-sky-500 text-sky-500",
      inputOutline: "focus:outline-sky-500",
      textShadow: "drop-shadow-[0_2px_4px_rgba(14,165,233,0.25)]",
    },
  },
  dark: {
    body: "bg-zinc-700",
    header: "text-sky-600 drop-shadow-[0_2px_4px_rgba(125,211,255,0.25)]",
    loading: "bg-gray-500 text-slate-200",
    removeAssetBtn:
      "text-red-600 drop-shadow-[0_2px_4px_rgba(248,113,113,0.25)]",
    searchBar:
      "bg-zinc-700 drop-shadow-[0_3px_5px_rgba(255,255,255,0.25)] placeholder:text-gray-300 focus:outline-white text-gray-100",
    sharesInput: "bg-gray-500 text-slate-200",
    brazilianTheme: {
      card: "border-green-600 text-green-600",
      inputOutline: "focus:outline-green-600",
      textShadow: "drop-shadow-[0_2px_4px_rgba(22,163,74,0.25)]",
    },
    usaTheme: {
      card: "border-sky-600 text-sky-600",
      inputOutline: "focus:outline-sky-600",
      textShadow: "drop-shadow-[0_2px_4px_rgba(2,132,199,0.25)]",
    },
  },
};
