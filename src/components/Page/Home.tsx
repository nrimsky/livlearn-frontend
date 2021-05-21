import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ResourceList from "../../types/ResourceList";
import Entity from "../../types/Entity";
import HomeCard from "../Card/HomeCard";
import { getPublicListsFromFirebase } from "../../firebase/FirestoreService";

const Home = (props: { loggedIn: boolean }) => {
  const history = useHistory();

  const [publicLists, setPublicLists] = useState<Entity<ResourceList>[]>([]);

  const goToListPage = (id: string) => {
    history.push(`/list/${id}`);
  };

  useEffect(() => {
    getPublicListsFromFirebase().then((lists) => {
      setPublicLists(lists);
    });
  }, []);

  return (
    <div className="flex w-screen flex-grow items-center flex-col sm:items-start">
      <h2 className="p-5 w-full text-gray-800 text-xl font-semibold">
        Recently shared lists
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-4 auto-rows-max">
        {publicLists.map((l, i) => {
          return (
            <HomeCard
              title={l.title}
              text={`${l.data.length} items`}
              onLinkClick={() => goToListPage(l.id)}
              key={i}
              linkText={"See List"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
