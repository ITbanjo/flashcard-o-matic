import React, { useState, useEffect } from "react";
import { useParams, useRouteMatch, useHistory, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";

function StudyDeck() {
  const { deckId } = useParams();
  const [showBack, setShowBack] = useState(false);
  const [deck, setDeck] = useState({});

  const history = useHistory();

  useEffect(() => {
    async function getDeck() {
      try {
        setDeck(await readDeck(deckId));
        console.log(deck);
      } catch (error) {
        throw error;
      }
    }
    getDeck();
  }, []);

  let index = 0;
  const nextCard = () => {
    if (index + 1 < deck.cards.length) {
      index += 1;
      setShowBack(false);
    }
    if (index + 1 === deck.cards.length) {
      const modalMsg = `Restart Cards?

  Click 'cancel' to return to the home page.`;

      const result = window.confirm(modalMsg);
      if (result) {
        index = 0;
      } else {
        index = 0;
        history.push("/");
      }
    }
  };

  // if (cards.length < 3) {
  //   return (
  //     <div>
  //       <h1>Study: {deck.name}</h1>
  //       <h4>Not enough cards.</h4>
  //       <p>
  //         You need at least 3 cards to study. There are {cards.length} cards in
  //         this deck.
  //       </p>
  //       <Link to={`cards/new`}>
  //         <button className="btn btn-primary">Add Cards</button>
  //       </Link>
  //     </div>
  //   );
  // } else {
  return (
    <div>
      <h1>Study: {deck.name}</h1>
      <div className="card" style={{ width: "100%" }}>
        <div className="card-body">
          <h5 className="card-title">
            {deck.cards && `${index + 1} of ${deck.cards.length}`}
          </h5>
          {showBack ? (
            <p className="card-text">{deck.cards[index].back}</p>
          ) : (
            <p className="card-text">{deck.cards[index].front}</p>
          )}

          <button
            className="btn btn-secondary"
            onClick={() => setShowBack(!showBack)}
          >
            Flip
          </button>
          {showBack && (
            <button className="btn btn-primary" onClick={() => nextCard()}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
  //return <p>placeholder</p>;
}
//}

export default StudyDeck;
