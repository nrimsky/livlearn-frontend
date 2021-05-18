import React, { useContext } from "react";
import { AppContext } from "../../App";
import Button from "../Button/Button";

import firebase from "firebase/app";
import "firebase/firestore";

export default function DeployForm(props: { onClose: () => void }) {
  var db = firebase.firestore();

  const { state } = useContext(AppContext);

  function saveList() {
    db.collection("lists")
      .add({
        ...state,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  const onSave = () => {
    saveList();
    props.onClose();
  };

  return (
    <div className="w-full">
      <p>Now it's time to deploy your list! Get a unique link to access and share your list of learning resources.</p>
      <div className="mt-4">
        <Button color="green" onClick={onSave} text="Generate link" />
      </div>
    </div>
  );
}
