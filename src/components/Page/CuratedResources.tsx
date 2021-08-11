import SearchBar from "../Search/SearchBar";
import Profile from "../../types/Profile";
import useRecommendations from "../../hooks/useRecommendations";
import CuratedResourceCollection from "../Card/CuratedResourceCollection";
import { BannerContext } from "../../App";
import { useContext } from "react";
import { useState } from "react";
import BasePopup from "../Popup/BasePopup";
import Filter from "../Search/Filter";

type Props = { profile: Profile | null };

const CuratedResources = ({ profile }: Props) => {
  const { setErrorMessage } = useContext(BannerContext);
  const {
    query,
    recommendedResources,
    onSearch,
    onBookmark,
    allTags,
    onClickLevel,
    onClickMediaType,
    onClickTag,
  } = useRecommendations(30, setErrorMessage);
  const [showTags, setShowTags] = useState(false);

  return (
    <div className="flex w-100 w-full max-w-screen-2xl md:mx-auto pb-8 flex-col md:flex-row relative md:justify-left">
      <div className="text-sm relative py-12 hidden md:flex flex-col pl-5">
        <Filter
          tags={allTags}
          query={query}
          onClickLevel={onClickLevel}
          onClickMediaType={onClickMediaType}
          onClickTag={onClickTag}
          className="md:w-48 sticky top-5 left-0"
        />
      </div>
      <div className="flex flex-col w-100">
        <CuratedResourceCollection
          resources={recommendedResources}
          bookmarks={profile?.bookmarks ?? []}
          onBookmark={onBookmark}
          title={"Our curated list of learning resources"}
          widgets={
              <SearchBar onSearch={onSearch} onClickFilter={() => setShowTags(!showTags)}/>
          }
        />
      </div>
      <BasePopup
        isOpen={showTags}
        onClickClose={() => setShowTags(false)}
        title={"Filter resources"}
      >
        <div className="pt-2">
          <Filter
            tags={allTags}
            query={query}
            onClickLevel={onClickLevel}
            onClickMediaType={onClickMediaType}
            onClickTag={onClickTag}
            className=""
          />
        </div>
      </BasePopup>
    </div>
  );
};

export default CuratedResources;
