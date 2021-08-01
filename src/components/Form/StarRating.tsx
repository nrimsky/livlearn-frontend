import { StarIcon } from "@heroicons/react/solid";

const Star = (props: {
  isSelected: boolean;
  onClick: (num: number) => void;
  num: number;
  key: number;
}) => {
  return (
    <button
      className="inline-flex"
      onClick={(e) => {
        e.preventDefault();
        props.onClick(props.num);
      }}
    >
      <span className="sr-only">{props.num} stars</span>
      <StarIcon
        className={`w-8 ${
          props.isSelected
            ? "text-yellow-400"
            : "text-gray-100 dark:text-gray-800"
        }`}
      />
    </button>
  );
};

export default function StarRating(props: {rating: number; onChange: (num: number) => void}) {
  const options = [1, 2, 3, 4, 5];
  const onClick = (num: number) => {
    props.onChange(num);
  };
  return (
    <div className="flex flex-row">
      {options.map((o) => {
        return (
          <Star key={o} num={o} onClick={onClick} isSelected={props.rating >= o} />
        );
      })}
    </div>
  );
}
