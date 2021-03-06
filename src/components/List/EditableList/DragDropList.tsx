import ResourceListItem from "../../../types/ResourceListItem";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import DraggableListItem from "./DraggableListItem";

const DragDropList = (props: {
  onDragEnd: (result: DropResult) => void;
  data: ResourceListItem[];
  openEdit: (item: ResourceListItem, idx: number) => void;
}) => {
  return (
    <DragDropContext onDragEnd={props.onDragEnd}>
      <Droppable droppableId={"list"}>
        {(provided) => (
          <ul
            className="border-t border-b sm:border border-gray-300 dark:border-gray-500 divide-y divide-gray-300 dark:divide-gray-500 mb-auto"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.data.map((d, idx) => (
              <DraggableListItem
                item={d}
                idx={idx}
                openEdit={props.openEdit}
                key={"draggable=" + d.url + d.title}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropList;
