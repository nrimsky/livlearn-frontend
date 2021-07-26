import CardCollection from "../Card/CardCollection";
import ResourceRec from "../../types/ResourceRec";
import RecommendedCard from "../Card/RecommendedCard/RecommendedCard";
import BasePopup from "../Popup/BasePopup";
import ViewDetailsRec from "../Form/ViewDetailsRec";
import { useState } from "react";

type Props = {
  resources: ResourceRec[];
  bookmarks: number[];
  onBookmark: (rid: number) => void;
  title: string;
  subtitle?: string;
  widgets?: React.ReactNode;
};

const CuratedResourceCollection = ({
  resources,
  bookmarks,
  onBookmark,
  title,
  subtitle,
  widgets,
}: Props) => {
  const [selectedViewDetails, setSelectedViewDetails] =
    useState<ResourceRec | null>(null);
  return (
    <>
      <CardCollection title={title} subtitle={subtitle} widgets={widgets}>
        {resources.map((r) => {
          return (
            <RecommendedCard
              rr={r}
              key={r.id}
              onViewDetails={r => setSelectedViewDetails(r)}
              onClickBookmark={onBookmark}
              isBookmarked={bookmarks.includes(r.id) ?? false}
            />
          );
        })}
      </CardCollection>
      {selectedViewDetails !== null && (
        <BasePopup
          isOpen={selectedViewDetails !== null}
          onClickClose={() => {
            setSelectedViewDetails(null);
          }}
          title={selectedViewDetails.name}
        >
          <ViewDetailsRec rr={selectedViewDetails} />
        </BasePopup>
      )}
    </>
  );
};

export default CuratedResourceCollection;
