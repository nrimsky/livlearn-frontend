import React from "react";
import ResourceList from "../../types/ResourceList";
import ListTitle from "./ListTitle";
import Item from "./Subcomponents/Item";
import ListWrapper from "./Subcomponents/ListWrapper";

type Props = {
  resourceList: ResourceList;
};

const StaticList = ({ resourceList }: Props) => {
  return (
    <div className="sm:m-5 my-5">
      <div className="mx-5 sm:mx-0 w-100">
        <ListTitle value={resourceList.title} />
      </div>
      <ListWrapper>
        {resourceList.data.map((d, i) => {
          return <Item data={d} key={i} />;
        })}
      </ListWrapper>
    </div>
  );
};

export default StaticList;
