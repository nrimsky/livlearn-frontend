import NavLoc from "../../types/NavLoc";
import NavItem from "./NavItem";

export default function DesktopNav(props: { navigation: NavLoc[] }) {
  return (
    <div className="flex space-x-4 h-full">
      {props.navigation.map((item, i) => (
        <NavItem item={item} key={i} />
      ))}
    </div>
  );
}
