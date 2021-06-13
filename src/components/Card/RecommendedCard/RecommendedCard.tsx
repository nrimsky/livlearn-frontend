import React from "react";
import { mediaTypeFromApiType } from "../../../types/MediaType";
import ResourceRec from "../../../types/ResourceRec";
import SmallOutlineButton, {
  SmallLinkButton,
} from "../../Button/SmallOutlineButton";
import Icon from "../../Icon/Icon";
import LevelPill from "./LevelPill";
import TagPill from "./TagPill";

const RecommendedCard = React.memo(
  (props: {
    rr: ResourceRec;
    key: string;
    onViewDetails: (r: ResourceRec) => void;
  }) => {
    return (
      <div className="max-w max-h py-3 px-4 bg-white dark:bg-gray-900 sm:rounded sm:w-auto flex justify-start border-gray-300 dark:border-gray-500 flex-col border-t border-b md:border">
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
            className="text-white border-green-500 bg-green-500 dark:bg-green-700"
            href={props.rr.url}
            text="Access resource"
          />
        </div>
      </div>
    );
  }
);

export default RecommendedCard;
