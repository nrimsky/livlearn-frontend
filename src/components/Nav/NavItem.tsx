import MenuAction from "../../types/MenuAction";

export default function NavItem(props: { item: MenuAction; key?: number }) {
  return (
    <button
      key={props.item.name}
      onClick={props.item.action}
      className="text-gray-600 hover:text-gray-700 my-auto inline-block focus:outline-none hover:underline"
    >
      {props.item.name}
    </button>
  );
}
