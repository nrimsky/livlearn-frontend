import SignIn from "../Auth/SignIn";
import Button from "../Button/Button";
import { useHistory } from "react-router-dom";
import { streamPublicLists } from "../../firebase/FirestoreService";
import { useEffect, useState } from "react";
import ResourceList from "../../types/ResourceList";
import CardCollection from "../Card/CardCollection";
import ResourceListCard from "../Card/ResourceListCard";
import elephant from "../../img/elephant.svg";

const Home = (props: { loggedIn: boolean }) => {
  const history = useHistory();
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
    <div className="flex flex-col w-full max-w-screen-2xl sm:mx-auto">
      <div className="border border-gray-200 bg-white p-5 rounded shadow-sm m-5 relative">
        <img src={elephant} alt="" className="absolute w-12 h-12 bottom-0 right-2" />
        <h1 className="text-gray-800 text-2xl">
          Use resourceee to share lists of learning resources with friends,
          students, coworkers or for future reference.
        </h1>
        {props.loggedIn && (
          <div className="grid grid-flow-col auto-cols-max gap-3 place-content-center mt-5">
            <Button
              onClick={() => history.push("/list")}
              text="New list"
              color="green"
            />
            <Button
              onClick={() => history.push("/u")}
              text="Your lists"
              color="yellow"
            />
          </div>
        )}
      </div>
      <div className="flex justify-center mt-2">
        {!props.loggedIn && <SignIn />}
      </div>
      <CardCollection title={"Community lists"}>
        {publicLists
          .filter((l) => !!l.id)
          .map((l, i) => {
            return <ResourceListCard rl={l} key={l.id!} hideLock />;
          })}
      </CardCollection>
    </div>
  );
};

export default Home;
