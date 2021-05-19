import NavLoc from "../../types/NavLoc";
import MobileNavItem from "./MobileNavItem";

export default function MobileNav(props: { navigation: NavLoc[] }) {
  return (
    <div className="px-2 pt-2 pb-3 space-y-1">
      {props.navigation.map((item, i) => (
        <MobileNavItem item={item} key={i} />
      ))}
    </div>
  );
}
