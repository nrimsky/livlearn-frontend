import CardCollection from "../Card/CardCollection";
import ResourceListCard from "../Card/ResourceListCard";
import Profile from "../../types/Profile";
import elephant from "../../img/elephant.svg";
import useRecommendations from "../../hooks/useRecommendations";
import usePublicResourceLists from "../../hooks/usePublicResourceLists";
import ArrowLink from "../Button/ArrowLink";
import CuratedResourceCollection from "../Card/CuratedResourceCollection";
import { BannerContext } from "../../App";
import { useContext } from "react";

type Props = { profile: Profile | null };

const Home = ({ profile }: Props) => {
  const { setErrorMessage } = useContext(BannerContext);

  const { recommendedResources, onBookmark } = useRecommendations(
    6,
    setErrorMessage
  );
  const { publicLists } = usePublicResourceLists(setErrorMessage);

  return (
    <div className="flex flex-col w-100 max-w-screen-2xl md:mx-auto pb-8">
      <div className="flex px-4 pt-10 pb-5 items-center text-gray-900 dark:text-white flex-col tracking-tight leading-tight sm:px-10">
        <img
          src={elephant}
          className="h-10 w-10"
          alt=""
          width="40px"
          height="40px"
        />
        <h1 className="text-4xl font-extrabold">livlearn</h1>
        <p className="text-center text-lg">
          💡 organise and curate resources 🚀 track progress 🔎 discover new
          topics 🎓 make lifelong learning your habit
        </p>
      </div>
      <CuratedResourceCollection
        resources={recommendedResources}
        bookmarks={profile?.bookmarks ?? []}
        onBookmark={onBookmark}
        title={"Recently curated free learning resources"}
        subtitle={"These are resources we or our trusted curators have tried and enjoyed"}
      />
      <ArrowLink
        to="/curatedresources"
        text="See more curated resources"
        className="mt-3 px-5"
      />
      <CardCollection
        title={"Community shared resource collections"}
        subtitle="Anyone can share a resource collection publicly - check out some lists our users have made"
      >
        {publicLists
          .filter((l) => !!l.id)
          .map((l) => {
            return <ResourceListCard rl={l} key={l.id!} hideLock />;
          })}
      </CardCollection>
    </div>
  );
};

export default Home;
