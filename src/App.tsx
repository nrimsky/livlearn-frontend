import React, { useState, useEffect, Suspense, lazy } from "react";
import NavBar from "./components/Nav/NavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FinishSignIn from "./components/Auth/FinishSignIn";
import Footer from "./components/Footer/Footer";
import useMyUserProfile from "./hooks/useMyUserProfile";
import NotFound from "./components/Errors/NotFound";
import Home from "./components/Page/Home";
import Banner, { BannerButtonParams } from "./components/Banner/Banner";
import useBannerMessage, { Message } from "./hooks/useBannerMessage";
import FormPage from "./components/Page/FormPage";

const SignInPage = lazy(() => import("./components/Page/SignInPage"));
const ListPage = lazy(() => import("./components/Page/ListPage"));
const MyPage = lazy(() => import("./components/Page/MyPage"));
const ProfilePage = lazy(() => import("./components/Page/Profile"));
const Roadmap = lazy(() => import("./components/Page/Roadmap"));
const CuratedResources = lazy(
  () => import("./components/Page/CuratedResources")
);
const PrivacyPolicy = lazy(() => import("./helpers/privacyPolicy"));

export const ThemeContext = React.createContext<{
  mode: "dark" | "light";
  onChange: (mode: "dark" | "light") => void;
}>({
  mode: "light",
  onChange: () => {
    return;
  },
});

export const BannerContext = React.createContext<{
  setErrorMessage: (msg: string) => void;
  setBannerMessage: (
    message: Message,
    buttonParams: BannerButtonParams | null
  ) => void;
}>({
  setErrorMessage: () => {
    return;
  },
  setBannerMessage: () => {
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

  const {
    isError,
    message,
    setErrorMessage,
    setBannerMessage,
    clearBanner,
    buttonParams,
  } = useBannerMessage(
    {
      long: "Welcome to livlearn beta. We're excited to have you onboard!",
      short: "livlearn beta is here!",
    },
    {
      content: <Link to="/feedback">Say hi</Link>,
    }
  );

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
            {message && (
              <Banner
                clearBanner={clearBanner}
                isError={isError}
                longText={message.long}
                shortText={message.short}
                buttonParams={buttonParams ?? undefined}
              />
            )}
            <NavBar uid={uid} />
            <Suspense fallback={<NotFound text="Loading..." />}>
              <BannerContext.Provider
                value={{
                  setErrorMessage: setErrorMessage,
                  setBannerMessage: setBannerMessage,
                }}
              >
                <Switch>
                  <Route exact path="/">
                    <Home profile={profile} />
                  </Route>
                  <Route exact path="/roadmap">
                    <Roadmap />
                  </Route>
                  <Route exact path="/curatedresources">
                    <CuratedResources profile={profile} />
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
                  <Route exact path="/privacy">
                    <PrivacyPolicy />
                  </Route>
                  <Route exact path="/feedback">
                    <FormPage />
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
              </BannerContext.Provider>
            </Suspense>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}
