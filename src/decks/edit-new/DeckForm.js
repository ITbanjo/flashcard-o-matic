import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createDeck, updateDeck } from "../../utils/api";

function DeckForm({
  edit,
  editDeckData,
  setEditDeckData,
  emptyDeckData,
  newDeckData,
  setNewDeckData,
}) {
  const { deckId } = useParams();
  const history = useHistory();

  const handleChange = (event) => {
    if (edit) {
      setEditDeckData({
        ...editDeckData,
        [event.target.name]: event.target.value,
      });
    } else {
      setNewDeckData({
        ...newDeckData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (edit) {
        await updateDeck(editDeckData);
        history.push(`/decks/${deckId}`);
      } else {
        await createDeck(newDeckData);
        setNewDeckData(emptyDeckData);
        history.push(`/`);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label for="deck-name">Name</label>
        <input
          id="deck-name"
          value={edit ? editDeckData.name : newDeckData.name}
          name="name"
          placeholder="Deck Name"
          className="form-control"
          onChange={handleChange}
        ></input>
      </div>
      <div className="form-group">
        <label for="deck-description">Description</label>
        <textarea
          id="deck-description"
          value={edit ? editDeckData.description : newDeckData.description}
          name="description"
          placeholder="Brief description of the deck"
          className="form-control"
          onChange={handleChange}
        ></textarea>
      </div>

      <div>
        <Link to={edit ? `/decks/${deckId}` : `/`}>
          <button className="btn btn-secondary mr-1">Cancel</button>
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}

export default DeckForm;
