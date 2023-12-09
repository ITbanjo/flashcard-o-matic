import React from "react";
import { useState } from "react";
import DeckForm from "./DeckForm";
import BreadCrumb from "../../common/BreadCrumb";

function CreateDeck() {
  const emptyDeckData = {
    name: "",
    description: "",
  };
  const [newDeckData, setNewDeckData] = useState(emptyDeckData);

  return (
    <div>
      <BreadCrumb item1="Create Deck" />
      <h1>Create Deck</h1>
      <DeckForm
        edit={false}
        emptyDeckData={emptyDeckData}
        newDeckData={newDeckData}
        setNewDeckData={setNewDeckData}
      />
    </div>
  );
}

export default CreateDeck;
