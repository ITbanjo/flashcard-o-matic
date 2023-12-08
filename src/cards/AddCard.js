import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";

function AddCard({ curDeck, setCurDeck }) {
  const { deckId } = useParams();
  const emptyCardData = {
    front: "",
    back: "",
  };
  const [newCardData, setNewCardData] = useState(emptyCardData);

  useEffect(() => {
    async function getDeck() {
      try {
        setCurDeck(await readDeck(deckId));
      } catch (error) {
        throw error;
      }
    }
    getDeck();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createCard(deckId, newCardData);
      setNewCardData(emptyCardData);
    } catch (error) {
      throw error;
    }
  };

  const handleChange = (event) => {
    setNewCardData({
      ...newCardData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h1>{curDeck.name}: Add Card</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="card-front">Front</label>
          <textarea
            id="card-front"
            value={newCardData.front}
            name="front"
            placeholder="Front side of card"
            className="form-control"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label for="card-back">Back</label>
          <textarea
            id="card-back"
            value={newCardData.back}
            name="back"
            placeholder="Back side of card"
            className="form-control"
            onChange={handleChange}
          ></textarea>
        </div>
        <Link to="/">
          <button className="btn btn-secondary">Done</button>
        </Link>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddCard;
