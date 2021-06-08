import SignIn from "../Auth/SignIn";
import { streamPublicLists } from "../../firebase/FirestoreService";
import { useEffect, useState } from "react";
import ResourceList from "../../types/ResourceList";
import CardCollection from "../Card/CardCollection";
import ResourceListCard from "../Card/ResourceListCard";
import elephant from "../../img/elephant.svg";

const Home = (props: { loggedIn: boolean }) => {

  const [publicLists, setPublicLists] = useState<ResourceList[]>([]);

  useEffect(() => {
    const unsubscribe = streamPublicLists((lists) => {
      setPublicLists(lists);
    }, (error) => {
      console.error(error);
    })
    return unsubscribe;
  }, []);

  return (
    <div className="flex flex-col w-100 max-w-screen-2xl sm:mx-auto">
      <p className="text-gray-900 pt-5 pl-5 text-3xl leading-none font-extrabold tracking-tight">livlearn - curate and share learning resources.</p>
      <div className="flex justify-center">
        {!props.loggedIn && <SignIn />}
      </div>
      <CardCollection title={"Resource collections recently shared with the community"}>
        {publicLists
          .filter((l) => !!l.id)
          .map((l, i) => {
            return <ResourceListCard rl={l} key={l.id!} hideLock />;
          })}
      </CardCollection>
      <img src={elephant} alt="" className="absolute w-12 h-12 bottom-0 right-2" />
    </div>
  );
};

export default Home;

