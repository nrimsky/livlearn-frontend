import MenuAction from "../../types/MenuAction";

export default function MobileNavItem(props: {
  item: MenuAction;
  key?: number;
}) {
  return (
    <button
      key={props.item.name}
      onClick={props.item.action}
      className="text-gray-500 block px-3 py-1 text-base focus:outline-none tracking-tight"
    >
      {props.item.name}
    </button>
  );
}
