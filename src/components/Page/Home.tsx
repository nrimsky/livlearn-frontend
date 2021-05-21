import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ResourceList from "../../types/ResourceList";
import firebase from "firebase/app";
import "firebase/firestore";
import HomeCard from "../Card/HomeCard";

export type Entity<T> = T & { id: string };

function docToList(
  docSnapshot: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
): Entity<ResourceList> {
  const docData = docSnapshot.data();
  const id = docSnapshot.id;
  return {
    creatorId: docData.creatorId,
    isPublic: docData.isPublic,
    title: docData.title,
    data: docData.data,
    id: id,
  };
}

async function getPublicListsFromFirebase(): Promise<Entity<ResourceList>[]> {
  const listsRef = firebase.firestore().collection("lists");
  const query = listsRef.where("isPublic", "==", true);
  try {
    const snapshot = await query.get();
    return snapshot.docs.map((s) => {
      return docToList(s) as Entity<ResourceList>;
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

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
