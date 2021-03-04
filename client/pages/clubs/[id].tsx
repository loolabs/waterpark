import React from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../context";

export default function ClubDetail() {
  const { clubs } = useAppContext();
  const router = useRouter();

  const { id } = router.query;
  if (typeof id !== 'string') return null;

  const { name, description } = clubs.get(parseInt(id));

  return (
    <div>
      <h1>Club Details</h1>
      <p>{id}</p>
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
}
