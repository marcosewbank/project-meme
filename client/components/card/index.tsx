import React from "react";
import Image from "next/image";
import { useSocketContext } from "../../context";

type Props = {
  card: any;
  handleClick: () => void;
  disabled: boolean;
};

const Card = ({ card, ...rest }: Props) => {
  const { selectedCard, handleSelectedCard } = useSocketContext();

  const isSelectedCard = selectedCard === card.index;

  return (
    <button
      key={card.id}
      className={`cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transform transition duration-200 hover:scale-105 relative ${
        isSelectedCard && "scale-105"
      }`}
      onClick={() => {
        handleSelectedCard(card.index);
      }}
      {...rest}
    >
      <Image
        className={`object-cover h-64 w-52 rounded-xl border-8 ${
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
