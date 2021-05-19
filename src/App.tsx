import React, { useState, useEffect } from "react";
import NavBar from "./components/Nav/NavBar";
import MakeList from "./components/Page/MakeList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import firebase from "firebase/app";
import "firebase/auth";

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
      <NavBar loggedIn={loggedIn} />
      <Switch>
        <Route path="/auth">
          <SignIn loggedIn={loggedIn} />
        </Route>
        <Route path="/new">
          <MakeList />
        </Route>
        <Route path="/">
          <MakeList />
        </Route>
      </Switch>
    </Router>
  );
}
