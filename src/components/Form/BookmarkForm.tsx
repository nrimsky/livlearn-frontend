import ResourceRec from "../../types/ResourceRec";
import Button from "../Button/Button";

export default function BookmarkForm(props: { rr: ResourceRec }) {
  const bookmark = () => {
    console.log("BOOKMARK");
  };

//   const addToList = (listId: string) => {
//     console.log("Adding to list " + listId);
//   };

  return (
    <div className="w-full">
      <p className="text-gray-900 dark:text-white">{props.rr.name}</p>
      <div className="mt-3 w-full flex flex-col space-y-3">
        <Button
          onClick={bookmark}
          color=""
          className="bg-blue-700 text-blue-100 flex-1"
          text="Add to bookmarks →"
        />
        <select
          name="cars"
          id="cars"
          className="font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 px-4 py-2 rounded-md border border-blue-500 border-3 focus:outline-none focus:ring ring-gray-900 dark:ring-white ring-opacity-20 dark:ring-opacity-20"
        >
          <option value="volvo">Add to list 1</option>
          <option value="saab">Add to list 2</option>
          <option value="mercedes">Add to list 3</option>
          <option value="audi">Add to list 4</option>
        </select>
      </div>
    </div>
  );
}
