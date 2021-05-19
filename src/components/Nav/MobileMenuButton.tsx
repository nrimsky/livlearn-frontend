import { MenuIcon, XIcon } from "@heroicons/react/outline";

export default function MobileMenuButton(props: {
  open: boolean;
  key?: number;
}) {
  return (
    <>
      <span className="sr-only">Open main menu</span>
      {props.open ? (
        <XIcon className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
      )}
    </>
  );
}
