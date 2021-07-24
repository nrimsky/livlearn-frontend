import React from "react";
import { mediaTypeFromApiType } from "../../types/MediaType";
import ResourceRec from "../../types/ResourceRec";
import { SmallLinkButton } from "../Button/SmallOutlineButton";
import LevelPill from "../Card/RecommendedCard/LevelPill";
import TagPill from "../Card/RecommendedCard/TagPill";
import Icon from "../Icon/Icon";

const ViewDetailsRec: React.FC<{ rr: ResourceRec }> = ({ rr }) => {
  const d = new Date();
  const millis = Date.parse(rr.created_at);
  d.setTime(millis);
  return (
    <div className="text-gray-900 dark:text-white">
      <div className="flex mb-1 items-center">
        <Icon
          mediaType={mediaTypeFromApiType(rr.type)}
          className="inline mr-2 text-gray-900 dark:text-white"
        />
        <span className="text-gray-500 dark:text-gray-400 text-sm leading-tight">
          {rr.tagline}
        </span>
      </div>
      <div className="flex flex-wrap py-2">
        {rr.tags.map((t) => {
          return <TagPill tag={t} key={t} />;
        })}
        <LevelPill level={rr.level} />
      </div>
      <p className="mb-2 border-t-2 pt-2 border-gray-200 dark:border-gray-600">
        {rr.description}
      </p>
      <SmallLinkButton
        className="text-white border-green-500 bg-green-500 bg-gradient-to-b dark:from-green-500 dark:to-green-600 dark:border-green-600 text-sm"
        href={rr.url}
        text="Access resource"
      />
      <p className="text-gray-500  dark:text-gray-400 text-xs mt-3 border-t-2 pt-1 border-gray-200 dark:border-gray-600">
        Posted on {d.toLocaleString()}
      </p>
    </div>
  );
};

export default ViewDetailsRec;
