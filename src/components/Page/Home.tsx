import React, { useState, useEffect } from "react";
import ResourceList from "../../types/ResourceList";
import ResourceListCard from "../Card/ResourceListCard";
import { getPublicListsFromFirebase } from "../../firebase/FirestoreService";
import CardCollection from "../Card/CardCollection";

const Home = (props: { loggedIn: boolean }) => {

  const [publicLists, setPublicLists] = useState<ResourceList[]>([]);

  useEffect(() => {
    getPublicListsFromFirebase().then((lists) => {
      setPublicLists(lists);
    });
  }, []);

  return (
    <div className="flex w-screen flex-grow items-center flex-col sm:items-start">
      <h1 className="w-full text-gray-400 text-2xl font-semibold px-5 pt-5">
        a place to share lists of learning resources
      </h1>
      <CardCollection title={"Recently shared public lists"}>
        {publicLists
          .filter((l) => !!l.id)
          .map((l) => {
            return <ResourceListCard rl={l} key={l.id!} />;
          })}
      </CardCollection>
    </div>
  );
};

export default Home;
