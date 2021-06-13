import MenuAction from "../../types/MenuAction";

export default function NavItem(props: { item: MenuAction; key?: number }) {
  return (
    <button
      key={props.item.name}
      onClick={props.item.action}
      className="text-gray-500  dark:text-gray-400 hover:text-gray-900 dark:hover:text-green-500  dark:text-white my-auto inline-block focus:outline-none focus:underline hover:underline tracking-tight"
    >
      {props.item.name}
    </button>
  );
}
