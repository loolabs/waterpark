import React, { useMemo, useState } from "react";
import Fuse from 'fuse.js';
import { useContext } from "react";
import ClubCard from "../components";
import { AppContext } from "./_app";

export default function ClubList() {
  const {clubs: clubListData} = useContext(AppContext);
  const [searchValue, setSearchValue] = useState<string>("");

  type Club = {
    id: number,
    name: string,
    description: string
  }

  const formattedClubs: Club[] = useMemo(() => {
    return Array.from(clubListData.entries()).map(([clubId, clubInfo]) => {
      return ({
        id: clubId,
        name: clubInfo.name,
        description: clubInfo.description
      });
    });
  }, [clubListData]);

  const fuse = useMemo(() => {
      return new Fuse(formattedClubs, {
          keys: ["name"],
          ignoreLocation: true, // doesn't weight string location
          threshold: 0.3 // 0=strict, 1=loose
        })
  }, [formattedClubs])

  const clubsList = () => {
    const filteredClubs: (Fuse.FuseResult<Club> | Club)[] = searchValue ? fuse.search(searchValue) : formattedClubs;
    return filteredClubs.map((club: Club | { item: Club }) => {
      if ("item" in club) {
        club = club.item as Club;
      }
      return (
        <ClubCard
          club={{
            id: club.id,
            name: club.name,
            description: club.description,
          }}
        />
      );
    })
  }

  return (
    <div>
      <h1>Club List</h1>
      <div>
        <input onChange={e => setSearchValue(e.target.value)}/>
      </div>
      { clubsList() }
    </div>
  );
}

