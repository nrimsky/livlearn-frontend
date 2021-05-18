import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import Button from "../Button/Button";

import firebase from "firebase/app";
import "firebase/firestore";

export default function DeployForm(props: {
  id: string | null;
  onClose: () => void;
}) {
  var db = firebase.firestore();

  const { state } = useContext(AppContext);
  const [generatedId, setGeneratedId] = useState<string | null>(null);

  function saveNewList() {
    db.collection("lists")
      .add({
        ...state,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setGeneratedId(docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  function editExitingList(id: string) {
    db.collection("lists")
      .doc(id)
      .set({
        ...state,
      })
      .then(() => {
        console.log("Document successfully updated!");
        props.onClose();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        props.onClose();
      });
  }

  const onSave = () => {
    if (props.id) {
      editExitingList(props.id);
    } else {
      saveNewList();
    }
  };

  return (
    <div className="w-full">
      <p>
        {props.id
          ? "Update your list with a click of a button!"
          : "Now it's time to deploy your list! Get a unique link to access and share your list of learning resources."}
      </p>
      <div className="mt-4">
        {!generatedId && (
          <Button
            color="green"
            onClick={onSave}
            text={props.id ? "Release changes" : "Generate link"}
          />
        )}
        {generatedId && (
          <a
            href={`${window.location}?id=${generatedId}`}
            className="block underline text-green-500 hover:text-green-600 mt-3"
          >{`${window.location}?id=${generatedId}`}</a>
        )}
      </div>
    </div>
  );
}
