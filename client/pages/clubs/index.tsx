import React from "react";
import { useContext } from "react";
import { AppContext } from "../_app";
import { ClubList } from "../../components/clubs";

export default function Clubs() {
  const {clubs: clubListData} = useContext(AppContext);
  
  return (
    <ClubList clubListData={clubListData}/>
  );
}

