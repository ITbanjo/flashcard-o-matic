import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../home/DeckList";
import { Route, Switch } from "react-router-dom";
import CreateDeck from "../decks-new/CreateDeck";
import DeckView from "../decks-deckid/DeckView";
import DeckStudy from "../decks-deckid-study/DeckStudy";

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
            <DeckView />
          </Route>
          <Route path="/decks/:deckId/study">
            <DeckStudy />
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
