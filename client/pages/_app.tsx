import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

interface AppData {
  clubs: Map<ClubId, ClubInfo>;
}
export const AppContext = React.createContext<AppData>(null);

export interface ClubInfo {
  name: string;
  description: string;
}

export interface EventInfo {
  name: string;
  description: string;
}

export type ClubId = number;

interface AppData {
  clubs: Map<ClubId, ClubInfo>;
}

const clubs = new Map([
  [
    2932,
    {
      name: "UW Ballroom",
      description: "dancing in the dark",
    },
  ],
  [
    8888,
    {
      name: "Cooking club",
      description: "chef curry with the shot",
    },
  ],
  [
    111,
    {
      name: "Loo Labs",
      description: "👩‍🔬",
    },
  ],
]);

function App({ Component, pageProps }: AppProps) {
  return (
    <AppContext.Provider
      value={{
        clubs
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default App;
