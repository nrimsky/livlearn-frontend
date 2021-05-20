import MenuAction from "../../types/MenuAction";
import NavItem from "./NavItem";

export default function DesktopNav(props: { navigation: MenuAction[] }) {
  return (
    <div className="flex space-x-4 h-full">
      {props.navigation.map((item, i) => (
        <NavItem item={item} key={i} />
      ))}
    </div>
  );
}
