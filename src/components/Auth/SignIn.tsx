// Import FirebaseAuth and firebase.
import React, { useState } from "react";
import Button from "../Button/Button";
import firebase from "firebase/app";
import "firebase/auth";
import LabelledInput from "../Form/LabelledInputs/LabelledInput";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const history = useHistory();

  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/finishSignIn"
      : "https://howshouldilearn.com/finishSignIn";

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
    <div className="text-center max-w-md mb-12 px-5 pb-12">
      <div className="text-center p-5 max-w-md mb-3 bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-500 shadow-sm">
        {done ? (
          <>
            <p className="text-gray-900 dark:text-white">
              🎉 An email has been sent to {email}! Check your inbox for a link
              to sign in!
            </p>
            <p className="text-sm mt-1 text-gray-900 dark:text-white">
              Please note that you must open the email link on the same device
              and browser.
            </p>
          </>
        ) : (
          <>
            <LabelledInput
              value={email}
              placeholder={"Enter your email"}
              onChange={(n: string) => setEmail(n)}
              name={"Get access with passwordless login"}
            />
            <Button
              color="green"
              className="mx-auto mt-2"
              onClick={login}
              text="Login / Sign up"
            />
          </>
        )}
      </div>
      {!done && (
        <Button
          color="yellow"
          onClick={loginTest}
          text="Try a test account"
          className="mx-auto"
        />
      )}
    </div>
  );
};

export default SignIn;
