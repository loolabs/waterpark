import React from "react";
import { useContext } from "react";
import ClubCard from "../components";
import { AppContext } from "./_app";

export default function ClubList() {
  const appData = useContext(AppContext);
  const clubListData = appData.clubs;

  return (
    <div>
      <h1>Club List</h1>
      {Array.from(clubListData.entries()).map(([clubId, clubInfo]) => {
        return <ClubCard club={{ id: clubId, ...clubInfo }} />;
      })}
    </div>
  );
}

