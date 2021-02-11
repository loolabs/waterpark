import React from "react";
import { useRouter } from "next/router";
import { Id, EventInfo } from "../../pages/_app";

type Event = EventInfo & { id: Id };

interface EventCardProps {
  event: Event;
}

export const EventCard = ({event}: EventCardProps) => {
  const { id, name, description } = event;
  const router = useRouter();

  const handleClick = () => {
    router.push({ pathname: `/events/${id}` });
  };

  return (
    <div onClick={handleClick}>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
};
