import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";
import BreadCrumb from "../../common/BreadCrumb";

function StudyDeck() {
  const { deckId } = useParams();
  const [flip, setFlip] = useState(true);
  const [deck, setDeck] = useState({});
  const [cardCount, setCardCount] = useState(0);
  const [index, setIndex] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    async function showCard() {
      const cardList = await readDeck(deckId, abortController.signal);
      setDeck(cardList);
      setCardCount(cardList.cards.length);
    }

    showCard();
    return () => abortController.abort();
  }, [deckId]);

  function flipCard() {
    setFlip(!flip);
  }

  function next() {
    if (index < cardCount - 1) {
      setIndex(index + 1);
      setFlip(true);
    } else {
      const modalMsg = `Restart Cards?

Click 'cancel' to return to the home page.`;

      const restart = window.confirm(modalMsg);
      if (restart) {
        setIndex(0);
        setFlip(true);
      } else {
        history.push("/");
      }
    }
  }

  if (cardCount < 3) {
    return (
      <div>
        <BreadCrumb item1={deck.name} item2="Study" />
        <h1>{deck.name}: Study</h1>
        <h4> Not Enough Cards.</h4>
        <p>
          {" "}
          You need at least 3 cards to study. There are {cardCount} cards in
          this deck
        </p>
        <button
          className="btn btn-primary"
          onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
        >
          Add Cards
        </button>
      </div>
    );
  } else {
    return (
      <>
        <BreadCrumb item1={deck.name} item2="Study" />
        <div className="card-body border rounded p-4 my-2">
          <div className="card-title">
            <h4>
              Card {index + 1} of {cardCount}
            </h4>
            <p>{flip ? deck.cards[index].front : deck.cards[index].back}</p>
          </div>
          <div className="buttons">
            <button className="btn btn-secondary mx-1" onClick={flipCard}>
              Flip
            </button>
            {!flip && (
              <button className="btn btn-primary" onClick={next}>
                Next
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default StudyDeck;
