import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ResourceList from "../../types/ResourceList";
import HomeCard from "../Card/HomeCard";
import { getPublicListsFromFirebase } from "../../firebase/FirestoreService";
import CardCollection from "../Card/CardCollection";

const Home = (props: { loggedIn: boolean }) => {
  const history = useHistory();

  const [publicLists, setPublicLists] = useState<ResourceList[]>([]);

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
      <CardCollection title={"Recently shared lists"}>
        {publicLists
          .filter((l) => !!l.id)
          .map((l, i) => {
            return (
              <HomeCard
                title={l.title}
                text={`${l.data.length} items`}
                onLinkClick={() => goToListPage(l.id!)}
                key={i}
                linkText={"See List"}
              />
            );
          })}
      </CardCollection>
    </div>
  );
};

export default Home;
