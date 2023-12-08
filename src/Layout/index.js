import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../decks/home/DeckList";
import ViewDeck from "../decks/view/ViewDeck";
import CreateDeck from "../decks/new/CreateDeck";
import StudyDeck from "../decks/study/StudyDeck";
import { Route, Switch } from "react-router-dom";
import { listDecks } from "../utils/api";
import { useState, useEffect } from "react";
import AddCard from "../cards/AddCard";

function Layout() {
  //const [curDeck, setCurDeck] = useState({});

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
