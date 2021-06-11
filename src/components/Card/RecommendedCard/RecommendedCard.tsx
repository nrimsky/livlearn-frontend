import React from "react";
import { mediaTypeFromApiType } from "../../../types/MediaType";
import ResourceRec from "../../../types/ResourceRec";
import SmallOutlineButton from "../../Button/SmallOutlineButton";
import Icon from "../../Icon/Icon";
import LevelPill from "./LevelPill";
import TagPill from "./TagPill";

const RecommendedCard = React.memo(
  (props: { rr: ResourceRec; key: string; onViewDetails: (r: ResourceRec) => void }) => {

    return (
      <div className="max-w max-h py-3 px-4 bg-white sm:rounded sm:w-auto flex justify-start border border-gray-300 flex-col">
        <div className="text-gray-900 font-semibold leading-tight flex">
          <Icon
            mediaType={mediaTypeFromApiType(props.rr.type)}
            className="inline mr-2 mb-1"
          />
          <h3 className="truncate tracking-tight">{props.rr.name}</h3>
        </div>
        <p className="text-sm text-gray-500 leading-tight">
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
          <a
            href={props.rr.url}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-white px-3 py-1 bg-green-500 rounded flex-none transform hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-xl"
          >
            Access resource
          </a>
        </div>
      </div>
    );
  }
);

export default RecommendedCard;
