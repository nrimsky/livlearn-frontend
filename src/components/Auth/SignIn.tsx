// Import FirebaseAuth and firebase.
import React, { useState } from "react";
import Button from "../Button/Button";
import firebase from "firebase/app";
import "firebase/auth";
import Input from "../Form/Input";
import { useHistory } from "react-router-dom";

const SignIn = () => {

  const history = useHistory();

  let url = "";

  if (window.location.hostname === "localhost") {
    url = "http://localhost:3000/finishSignIn";
  } else if (window.location.hostname[0] === "l") {
    url = "https://livlearn.web.app/finishSignIn";
  } else {
    url = "https://howshouldilearn.com/finishSignIn";
  }
  var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: url,
    handleCodeInApp: true,
  };

  const login = () => {
    firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        setDone(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loginTest = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="text-center p-5 max-w-md mb-12 bg-white rounded border border-gray-300 shadow-sm">
      {done ? (
        <p className="text-gray-900">
          🎉 An email has been sent to {email}! Check your inbox for a link to
          sign in!
        </p>
      ) : (
        <>
          <Input
            value={email}
            placeholder={"Enter your email"}
            onChange={(n: string) => setEmail(n)}
            name={"Get access with passwordless login"}
          />
          <Button color="green" className="mr-1 mt-2 sm:mt-0" onClick={login} text="Login / Sign up" /> <span className="text-gray-500 font-medium">or</span>
          <Button
            color="yellow"
            onClick={loginTest}
            text="Try a test account"
            className="ml-2 mt-2 sm:mt-0"
          />
        </>
      )}
    </div>
  );
};

export default SignIn;
