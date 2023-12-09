import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck, readCard } from "../utils/api";
import CardForm from "./CardForm";
import BreadCrumb from "../common/BreadCrumb";

function EditCard() {
  const { deckId, cardId } = useParams();
  const [editCardData, setEditCardData] = useState({});
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function getCard() {
      try {
        setEditCardData(await readCard(cardId));
        setDeck(await readDeck(deckId));
      } catch (error) {
        throw error;
      }
    }
    getCard();
  }, [deckId, cardId]);

  return (
    <div>
      <BreadCrumb item1={`Deck ${deck.name}`} item2={`Edit Card ${cardId}`} />
      <h1>Edit Card</h1>
      <CardForm
        edit={true}
        editCardData={editCardData}
        setEditCardData={setEditCardData}
      />
    </div>
  );
}

export default EditCard;
