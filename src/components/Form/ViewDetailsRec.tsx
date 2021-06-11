import React from "react";
import { mediaTypeFromApiType } from "../../types/MediaType";
import ResourceRec from "../../types/ResourceRec";
import LevelPill from "../Card/RecommendedCard/LevelPill";
import TagPill from "../Card/RecommendedCard/TagPill";
import Icon from "../Icon/Icon";

const ViewDetailsRec: React.FC<{ rr: ResourceRec }> = ({ rr }) => {
  console.log(rr.created_at);
  const d = new Date();
  const millis = Date.parse(rr.created_at);
  d.setTime(millis);
  return (
    <div className="text-gray-900">
      <div className="flex mb-1">
        <Icon
          mediaType={mediaTypeFromApiType(rr.type)}
          className="inline mr-2 text-gray-900"
        />
        <span className="text-gray-500 text-sm">{rr.tagline}</span>
      </div>
      <div className="flex flex-wrap py-2">
        {rr.tags.map((t) => {
          return <TagPill tag={t} key={t} />;
        })}
        <LevelPill level={rr.level} />
      </div>
      <p className="mb-2 border-t-2 pt-2">{rr.description}</p>
      <a
        href={rr.url}
        target="_blank"
        rel="noreferrer"
        className="text-sm font-medium text-white px-3 py-1 bg-green-500 rounded flex-none shadow hover:shadow-xl"
      >
        Access resource
      </a>
      <p className="text-gray-500 text-xs mt-3 border-t-2 pt-1 border-gray-200">
        Posted on {d.toLocaleString()}
      </p>
    </div>
  );
};

export default ViewDetailsRec;
