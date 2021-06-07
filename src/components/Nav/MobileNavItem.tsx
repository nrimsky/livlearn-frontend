import MenuAction from "../../types/MenuAction";

export default function MobileNavItem(props: {
  item: MenuAction;
  key?: number;
}) {
  return (
    <button
      key={props.item.name}
      onClick={props.item.action}
      className="text-gray-500 block px-3 py-1 text-base text-sm focus:outline-none"
    >
      {props.item.name}
    </button>
  );
}
