import React from "react";
import getDetails from "../../helpers/getDetails";
import ResourceList from "../../types/ResourceList";
import { useHistory } from "react-router-dom";
import {
  LockClosedIcon,
  LockOpenIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline";

const UpvoteButton = () => {
  return (
    <button className="flex justify-center my-auto p-2 border bg-white border-gray-200 hover:bg-gray-50 rounded flex-col justify-center z-5 focus:outline-none">
      <ChevronUpIcon className="h-5 w-5 text-gray-500" />
      <span className="text-sm text-gray-500 mt-1 w-full text-center">9</span>
    </button>
  );
};

const ResourceListCard = React.memo(
  (props: {
    rl: ResourceList;
    key: string;
    hideLock?: boolean;
    onVote?: (up: boolean) => void;
  }) => {
    const history = useHistory();

    const goToListPage = (id: string) => {
      history.push(`/list/${id}`);
    };

    if (!props.rl.id) {
      return <></>;
    }

    const lockIcon = !props.hideLock ? (
      props.rl.shareSettings !== "PRIVATE" ? (
        <LockOpenIcon
          className="h-5 w-5 pb-1 text-green-500 inline"
          role="img"
          aria-label="Public list"
        />
      ) : (
        <LockClosedIcon
          className="h-5 w-5 pb-1 text-yellow-500 inline"
          role="img"
          aria-label="Private list"
        />
      )
    ) : null;

    const goToList = (e: React.MouseEvent) => {
      e.stopPropagation();
      goToListPage(props.rl.id!);
    };

    return (
      <div
        className="max-w max-h py-3 px-4 bg-white sm:rounded w-screen sm:w-auto flex justify-between items-stretch leading-tight cursor-pointer hover:bg-gray-50 border border-gray-200"
        onClick={goToList}
      >
        <button className="sr-only" onClick={goToList}>
          Go to list
        </button>
        <div className="flex flex-col content-start">
          <div className="flex-grow pr-2">
            <h2 className="text-gray-800 font-semibold">{props.rl.title}</h2>
            <p className="text-sm mt-2 text-gray-500">
              {lockIcon} {getDetails(props.rl.data)}
            </p>
          </div>
        </div>
        {!!props.onVote && <UpvoteButton />}
      </div>
    );
  }
);

export default ResourceListCard;
