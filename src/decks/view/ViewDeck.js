import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function ViewDeck({ curDeck }) {
  const { url } = useRouteMatch();
  console.log(url);
  return (
    <div className="card border-0" style={{ width: "100%" }} key={curDeck.id}>
      <div className="card-body">
        <h5 className="card-title">{curDeck.name}</h5>
        <p className="card-text">{curDeck.description}</p>
        <Link to={`${url}/edit`} className="card-link">
          <button className="btn-secondary">Edit</button>
        </Link>
        <Link to={`${url}/study`} className="card-link">
          <button className="btn-primary">Study</button>
        </Link>
        <Link to={`${url}/cards/new`} className="card-link">
          <button className="btn-primary">Add Cards</button>
        </Link>
        <Link to="/" className="card-link">
          <button className="btn-danger">Delete</button>
        </Link>
      </div>
    </div>
  );
}

export default ViewDeck;
