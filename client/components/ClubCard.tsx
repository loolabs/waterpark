import React from "react";
import styles from "../styles/ClubCard.module.css";
import { useRouter } from "next/router";
import { ClubId, ClubInfo } from "../pages/_app";

type Club = ClubInfo & { id: ClubId };

interface ClubCardProps {
  club: Club;
}

const ClubCard = (props: ClubCardProps) => {
  const { id, name, description } = props.club;
  const router = useRouter();

  const handleClick = () => {
    router.push({ pathname: `/clubs/${id}` });
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <h1>Club Card</h1>
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
};

export default ClubCard;
