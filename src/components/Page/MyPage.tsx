import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ResourceList from "../../types/ResourceList";
import HomeCard from "../Card/HomeCard";
import { getAllListsForUser } from "../../firebase/FirestoreService";
import CardCollection from "../Card/CardCollection";

const MyPage = () => {
  const history = useHistory();
  const [myLists, setMyLists] = useState<ResourceList[]>([]);

  const goToListPage = (id: string) => {
    history.push(`/list/${id}`);
  };

  useEffect(() => {
    getAllListsForUser().then((lists) => {
      setMyLists(lists);
    });
  }, []);

  return (
    <div className="flex w-screen flex-grow items-center flex-col sm:items-start">
      <CardCollection title={"Your Lists"}>
        {myLists.filter(i => !!i.id).map((l, i) => {
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

export default MyPage;
