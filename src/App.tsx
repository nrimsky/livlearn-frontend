import React, { useState, useEffect } from "react";
import NavBar from "./components/Nav/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import firebase from "firebase/app";
import "firebase/auth";
import Home from "./components/Page/Home";
import ListPage from "./components/Page/ListPage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar loggedIn={loggedIn} />
        <Switch>
          <Route exact path="/">
            <Home loggedIn={loggedIn} />
          </Route>
          <Route path="/auth">
            <SignIn loggedIn={loggedIn} />
          </Route>
          <Route exact path="/list">
            <ListPage />
          </Route>
          <Route path="/list/:id" children={<ListPage />} />
          <Route path="*">
            <h1 className="p-5">Sorry this page was not found</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
