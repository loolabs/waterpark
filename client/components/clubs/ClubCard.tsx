import React from "react";
import { useRouter } from "next/router";
import { Id, ClubInfo } from "../../pages/_app";

type Club = ClubInfo & { id: Id };

interface ClubCardProps {
  club: Club;
}

export const ClubCard = ({club}: ClubCardProps) => {
  const { id, name, description } = club;
  const router = useRouter();

  const handleClick = () => {
    router.push({ pathname: `/clubs/${id}` });
  };

  return (
    <div onClick={handleClick}>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
};
