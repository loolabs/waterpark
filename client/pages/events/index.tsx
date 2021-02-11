import React from "react";
import { useContext } from "react";
import { AppContext } from "../_app";
import { EventList } from "../../components/events";

export default function Events() {
  const {events: eventListData} = useContext(AppContext);
  
  return (
    <EventList eventListData={eventListData}/>
  );
}

