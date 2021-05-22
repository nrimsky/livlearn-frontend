// Import FirebaseAuth and firebase.
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Button from "../Button/Button";
import firebase from "firebase/app";
import "firebase/auth";
import { getCurrentUserName } from "../../firebase/AuthService";
import { useHistory } from "react-router-dom";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

type Props = {
  loggedIn: boolean;
};

const SignIn: React.FC<Props> = ({ loggedIn }) => {
  const history = useHistory();
  return (
    <div className="flex justify-center items-center w-screen flex-grow">
      {!loggedIn ? (
        <div className="text-center">
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      ) : (
        <div className="text-center bg-white shadow p-8 sm:w-80">
          <p className="text-gray-700 mb-5 font-medium">
            👋 Hi {getCurrentUserName()?.split(" ")[0] ?? "there"}!
          </p>
          <Button color="green" onClick={() => history.push("/")} text="Home" />
        </div>
      )}
    </div>
  );
};

export default SignIn;
