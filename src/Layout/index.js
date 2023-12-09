import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../decks/home/DeckList";
import ViewDeck from "../decks/view/ViewDeck";
import CreateDeck from "../decks/edit-new/CreateDeck";
import StudyDeck from "../decks/study/StudyDeck";
import { Route, Switch } from "react-router-dom";
import AddCard from "../cards/AddCard";
import EditCard from "../cards/EditCard";
import EditDeck from "../decks/edit-new/EditDeck";

function Layout() {
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
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
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
