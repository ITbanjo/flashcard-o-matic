import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateDeck() {
  const emptyDeckData = {
    name: "",
    description: "",
  };
  const [newDeckData, setNewDeckData] = useState(emptyDeckData);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createDeck(newDeckData);
      setNewDeckData(emptyDeckData);
      history.push("/");
      //window.location.reload();
    } catch (error) {
      throw error;
    }
  };

  const handleChange = (event) => {
    setNewDeckData({ ...newDeckData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="deck-name">Name</label>
          <input
            id="deck-name"
            value={newDeckData.name}
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
            value={newDeckData.description}
            name="description"
            placeholder="Brief description of the deck"
            className="form-control"
            onChange={handleChange}
          ></textarea>
        </div>
        <Link to="/">
          <button className="btn btn-secondary">Cancel</button>
        </Link>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
