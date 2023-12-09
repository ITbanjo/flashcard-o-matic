import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useParams, useHistory } from "react-router-dom";
import { deleteDeck, readDeck } from "../../utils/api";
import ViewDeckCard from "./ViewDeckCard";
import BreadCrumb from "../../common/BreadCrumb";

function ViewDeck() {
  const [deck, setDeck] = useState({});
  const { url } = useRouteMatch();
  const { deckId } = useParams();
  const history = useHistory();

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

  const modalMsg = `
Delete this Deck?
  
You will not be able to recover it.`;

  async function modal() {
    try {
      const result = window.confirm(modalMsg);
      if (result) {
        await deleteDeck(deckId);
        history.push("/");
      }
    } catch (error) {
      throw error;
    }
  }

  if (deck.cards) {
    return (
      <>
        <BreadCrumb item1={deck.name} />
        <div className="card border-0" style={{ width: "100%" }} key={deck.id}>
          <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            <p className="card-text">{deck.description}</p>
            <Link to={`${url}/edit`} className="card-link">
              <button className="btn btn-secondary">Edit</button>
            </Link>
            <Link to={`${url}/study`} className="card-link">
              <button className="btn btn-primary">Study</button>
            </Link>
            <Link to={`${url}/cards/new`} className="card-link">
              <button className="btn btn-primary">Add Cards</button>
            </Link>

            <button className="btn btn-danger float-right" onClick={modal}>
              Delete
            </button>
            <h2 className="card-text mt-5">Cards</h2>
          </div>
          {deck.cards.map((card) => (
            <ViewDeckCard card={card} setDeck={setDeck} />
          ))}
        </div>
      </>
    );
  } else {
    return <h4>Loading...</h4>;
  }
}

export default ViewDeck;
