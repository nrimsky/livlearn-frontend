import SearchBar from "../Search/SearchBar";
import Profile from "../../types/Profile";
import useRecommendations from "../../hooks/useRecommendations";
import CuratedResourceCollection from "../Card/CuratedResourceCollection";
import { BannerContext } from "../../App";
import { useContext } from "react";

type Props = { profile: Profile | null };

const CuratedResources = ({ profile }: Props) => {
  const { setErrorMessage } = useContext(BannerContext);
  const { query, recommendedResources, onSearch, onBookmark } =
    useRecommendations(30, setErrorMessage);

  return (
    <div className="flex flex-col w-100 w-full max-w-screen-2xl md:mx-auto pb-8">
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
  );
};

export default CuratedResources;
