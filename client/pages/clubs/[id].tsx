import React from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AppContext } from "../_app";

export default function ClubDetail() {
  const appData = useContext(AppContext);
  const router = useRouter();

  const { id } = router.query;
  if (typeof id !== 'string') return null;

  const { name, description } = appData.clubs.get(parseInt(id));

  return (
    <div>
      <h1>Club Details</h1>
      <p>{id}</p>
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
}
