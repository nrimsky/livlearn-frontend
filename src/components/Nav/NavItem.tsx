import NavLoc from "../../types/NavLoc";

export default function NavItem(props: { item: NavLoc; key?: number }) {
  return (
    <a
      key={props.item.name}
      href={props.item.href}
      className="text-gray-500 hover:text-gray-700 my-auto inline-block text-sm"
    >
      {props.item.name}
    </a>
  );
}
