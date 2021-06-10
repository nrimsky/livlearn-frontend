import React from "react";
import { mediaTypeFromApiType } from "../../types/MediaType";
import ResourceRec from "../../types/ResourceRec";
import Icon from "../Icon/Icon";

const TagPill = React.memo((props: { tag: string; key: string }) => {
  return (
    <div className="rounded-full px-2 text-xs bg-gray-100 text-green-900 inline-flex">
      {props.tag}
    </div>
  );
});

const RecommendedCard = React.memo(
  (props: { rr: ResourceRec; key: string }) => {
    return (
      <div className="max-w max-h py-3 px-4 bg-white sm:rounded sm:w-auto flex justify-start border border-gray-300 flex-col">
        <div className="text-gray-900 font-semibold leading-tight flex">
          <Icon
            mediaType={mediaTypeFromApiType(props.rr.type)}
            className="inline mr-2 mb-1"
          />
          <h3>{props.rr.name}</h3>
        </div>
        <p className="text-sm text-gray-500 leading-tight">
          {props.rr.tagline}
        </p>
        <div className="flex flex-wrap mt-2 gap-1.5">
          {props.rr.tags.map((t) => {
            return <TagPill tag={t} key={t} />;
          })}
        </div>
        <div className="flex gap-2 mt-2">
          <button className="text-xs font-medium text-green-500 px-3 py-1 focus:outline-none border border-green-500 rounded flex-none">
            More details
          </button>
          <a
            href={props.rr.url}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-white px-3 py-1 bg-green-500 rounded flex-none shadow-md transform hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-xl"
          >
            Access resource
          </a>
        </div>
      </div>
    );
  }
);

export default RecommendedCard;
