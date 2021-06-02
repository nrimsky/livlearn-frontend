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
  } else {
    url = "https://resourceee.web.app/finishSignIn";
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
    <div className="text-center p-5 max-w-md mx-5 mt-5 mb-10 bg-white shadow rounded">
      {done ? (
        <p className="text-xs text-gray-700">
          🎉 An email has been sent to {email}! Check your inbox for a link to
          sign in!
        </p>
      ) : (
        <>
          <Input
            value={email}
            placeholder={"Enter your email"}
            onChange={(n: string) => setEmail(n)}
            name={"Login with just an email - no password needed!"}
          />
          <Button color="green" className="mr-1" onClick={login} text="Login" /> or 
          <Button
            color="yellow"
            onClick={loginTest}
            text="Try a test account"
            className="ml-2"
          />
        </>
      )}
    </div>
  );
};

export default SignIn;
