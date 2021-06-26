import {
  bookmarkResource,
  streamProfile,
  streamPublicLists,
} from "../../firebase/FirestoreService";
import { useEffect, useState, useCallback } from "react";
import ResourceList from "../../types/ResourceList";
import CardCollection from "../Card/CardCollection";
import ResourceListCard from "../Card/ResourceListCard";
import ResourceRec from "../../types/ResourceRec";
import { Query, getResources } from "../../api/LivlearnApi";
import RecommendedCard from "../Card/RecommendedCard/RecommendedCard";
import BasePopup from "../Popup/BasePopup";
import ViewDetailsRec from "../Form/ViewDetailsRec";
import SearchBar from "../Search/SearchBar";
import Profile from "../../types/Profile";
import elephant from "../../img/elephant.svg";

const Home = (props: { uid: string | null }) => {
  const [publicLists, setPublicLists] = useState<ResourceList[]>([]);
  const [query, setQuery] = useState<Query>({
    tagIds: [],
    level: "AN",
    types: ["AB", "AR", "BL", "BO", "CO", "OT", "PO", "TO", "VI"],
    search: "",
  });
  const [recommendedResources, setRecommendedResources] = useState<
    ResourceRec[]
  >([]);
  const [selectedViewDetails, setSelectedViewDetail] =
    useState<ResourceRec | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const unsubscribe = streamPublicLists(
      (lists) => {
        setPublicLists(lists);
      },
      (error) => {
        console.error(error);
      }
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (props.uid === null) {
      return;
    }
    const unsubscribe = streamProfile(
      props.uid,
      (p) => {
        setProfile(p);
      },
      (error) => {
        console.error(error);
      }
    );
    return unsubscribe;
  }, [props.uid]);

  useEffect(() => {
    getResources(query)
      .then((r) => setRecommendedResources(r))
      .catch((e) => console.error(e));
  }, [query]);

  const viewDetails = useCallback(
    (r: ResourceRec) => setSelectedViewDetail(r),
    []
  );

  const bookmark = useCallback((rId: number) => {
    bookmarkResource(rId).catch((e) => console.error(e));
  }, []);

  const onSearch = useCallback((query: Query) => {
    setQuery(query);
  }, []);

  return (
    <div className="flex flex-col w-100 max-w-screen-2xl md:mx-auto pb-8">
      <div className="flex px-4 py-10 items-center text-gray-900 dark:text-white flex-col tracking-tight leading-tight sm:px-10">
        <img src={elephant} className="h-10 w-10" alt="" />
        <h1 className="text-4xl font-extrabold">livlearn</h1>
        <p className="text-center text-lg">
          💡 organise and curate resources 🚀 track progress 🔎 discover new
          topics 🎓 make lifelong learning your habit
        </p>
      </div>

      <CardCollection
        title={"Resource collections recently shared with the community"}
      >
        {publicLists
          .filter((l) => !!l.id)
          .map((l, i) => {
            return <ResourceListCard rl={l} key={l.id!} hideLock />;
          })}
      </CardCollection>

      <CardCollection
        title={"Learning resources we appreciated"}
        widgets={
          <SearchBar onSearch={onSearch} className="mb-3" query={query} />
        }
      >
        {recommendedResources.map((r) => {
          return (
            <RecommendedCard
              rr={r}
              key={r.id}
              onViewDetails={viewDetails}
              onClickBookmark={bookmark}
              isBookmarked={profile?.bookmarks?.includes(r.id) ?? false}
            />
          );
        })}
      </CardCollection>
      {selectedViewDetails !== null && (
        <BasePopup
          isOpen={selectedViewDetails !== null}
          onClickClose={() => {
            setSelectedViewDetail(null);
          }}
          title={selectedViewDetails.name}
        >
          <ViewDetailsRec rr={selectedViewDetails} />
        </BasePopup>
      )}
    </div>
  );
};

export default Home;
