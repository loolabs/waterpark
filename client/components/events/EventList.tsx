import { SearchItem, SearchResult, useSearch } from "../hooks"
import { EventCard } from "./EventCard";
import { Id, EventInfo } from "../../context";

interface EventListProps {
    eventListData: Map<Id, EventInfo>;
}

const eventsList = (filteredEvents: SearchResult) => {
  return filteredEvents.map((event: SearchItem | { item: SearchItem }) => {
    if ("item" in event) {
      event = event.item as SearchItem;
    }
    return (
      <EventCard
        key={event.id}
        event={{
          id: event.id,
          name: event.name,
          description: event.description,
        }}
      />
    );
  })
}

export const EventList = ({eventListData}: EventListProps) => {
  const [filteredEvents, setSearchValue] = useSearch("", eventListData);

  return (
    <div>
      <h1>Event List</h1>
      <div>
        <input onChange={e => setSearchValue(e.target.value)}/>
      </div>
      { eventsList(filteredEvents) }
    </div>
  );
}

