import { ArrowRightIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

type Props = {
  text: string;
  to: string;
  className?: string;
};

const ArrowLink = ({ text, to, className }: Props) => {
  return (
    <Link
      to={to}
      className={`text-green-500 flex items-center underline ${
        className ?? ""
      }`}
    >
      {text}
      <ArrowRightIcon className="w-4 h-4 ml-2" />
    </Link>
  );
};

export default ArrowLink;
