import React, { createContext, useContext, useEffect, useState } from 'react';
import { formatClubsData, formatEventsData } from "../utils";

interface AppData {
    clubs: Map<Id, ClubInfo>;
    events: Map<Id, EventInfo>;
}

export interface ClubInfo {
    name: string
    description: string
}

export interface EventInfo {
    name: string
    description: string
}

export type Id = number;

export const CLUBS = [
    {
        id: 2932,
        name: 'UW Ballroom',
        description: 'dancing in the dark',
    },
    {
        id: 8888,
        name: 'Cooking club',
        description: 'chef curry with the shot',
    },
    {
        id: 111,
        name: 'Loo Labs',
        description: '👩‍🔬',
    }
];

export const EVENTS = [
    {
        id: 1234,
        name: "Tech+ Mock Interview",
        description: "dancing in the dark",
    },
    {
        id: 6787,
        name: "ARBUS Society Movie Night",
        description: "chef curry with the shot",
    },
    {
        id: 6367,
        name: "UWACC Open Auditions",
        description: "👩‍🔬",
    }
];

export const AppContext = createContext<AppData>(null);

export const AppProvider = ({ children }) => {
    const [clubs, setClubs] = useState<Map<Id, ClubInfo>>(formatClubsData([]));
    const [events, setEvents] = useState<Map<Id, EventInfo>>(formatEventsData([]));

    useEffect(() => {
        // make API call
        setClubs(formatClubsData(CLUBS));
        setEvents(formatEventsData(EVENTS));
    }, []);

    return (
        <AppContext.Provider
            value={{
                clubs,
                events
            }}
        >
            { children }
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}
