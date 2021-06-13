import React from "react";
import { mediaTypeFromApiType } from "../../types/MediaType";
import ResourceRec from "../../types/ResourceRec";
import LevelPill from "../Card/RecommendedCard/LevelPill";
import TagPill from "../Card/RecommendedCard/TagPill";
import Icon from "../Icon/Icon";

const ViewDetailsRec: React.FC<{ rr: ResourceRec }> = ({ rr }) => {
  const d = new Date();
  const millis = Date.parse(rr.created_at);
  d.setTime(millis);
  return (
    <div className="text-gray-900 dark:text-gray-100">
      <div className="flex mb-1 items-center">
        <Icon
          mediaType={mediaTypeFromApiType(rr.type)}
          className="inline mr-2 text-gray-900  dark:text-gray-100"
        />
        <span className="text-gray-500 dark:text-gray-400 text-sm leading-tight">{rr.tagline}</span>
      </div>
      <div className="flex flex-wrap py-2">
        {rr.tags.map((t) => {
          return <TagPill tag={t} key={t} />;
        })}
        <LevelPill level={rr.level} />
      </div>
      <p className="mb-2 border-t-2 pt-2 border-gray-200 dark:border-gray-600">{rr.description}</p>
      <a
        href={rr.url}
        target="_blank"
        rel="noreferrer"
        className="text-sm font-medium text-white px-3 py-1 bg-green-500 rounded flex-none hover:shadow-xl dark:bg-green-600"
      >
        Access resource
      </a>
      <p className="text-gray-500  dark:text-gray-400 text-xs mt-3 border-t-2 pt-1 border-gray-200 dark:border-gray-600">
        Posted on {d.toLocaleString()}
      </p>
    </div>
  );
};

export default ViewDetailsRec;
