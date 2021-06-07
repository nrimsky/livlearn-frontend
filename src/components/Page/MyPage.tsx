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

  const createButton = (
    <Button
      onClick={() => history.push("/list")}
      text="Create a new list"
      color="green"
      className="m-2 border border-green-500"
    />
  );

  return (
    <div className="flex w-full flex-grow items-center flex-col sm:items-start max-w-screen-2xl mx-auto">
      {myLists.length > 0 ? (
        <>
          <CardCollection title={`Your lists (${myLists.length})`}>
            {myLists
              .filter((l) => !!l.id)
              .map((l, i) => {
                return <ResourceListCard rl={l} key={l.id!} />;
              })}
          </CardCollection>
          <div className="mx-auto">{createButton}</div>
        </>
      ) : (
        <div className="flex w-full flex-grow items-center flex-col mt-10 p-10">
          <p className="text-gray-500 pb-8">You haven't saved any lists yet</p>
          {createButton}
        </div>
      )}
    </div>
  );
};

export default MyPage;
