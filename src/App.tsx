import React, { useState, useEffect } from "react";
import NavBar from "./components/Nav/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignInPage from "./components/Page/SignInPage";
import Home from "./components/Page/Home";
import ListPage from "./components/Page/ListPage";
import MyPage from "./components/Page/MyPage";
import FinishSignIn from "./components/Auth/FinishSignIn";
import Footer from "./components/Footer/Footer";
import ProfilePage from "./components/Page/Profile";
import Roadmap from "./components/Page/Roadmap";
import useMyUserProfile from "./hooks/useMyUserProfile";
import NotFound from "./components/Errors/NotFound";

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
  const { uid, profile } = useMyUserProfile();

  const [darkMode, setDarkMode] = useState<"dark" | "light">("dark");

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
            <NavBar uid={uid} />
            <Switch>
              <Route exact path="/">
                <Home profile={profile} />
              </Route>
              <Route exact path="/roadmap">
                <Roadmap />
              </Route>
              <Route exact path="/u">
                {uid ? (
                  <MyPage />
                ) : (
                  <NotFound text="You must be logged in to view this page" />
                )}
              </Route>
              <Route path="/auth">
                {uid ? (
                  <NotFound text="You are already logged in" />
                ) : (
                  <SignInPage />
                )}
              </Route>
              <Route path="/finishSignIn">
                {uid ? (
                  <NotFound text="You are already logged in" />
                ) : (
                  <FinishSignIn />
                )}
              </Route>
              <Route exact path="/list">
                <ListPage />
              </Route>
              <Route
                path="/profile/:profileOwnerUid"
                children={
                  <ProfilePage
                    currentUserId={uid}
                    currentUserProfile={profile}
                  />
                }
              />
              <Route path="/list/:id" children={<ListPage />} />
              <Route path="*">
                <NotFound text="Sorry, this page was not found" />
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}
