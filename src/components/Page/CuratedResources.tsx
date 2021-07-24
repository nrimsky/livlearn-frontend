import { useState, useCallback } from "react";
import CardCollection from "../Card/CardCollection";
import ResourceRec from "../../types/ResourceRec";
import RecommendedCard from "../Card/RecommendedCard/RecommendedCard";
import BasePopup from "../Popup/BasePopup";
import ViewDetailsRec from "../Form/ViewDetailsRec";
import SearchBar from "../Search/SearchBar";
import Profile from "../../types/Profile";
import useRecommendations from "../../hooks/useRecommendations";

type Props = { profile: Profile | null };

const CuratedResources = ({ profile }: Props) => {
  const { query, recommendedResources, onSearch, onBookmark } =
    useRecommendations(30);
  const [selectedViewDetails, setSelectedViewDetail] =
    useState<ResourceRec | null>(null);
  const viewDetails = useCallback(
    (r: ResourceRec) => setSelectedViewDetail(r),
    []
  );

  return (
    <div className="flex flex-col w-100 w-full max-w-screen-2xl md:mx-auto pb-8">
      <CardCollection
        title={"Search our curated list of learning resources"}
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

export default CuratedResources;
