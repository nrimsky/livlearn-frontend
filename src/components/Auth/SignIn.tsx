// Import FirebaseAuth and firebase.
import React, { useState } from "react";
import Button from "../Button/Button";
import firebase from "firebase/app";
import "firebase/auth";
import Input from "../Form/Input";

const SignIn = () => {

  let url = "";

  if ( window.location.hostname === "localhost") {
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

  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="flex justify-center items-center w-screen flex-grow">
      <div className="text-center p-5 max-w-md m-5 bg-white shadow-xl rounded-2xl">
        <Input
          value={email}
          placeholder={"Enter your email"}
          onChange={(n: string) => setEmail(n)}
          name={"Login with just your email - no passwords needed!"}
        />
        <Button color="green" onClick={login} text="Login" />
        { done && <p className="text-xs mt-3 text-gray-700">🎉 An email has been sent to {email}! Check your inbox for a link to sign in!</p>}
      </div>
    </div>
  );
};

export default SignIn;
