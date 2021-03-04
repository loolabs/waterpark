import React from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../context";

export default function EventDetail() {
  const { events } = useAppContext();
  const router = useRouter();

  const { id } = router.query;
  if (typeof id !== 'string') return null;

  const { name, description } = events.get(parseInt(id));

  return (
    <div>
      <h1>Event Details</h1>
      <p>{id}</p>
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
}
