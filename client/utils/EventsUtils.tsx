import { Id, EventInfo } from "../context";

export const formatEventsData = (eventsData) => {
    const eventsMap = new Map<Id, EventInfo>();
    for (const event of eventsData) {
        eventsMap.set(
            event.id ?? 0,
            {
                name: event.name ?? "",
                description: event.description ?? ""
            }
        )
    }
    return new Map<Id, EventInfo>(eventsMap);
}
