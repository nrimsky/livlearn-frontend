// Import FirebaseAuth and firebase.
import React from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

const FinishSignIn = () => {
  const history = useHistory();
  // Confirm the link is a sign-in with email link.
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    var email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt("Please provide your email for confirmation");
    } else {
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then((result) => {
          if (result.additionalUserInfo?.isNewUser) {
            console.log("Hello new user");
          }
          console.log(result.user?.displayName);
          window.localStorage.removeItem("emailForSignIn");
          history.push("/");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  return <p className="m-5 text-gray-900 dark:text-gray-100">Signing you in...</p>;
};

export default FinishSignIn;
