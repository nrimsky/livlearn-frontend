import { Query } from "../../api/LivlearnApi";
import { allLevels, allTypes, Level, Tag, Type } from "../../types/ResourceRec";
import TagFilterButton from "../Search/FilterButtons/TagFilterButton";
import MediaFilterButton from "../Search/FilterButtons/MediaFilterButton";
import LevelFilterButton from "../Search/FilterButtons/LevelFilterButton";

type Props = {
  query: Query;
  onClickLevel: (level: Level) => void;
  onClickMediaType: (type: Type) => void;
  onClickTag: (tag: Tag) => void;
  tags: Tag[];
  className: string;
};

const Filter = ({
  query,
  tags,
  className,
  onClickLevel,
  onClickMediaType,
  onClickTag,
}: Props) => {
  return (
    <div className={className}>
      <div className="flex w-full flex-wrap mb-4">
        <p className="flex w-full mb-1 font-bold text-gray-900 dark:text-white text-xs">
          Media type
        </p>
        {allTypes.map((t) => {
          const mts = query.types;
          const isSelected = (mts && mts.includes(t)) ?? false;
          return (
            <MediaFilterButton
              key={t}
              type={t}
              selected={isSelected}
              onClick={onClickMediaType}
            />
          );
        })}
      </div>
      <div className="flex w-full flex-wrap mb-4">
        <p className="flex w-full mb-1 font-bold text-gray-900 dark:text-white text-xs">
          Level
        </p>
        {allLevels.map((l) => {
          const isSelected = query.level === l;
          return (
            <LevelFilterButton
              key={l}
              level={l}
              selected={isSelected}
              onClick={onClickLevel}
            />
          );
        })}
      </div>
      <div className="flex w-full flex-wrap mb-4">
        <p className="flex w-full mb-1 font-bold text-gray-900 dark:text-white text-xs">
          Tags
        </p>
        {tags.map((tag) => {
          const isSelected = query.tagIds?.includes(tag.id) ?? false;
          return (
            <TagFilterButton
              key={tag.id}
              tag={tag}
              selected={isSelected}
              onClick={onClickTag}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
