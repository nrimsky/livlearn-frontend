// Import FirebaseAuth and firebase.
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Button from "../Button/Button";
import firebase from "firebase/app";
import "firebase/auth";

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
  if (!loggedIn) {
    return (
      <div className="h-screen relative">
        <div className="my-5">
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="h-screen relative p-5 md:p-10">
      <p className="text-gray-600 mb-5 font-medium">You are now signed in!</p>
      <Button
        color="yellow"
        onClick={() => firebase.auth().signOut()}
        text="Sign Out"
      />
    </div>
  );
};

export default SignIn;
