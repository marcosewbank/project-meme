import React from "react";
import Image from "next/image";
import { useSocketContext } from "../../context";

type Props = {
  card: any;
  handleClick: () => void;
  disabled: boolean;
};

const Card = ({ card, handleClick, disabled }: Props) => {
  const { selectedCard, handleSelectedCard, gameData } = useSocketContext();

  const isSelectedCard = selectedCard === card.index;

  return (
    <button
      key={card.id}
      className={`cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transform transition duration-200 hover:scale-105 relative ${
        isSelectedCard && "scale-105"
      }`}
      onClick={() => {
        if (isSelectedCard) {
          handleClick();
        }

        handleSelectedCard(card.index);
      }}
      disabled={disabled}
    >
      <Image
        className={`object-cover h-64 w-52 rounded-md border-4 ${
          isSelectedCard ? "border-secondary" : ""
        }`}
        unoptimized
        width={200}
        height={200}
        src={card.src}
        alt={card.slug}
      />
    </button>
  );
};

export default Card;
