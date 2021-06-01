import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ResourceList from "../../types/ResourceList";
import ResourceListCard from "../Card/ResourceListCard";
import { getAllListsForUser } from "../../firebase/FirestoreService";
import CardCollection from "../Card/CardCollection";
import Button from "../Button/Button";

const MyPage = () => {
  const history = useHistory();
  const [myLists, setMyLists] = useState<ResourceList[]>([]);

  useEffect(() => {
    getAllListsForUser().then((lists) => {
      setMyLists(lists);
    });
  }, []);

  return (
    <div className="flex w-screen flex-grow items-center flex-col sm:items-start">
      {myLists.length > 0 ? (
        <CardCollection title={"Recently shared public lists"}>
          {myLists
            .filter((l) => !!l.id)
            .map((l, i) => {
              return <ResourceListCard rl={l} key={l.id!} />;
            })}
        </CardCollection>
      ) : (
        <div className="flex w-screen flex-grow items-center flex-col mt-10 p-10">
          <p className="text-gray-400 pb-8">You haven't saved any lists yet</p>
          <Button
            onClick={() => history.push("/list")}
            text="Create a new list!"
            color="green"
          />
        </div>
      )}
    </div>
  );
};

export default MyPage;
