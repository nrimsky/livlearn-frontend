import SearchBar from "../Search/SearchBar";
import Profile from "../../types/Profile";
import useRecommendations from "../../hooks/useRecommendations";
import CuratedResourceCollection from "../Card/CuratedResourceCollection";
import { BannerContext } from "../../App";
import { useContext } from "react";
import { TagIcon } from "@heroicons/react/outline";
import { Query } from "../../api/LivlearnApi";
import { Tag } from "../../types/ResourceRec";
import { useState } from "react";
import BasePopup from "../Popup/BasePopup";

type Props = { profile: Profile | null };

const Tags = (props: {
  query: Query;
  onSearch: (q: Query) => void;
  tags: Tag[];
  className: string;
}) => {
  return (
    <ul className={props.className + "text-gray-500 dark:text-gray-400"}>
      {props.tags.map((tag) => {
        const isSelected = props.query.tagIds?.includes(tag.id);
        return (
          <li key={tag.id} className="block w-full">
            <button
              className={`${
                isSelected
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-400 dark:text-gray-500"
              } text-left leading-tight font-medium py-1`}
              onClick={(e) => {
                if (!isSelected) {
                  props.onSearch({
                    tagIds: [...(props.query.tagIds ?? []), tag.id],
                  });
                } else {
                  props.onSearch({
                    tagIds: [
                      ...(props.query.tagIds?.filter((id) => id !== tag.id) ??
                        []),
                    ],
                  });
                }
                e.stopPropagation();
              }}
            >
              {tag.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const CuratedResources = ({ profile }: Props) => {
  const { setErrorMessage } = useContext(BannerContext);
  const { query, recommendedResources, onSearch, onBookmark, allTags } =
    useRecommendations(30, setErrorMessage);
  const [showTags, setShowTags] = useState(false);

  return (
    <div className="flex w-100 w-full max-w-screen-2xl md:mx-auto pb-8 flex-col md:flex-row relative md:justify-left">
      <div className="md:hidden relative">
        <button
          className="mb-1.5 text-gray-900 dark:text-white absolute right-3 top-3"
          onClick={() => setShowTags(!showTags)}
        >
          <TagIcon className="w-6 h-6" />
          <span className="sr-only">Filter by tag</span>
        </button>
        <BasePopup
          isOpen={showTags}
          onClickClose={() => setShowTags(false)}
          title={"Filter by tag"}
        >
          <div className="pt-2">
            <Tags
              tags={allTags}
              query={query}
              onSearch={onSearch}
              className=""
            />
          </div>
        </BasePopup>
      </div>
      <div className="text-sm relative py-12 hidden md:flex flex-col pl-5">
        <Tags
          tags={allTags}
          query={query}
          onSearch={onSearch}
          className="md:w-36 sticky top-5 left-0"
        />
      </div>
      <div className="flex flex-col w-100">
        <CuratedResourceCollection
          resources={recommendedResources}
          bookmarks={profile?.bookmarks ?? []}
          onBookmark={onBookmark}
          title={"Search our curated list of learning resources"}
          widgets={
            <SearchBar onSearch={onSearch} className="mb-3" query={query} />
          }
        />
      </div>
    </div>
  );
};

export default CuratedResources;
