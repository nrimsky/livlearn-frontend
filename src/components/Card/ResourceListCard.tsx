import React from "react";
import getDetails from "../../helpers/getDetails";
import ResourceList from "../../types/ResourceList";
import { useHistory } from "react-router-dom";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/outline";

const ResourceListCard = React.memo(
  (props: { rl: ResourceList; key: string }) => {
    const history = useHistory();

    const goToListPage = (id: string) => {
      history.push(`/list/${id}`);
    };

    if (!props.rl.id) {
      return <></>;
    }
    return (
      <div className="max-w max-h py-3 px-4 bg-white shadow sm:rounded w-screen sm:w-auto flex flex-col">
        <div className="flex-grow">
          <h2 className="text-gray-800 font-semibold">{props.rl.title}</h2>
          <p className="mt-2 text-gray-600 text-sm">
            {getDetails(props.rl.data)}
          </p>
        </div>
        <div className="flex justify-between mt-4">
          {props.rl.isPublic ? (
            <LockOpenIcon
              className="flex-shrink-0 h-4 w-4 text-green-500"
              role="img"
              aria-label="Anyone can see this list with a link"
            />
          ) : (
            <LockClosedIcon
              className="flex-shrink-0 h-4 w-4 text-yellow-500"
              role="img"
              aria-label="Private list"
            />
          )}
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
