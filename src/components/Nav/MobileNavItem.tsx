import NavLoc from "../../types/NavLoc";

export default function MobileNavItem(props: { item: NavLoc; key?: number }) {
  return (
    <a
      key={props.item.name}
      href={props.item.href}
      className="text-gray-500 block px-3 py-1 text-base text-sm"
    >
      {props.item.name}
    </a>
  );
}
