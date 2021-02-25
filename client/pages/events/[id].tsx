import React from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AppContext } from "../_app";

export default function EventDetail() {
  const appData = useContext(AppContext);
  const router = useRouter();

  const { id } = router.query;
  if (typeof id !== 'string') return null;

  const { name, description } = appData.events.get(parseInt(id));

  return (
    <div>
      <h1>Event Details</h1>
      <p>{id}</p>
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
}
