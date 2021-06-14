import React, { useState, useEffect } from "react";
import NavBar from "./components/Nav/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignInPage from "./components/Page/SignInPage";
import { onAuthStateChanged } from "./firebase/AuthService";
import Home from "./components/Page/Home";
import ListPage from "./components/Page/ListPage";
import MyPage from "./components/Page/MyPage";
import FinishSignIn from "./components/Auth/FinishSignIn";
import Footer from "./components/Footer/Footer";
import ProfilePage from "./components/Page/Profile";
import Roadmap from "./components/Page/Roadmap";

export const ThemeContext = React.createContext<{
  mode: "dark" | "light";
  onChange: (mode: "dark" | "light") => void;
}>({
  mode: "light",
  onChange: () => {
    return;
  },
});

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged((l) => setLoggedIn(l));
    return () => unregisterAuthObserver();
  }, []);

  useEffect(() => {
    let matched = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (matched) {
      setDarkMode("dark");
    } else {
      setDarkMode("light");
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        mode: darkMode,
        onChange: (mode: "dark" | "light") => {
          setDarkMode(mode);
        },
      }}
    >
      <Router>
        <div className={darkMode}>
          <div className="min-h-screen flex flex-col w-full bg-gray-100 dark:bg-gray-800">
            <NavBar loggedIn={loggedIn} />
            <Switch>
              <Route exact path="/">
                <Home loggedIn={loggedIn} />
              </Route>
              <Route exact path="/roadmap">
                <Roadmap />
              </Route>
              <Route exact path="/u">
                {loggedIn ? (
                  <MyPage />
                ) : (
                  <h1 className="p-5 text-gray-900 dark:text-white">
                    You must be logged in to view this page
                  </h1>
                )}
              </Route>
              <Route path="/auth">
                {loggedIn ? (
                  <h1 className="p-5 text-gray-900 dark:text-white">
                    You are already logged in
                  </h1>
                ) : (
                  <SignInPage />
                )}
              </Route>
              <Route path="/finishSignIn">
                {loggedIn ? (
                  <h1 className="p-5 text-gray-900 dark:text-white">
                    You are already logged in
                  </h1>
                ) : (
                  <FinishSignIn />
                )}
              </Route>
              <Route exact path="/list">
                <ListPage />
              </Route>
              <Route path="/profile/:uid" children={<ProfilePage />} />
              <Route path="/list/:id" children={<ListPage />} />
              <Route path="*">
                <h1 className="p-5 text-gray-900 dark:text-white">
                  Sorry this page was not found
                </h1>
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}
