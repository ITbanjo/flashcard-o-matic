import React from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../../utils/api";

function Deck({ deck, setDecks }) {
  const modalMsg = `
Delete this Deck?
  
You will not be able to recover it.`;

  async function modal() {
    try {
      const result = window.confirm(modalMsg);
      if (result) {
        await deleteDeck(deck.id);
        setDecks(await listDecks());
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="card" style={{ width: "100%" }} key={deck.id}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{deck.name}</h5>
          <p className="text-secondary">{deck.cards.length} cards</p>
        </div>

        <p className="card-text">{deck.description}</p>
        <Link to={`/decks/${deck.id}`} className="card-link">
          <button className="btn btn-secondary">View</button>
        </Link>
        <Link to={`/decks/${deck.id}/study`} className="card-link">
          <button className="btn btn-primary">Study</button>
        </Link>
        <button className="btn btn-danger float-right" onClick={modal}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Deck;
