import { streamPublicLists } from "../../firebase/FirestoreService";
import { useEffect, useState, useCallback } from "react";
import ResourceList from "../../types/ResourceList";
import CardCollection from "../Card/CardCollection";
import ResourceListCard from "../Card/ResourceListCard";
import elephant from "../../img/elephant.svg";
import ResourceRec from "../../types/ResourceRec";
import { Query, getResources } from "../../api/LivlearnApi";
import RecommendedCard from "../Card/RecommendedCard/RecommendedCard";
import BasePopup from "../Popup/BasePopup";
import ViewDetailsRec from "../Form/ViewDetailsRec";
import SearchBar from "../Search/SearchBar";

const Home = (props: { loggedIn: boolean }) => {
  const [publicLists, setPublicLists] = useState<ResourceList[]>([]);
  const [query, setQuery] = useState<Query>({
    tagIds: [],
    level: "AN",
    types: ["AB", "AR", "BL", "BO", "CO", "OT", "PO", "TO" ,"VI"],
    search: "",
  });
  const [recommendedResources, setRecommendedResources] = useState<
    ResourceRec[]
  >([]);
  const [selectedViewDetails, setSelectedViewDetail] =
    useState<ResourceRec | null>(null);

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
    getResources(query)
      .then((r) => setRecommendedResources(r))
      .catch((e) => console.error(e));
  }, [query]);

  const viewDetails = useCallback(
    (r: ResourceRec) => setSelectedViewDetail(r),
    []
  );

  const onSearch = useCallback((query: Query) => {
    setQuery(query);
  }, []);

  return (
    <div className="flex flex-col w-100 max-w-screen-2xl md:mx-auto">
      <h1 className="text-gray-900 px-4 pt-8 text-3xl leading-none font-extrabold tracking-tight">
        livlearn - we <span className="text-red-500">❤️</span> learning cool
        stuff online
      </h1>
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
        widgets={<SearchBar onSearch={onSearch} className="mb-3" query={query}/>}
      >
        {recommendedResources.map((r) => {
          return (
            <RecommendedCard rr={r} key={r.id} onViewDetails={viewDetails} />
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

      <img src={elephant} alt="" className="fixed w-12 h-12 bottom-0 right-2" />
    </div>
  );
};

export default Home;
