import React from "react";
import Image from "next/image";

import { playerReady } from "../../context/emit";
import { useSocketContext } from "../../context";

type Props = {
  card: any;
  disabled: boolean;
};

const Card = ({ card, ...rest }: Props) => {
  const { id } = useSocketContext();

  return (
    <button
      key={card.id}
      className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transform transition duration-200 hover:scale-105 relative"
      onClick={() => {
        playerReady({ playerId: id, selectedCardIndex: card.index });
      }}
      {...rest}
    >
      {card?.votes?.length ? (
        <span className="badge badge-primary badge-lg absolute right-2 top-2">
          {card?.votes?.length}
        </span>
      ) : (
        ""
      )}
      <Image
        className="object-cover h-64 w-52 rounded-xl border-8"
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
