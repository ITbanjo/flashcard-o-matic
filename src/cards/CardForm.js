import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { createCard, updateCard } from "../utils/api";

function CardForm({
  edit,
  editCardData,
  setEditCardData,
  emptyCardData,
  newCardData,
  setNewCardData,
}) {
  const { deckId } = useParams();
  const history = useHistory();

  const handleChange = (event) => {
    if (edit) {
      setEditCardData({
        ...editCardData,
        [event.target.name]: event.target.value,
      });
    } else {
      setNewCardData({
        ...newCardData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (edit) {
        await updateCard(editCardData);
        history.push(`/decks/${deckId}`);
      } else {
        await createCard(deckId, newCardData);
        setNewCardData(emptyCardData);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label for="card-front">Front</label>
        <textarea
          id="card-front"
          value={edit ? editCardData.front : newCardData.front}
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
          value={edit ? editCardData.back : newCardData.back}
          name="back"
          placeholder="Back side of card"
          className="form-control"
          onChange={handleChange}
        ></textarea>
      </div>
      {edit ? (
        <div>
          <Link to={`/decks/${deckId}`}>
            <button className="btn btn-secondary">Cancel</button>
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      ) : (
        <div>
          <Link to={`/decks/${deckId}`}>
            <button className="btn btn-secondary">Done</button>
          </Link>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      )}
    </form>
  );
}

export default CardForm;
