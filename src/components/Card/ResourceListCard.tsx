import React from "react";
import getDetails from "../../helpers/getDetails";
import ResourceList from "../../types/ResourceList";
import { useHistory } from "react-router-dom";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/outline";

const ResourceListCard = React.memo(
  (props: { rl: ResourceList; key: string; hideLock?: boolean }) => {
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
          className="flex-shrink-0 h-5 w-5 text-green-500 pt-1"
          role="img"
          aria-label="Public list"
        />
      ) : (
        <LockClosedIcon
          className="flex-shrink-0 h-5 w-5 text-yellow-500 pt-1"
          role="img"
          aria-label="Private list"
        />
      )
    ) : (
      <div />
    );

    return (
      <div className="max-w max-h py-3 px-4 bg-white shadow sm:rounded w-screen sm:w-auto flex flex-col">
        <div className="flex-grow">
          <h2 className="text-gray-800 font-semibold">{props.rl.title}</h2>
          <p className="mt-2 text-gray-600 text-sm">
            {getDetails(props.rl.data)}
          </p>
        </div>
        <div className="flex justify-between mt-4">
          {lockIcon}
          <button
            className="font-medium text-green-500 focus:outline-none"
            onClick={() => goToListPage(props.rl.id!)}
          >
            See List
          </button>
        </div>
      </div>
    );
  }
);

export default ResourceListCard;
