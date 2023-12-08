import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../../utils/api";

function Deck({ deck, setDecks }) {
  const [modalStatus, setModalStatus] = useState(false);
  const modalMsg = `
Delete this Deck?
  
You will not be able to recover it.`;

  useEffect(() => {
    if (modalStatus) {
      async function handleDelete() {
        try {
          await deleteDeck(deck.id);
          setDecks(await listDecks());
        } catch (error) {
          throw error;
        }
      }
      handleDelete();
    }
  }, [modalStatus]);

  return (
    <div className="card" style={{ width: "100%" }} key={deck.id}>
      <div className="card-body">
        <h5 className="card-title">{deck.name}</h5>
        <p className="card-text">{deck.description}</p>
        <Link to={`/decks/${deck.id}`} className="card-link">
          <button className="btn-secondary">View</button>
        </Link>
        <Link to={`/decks/${deck.id}/study`} className="card-link">
          <button className="btn-primary">Study</button>
        </Link>
        <button
          className="btn-danger"
          onClick={() => {
            setModalStatus(window.confirm(modalMsg));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Deck;
