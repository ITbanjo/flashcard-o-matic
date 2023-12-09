import React, { useState, useEffect } from "react";
import DeckForm from "./DeckForm";
import { readDeck } from "../../utils/api";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../common/BreadCrumb";

function EditDeck() {
  const { deckId } = useParams();
  const [editDeckData, setEditDeckData] = useState({});
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function getDeck() {
      try {
        setEditDeckData(await readDeck(deckId));
        setDeck(await readDeck(deckId));
      } catch (error) {
        throw error;
      }
    }
    getDeck();
  }, [deckId]);

  return (
    <div>
      <BreadCrumb item1={deck.name ? deck.name : ""} item2="Edit Deck" />
      <h1>Edit Deck</h1>
      <DeckForm
        edit={true}
        editDeckData={editDeckData}
        setEditDeckData={setEditDeckData}
      />
    </div>
  );
}

export default EditDeck;
