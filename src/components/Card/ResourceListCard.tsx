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
        "flex justify-center my-auto p-2 border bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-green-800 rounded flex-col justify-center z-5 focus:outline-none",
        isUpvoted
          ? "border-green-500 text-green-500"
          : "border-gray-300 dark:border-gray-500 text-gray-500  dark:text-gray-400"
      )}
    >
      <ChevronUpIcon className="h-5 w-5" />
      <span className="sr-only">
        {isUpvoted ? "You have upvoted this" : ""}
      </span>
      <span className=" mt-1 w-full text-center">{resourceList.upvotes.length}</span>
    </button>
  );
};

const ResourceListCard = React.memo(
  (props: {
    rl: ResourceList;
    key: string;
    hideLock?: boolean;
    hideUpvotes?: boolean;
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
          aria-label="Public collection"
        />
      ) : (
        <LockClosedIcon
          className="h-5 w-5 pb-1 text-yellow-500 inline"
          role="img"
          aria-label="Private collection"
        />
      )
    ) : null;

    const goToList = (e: React.MouseEvent) => {
      e.stopPropagation();
      goToListPage(props.rl.id!);
    };

    return (
      <div
        className="max-w max-h py-3 px-4 bg-white dark:bg-gray-900 sm:rounded sm:w-auto flex justify-between items-stretch cursor-pointer hover:bg-gray-50 border-b border-t md:border border-gray-300 dark:border-gray-600"
        onClick={goToList}
      >
        <button className="sr-only" onClick={goToList}>
          Go to collection
        </button>
        <div className="flex flex-col content-start">
          <div className="flex-grow pr-2">
            <h3 className="text-gray-900  dark:text-gray-100 font-semibold leading-tight tracking-tight">{props.rl.title}</h3>
            <p className="text-sm mt-2 text-gray-500  dark:text-gray-400 leading-none">
              {lockIcon} {getDetails(props.rl.data)}
            </p>
          </div>
        </div>
        {!props.hideUpvotes && props.rl.shareSettings === "HOMEPAGE" && (
          <UpvoteButton resourceList={props.rl} />
        )}
      </div>
    );
  }
);

export default ResourceListCard;
