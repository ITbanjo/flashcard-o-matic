import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Deck from "./Deck";
import { listDecks } from "../../utils/api";

function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      try {
        setDecks(await listDecks());
      } catch (error) {
        throw error;
      }
    }
    loadDecks();
  }, []);

  return (
    <div>
      <Link to="/decks/new">
        <button className="btn-secondary">Create</button>
      </Link>

      {decks.map((deck) => (
        <Deck deck={deck} setDecks={setDecks} />
      ))}
    </div>
  );
}

export default DeckList;
