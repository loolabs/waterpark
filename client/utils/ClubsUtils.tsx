import { Id, ClubInfo } from "../context";

export const formatClubsData = (clubsData) => {
    const clubsMap = new Map<Id, ClubInfo>();
    for (const club of clubsData) {
        clubsMap.set(
            club.id ?? 0,
            {
                name: club.name ?? "",
                description: club.description ?? ""
            }
        )
    }
    return new Map<Id, ClubInfo>(clubsMap);
}
