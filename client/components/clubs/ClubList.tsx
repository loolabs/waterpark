import { SearchItem, SearchResult, useSearch } from "../hooks";
import { ClubCard } from "./ClubCard";
import { Id, ClubInfo } from "../../context";

interface ClubListProps {
  clubListData: Map<Id, ClubInfo>;
}

const clubsList = (filteredClubs: SearchResult) => {
  return filteredClubs.map((club: SearchItem | { item: SearchItem }) => {
    if ("item" in club) {
      club = club.item as SearchItem;
    }
    return (
      <ClubCard
        key={club.id}
        club={{
          id: club.id,
          name: club.name,
          description: club.description,
        }}
      />
    );
  })
}

export const ClubList = ({clubListData}: ClubListProps) => {
  const [filteredClubs, setSearchValue] = useSearch("", clubListData);

  return (
    <div>
      <h1>Club List</h1>
      <div>
        <input onChange={e => setSearchValue(e.target.value)}/>
      </div>
      { clubsList(filteredClubs) }
    </div>
  );
}
