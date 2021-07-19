import { useState, useCallback } from "react";
import CardCollection from "../Card/CardCollection";
import ResourceListCard from "../Card/ResourceListCard";
import ResourceRec from "../../types/ResourceRec";
import RecommendedCard from "../Card/RecommendedCard/RecommendedCard";
import BasePopup from "../Popup/BasePopup";
import ViewDetailsRec from "../Form/ViewDetailsRec";
import SearchBar from "../Search/SearchBar";
import Profile from "../../types/Profile";
import elephant from "../../img/elephant.svg";
import useRecommendations from "../../hooks/useRecommendations";
import usePublicResourceLists from "../../hooks/usePublicResourceLists";

type Props = { profile: Profile | null };

const Home = ({ profile }: Props) => {
  const { query, recommendedResources, onSearch, onBookmark } =
    useRecommendations();
  const { publicLists } = usePublicResourceLists();

  const [selectedViewDetails, setSelectedViewDetail] =
    useState<ResourceRec | null>(null);

  const viewDetails = useCallback(
    (r: ResourceRec) => setSelectedViewDetail(r),
    []
  );

  return (
    <div className="flex flex-col w-100 max-w-screen-2xl md:mx-auto pb-8">
      <div className="flex px-4 py-10 items-center text-gray-900 dark:text-white flex-col tracking-tight leading-tight sm:px-10">
        <img src={elephant} className="h-10 w-10" alt="" />
        <h1 className="text-4xl font-extrabold">livlearn</h1>
        <p className="text-center text-lg">
          💡 organise and curate resources 🚀 track progress 🔎 discover new
          topics 🎓 make lifelong learning your habit
        </p>
      </div>

      <CardCollection
        title={"Resource collections recently shared with the community"}
      >
        {publicLists
          .filter((l) => !!l.id)
          .map((l) => {
            return <ResourceListCard rl={l} key={l.id!} hideLock />;
          })}
      </CardCollection>

      <CardCollection
        title={"Our curated list of learning resources"}
        widgets={
          <SearchBar onSearch={onSearch} className="mb-3" query={query} />
        }
      >
        {recommendedResources.map((r) => {
          return (
            <RecommendedCard
              rr={r}
              key={r.id}
              onViewDetails={viewDetails}
              onClickBookmark={onBookmark}
              isBookmarked={profile?.bookmarks?.includes(r.id) ?? false}
            />
          );
        })}
      </CardCollection>
      {selectedViewDetails !== null && (
        <BasePopup
          isOpen={selectedViewDetails !== null}
          onClickClose={() => {
            setSelectedViewDetail(null);
          }}
          title={selectedViewDetails.name}
        >
          <ViewDetailsRec rr={selectedViewDetails} />
        </BasePopup>
      )}
    </div>
  );
};

export default Home;
