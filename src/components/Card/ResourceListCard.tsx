import React, { useMemo } from "react";
import getDetails from "../../helpers/getDetails";
import ResourceList from "../../types/ResourceList";
import { useHistory } from "react-router-dom";
import {
  LockClosedIcon,
  LockOpenIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline";
import { getCurrentUserId } from "../../firebase/AuthService";
import classNames from "../../helpers/classNames";
import { downvoteResourceList, upvoteResourceList } from "../../firebase/FirestoreService";

const UpvoteButton: React.FC<{ resourceList: ResourceList }> = ({ resourceList }) => {
  const currentUserId = getCurrentUserId();

  const isUpvoted = useMemo(() => {
    if (!currentUserId) {
      return false;
    } else {
      return resourceList.upvotes.includes(currentUserId);
    }
  }, [currentUserId, resourceList]);

  return (
    <button
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        if (!currentUserId) { return; }
        if (resourceList.upvotes.includes(currentUserId)) {
          downvoteResourceList(resourceList, currentUserId);
        } else {
          upvoteResourceList(resourceList, currentUserId);
        }
      }}
      className={classNames(
        "flex justify-center my-auto p-2 border bg-white hover:bg-gray-50 rounded flex-col justify-center z-5 focus:outline-none",
        isUpvoted
          ? "border-green-500 text-green-500"
          : "border-gray-200 text-gray-500"
      )}
    >
      <ChevronUpIcon className="h-5 w-5" />
      <span className="sr-only">
        {isUpvoted ? "You have upvoted this" : ""}
      </span>
      <span className="text-sm mt-1 w-full text-center">{resourceList.upvotes.length}</span>
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
        {props.rl.shareSettings === "HOMEPAGE" && (
          <UpvoteButton resourceList={props.rl} />
        )}
      </div>
    );
  }
);

export default ResourceListCard;
