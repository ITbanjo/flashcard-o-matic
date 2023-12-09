import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";
import BreadCrumb from "../common/BreadCrumb";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const emptyCardData = {
    front: "",
    back: "",
  };
  const [newCardData, setNewCardData] = useState(emptyCardData);

  useEffect(() => {
    async function getDeck() {
      try {
        setDeck(await readDeck(deckId));
      } catch (error) {
        throw error;
      }
    }
    getDeck();
  }, [deckId]);

  return (
    <div>
      <BreadCrumb item1={deck.name} item2="Add Card" />
      <h1>{deck.name}: Add Card</h1>
      <CardForm
        edit={false}
        emptyCardData={emptyCardData}
        newCardData={newCardData}
        setNewCardData={setNewCardData}
      />
    </div>
  );
}

export default AddCard;
