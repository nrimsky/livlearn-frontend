import React from "react";
import ResourceList from "../../types/ResourceList";
import Item from "./Subcomponents/Item";
import ListWrapper from "./Subcomponents/ListWrapper";

type Props = {
  resourceList: ResourceList;
};

const StaticList = ({ resourceList }: Props) => {
  return (
    <ListWrapper>
      {resourceList.data.map((d, i) => {
        return <Item data={d} key={i} />;
      })}
    </ListWrapper>
  );
};

export default StaticList;
