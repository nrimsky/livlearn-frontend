import MenuAction from "../../types/MenuAction";

export default function MobileNavItem(props: {
  item: MenuAction;
  key?: number;
}) {
  return (
    <button
      key={props.item.name}
      onClick={props.item.action}
      className="text-gray-500  dark:text-gray-400 block px-3 py-1 text-base focus:outline-none tracking-tight focus:ring focus:ring-green-200 focus:ring-opacity-50"
    >
      {props.item.name}
    </button>
  );
}
