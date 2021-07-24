import React from "react";
import { mediaTypeFromApiType } from "../../../types/MediaType";
import ResourceRec from "../../../types/ResourceRec";
import SmallOutlineButton, {
  SmallLinkButton,
} from "../../Button/SmallOutlineButton";
import Icon from "../../Icon/Icon";
import LevelPill from "./LevelPill";
import TagPill from "./TagPill";

const BookmarkButton = (props: {
  isBookmarked: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className="focus:outline-none text-yellow-500 hover:text-yellow-600 focus:text-yellow-600 dark:hover:text-yellow-400 dark:focus:text-yellow-400"
      onClick={props.onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 inline absolute top-0 right-1"
        fill={`${props.isBookmarked ? "currentColor" : "none"}`}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 0V17.8824L12 14.5294L20 17.8824V0"
        />
      </svg>
    </button>
  );
};

const RecommendedCard = React.memo(
  (props: {
    rr: ResourceRec;
    key: string|number;
    onViewDetails: (r: ResourceRec) => void;
    onClickBookmark: (rId: number) => void;
    isBookmarked: boolean;
  }) => {
    return (
      <div className="max-w max-h py-3 px-4 bg-white dark:bg-gray-900 sm:rounded sm:w-auto flex justify-start border-gray-300 dark:border-gray-500 flex-col border-t border-b md:border relative">
        <div className="text-gray-900  dark:text-white font-semibold leading-tight flex">
          <Icon
            mediaType={mediaTypeFromApiType(props.rr.type)}
            className="inline mr-2 mb-1"
          />
          <h3 className="truncate tracking-tight">{props.rr.name}</h3>
        </div>
        <p className="text-sm text-gray-500  dark:text-gray-400 leading-tight">
          {props.rr.tagline}
        </p>
        <div className="flex flex-wrap py-2">
          {props.rr.tags.map((t) => {
            return <TagPill tag={t} key={t} />;
          })}
          <LevelPill level={props.rr.level} />
        </div>
        <div className="flex mt-auto">
          <SmallOutlineButton
            className="text-green-500 border-green-500 mr-2"
            text="More details"
            onClick={() => props.onViewDetails(props.rr)}
          />
          <SmallLinkButton
            className="text-white border-green-500 bg-green-500 bg-gradient-to-b dark:from-green-500 dark:to-green-600 dark:border-green-600"
            href={props.rr.url}
            text="Access resource"
          />
        </div>
        <BookmarkButton
          isBookmarked={props.isBookmarked}
          onClick={() => props.onClickBookmark(props.rr.id)}
        />
      </div>
    );
  }
);

export default RecommendedCard;
