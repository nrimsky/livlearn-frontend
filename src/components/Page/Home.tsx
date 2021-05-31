import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ResourceList from "../../types/ResourceList";
import HomeCard from "../Card/HomeCard";
import { getPublicListsFromFirebase } from "../../firebase/FirestoreService";
import CardCollection from "../Card/CardCollection";
import ResourceListItem from "../../types/ResourceListItem";
import MediaType from "../../types/MediaType";

const getStats = (items: ResourceListItem[]) => {
  const counts = [0, 0, 0, 0, 0, 0, 0, 0];
  const titles = [
    "Podcasts",
    "Books",
    "Audiobooks",
    "Blogs",
    "Articles",
    "Online Courses",
    "Video",
    "Other",
  ];
  for (const i of items) {
    switch (i.type) {
      case MediaType.Podcast:
        counts[0]++;
        break;
      case MediaType.Book:
        counts[1]++;
        break;
      case MediaType.AudioBook:
        counts[2]++;
        break;
      case MediaType.Blog:
        counts[3]++;
        break;
      case MediaType.Article:
        counts[4]++;
        break;
      case MediaType.OnlineCourse:
        counts[5]++;
        break;
      case MediaType.FreeVideo:
        counts[6]++;
        break;
      case MediaType.Other:
        counts[7]++;
        break;
    }
  }
  const parts = [];
  for (let i = 0; i < counts.length; i++) {
    if (counts[i] > 0) {
      parts.push(`${counts[i]} ${titles[i]}`);
    }
  }
  return parts.join(", ");
};

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
      <h1 className="w-full text-gray-400 text-2xl font-semibold px-5 pt-5">a place to share lists of learning resources</h1>
      <CardCollection title={"Recently shared public lists"}>
        {publicLists
          .filter((l) => !!l.id)
          .map((l, i) => {
            return (
              <HomeCard
                title={l.title}
                text={getStats(l.data)}
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
