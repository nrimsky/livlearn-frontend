import SignIn from "../Auth/SignIn";
import Button from "../Button/Button";
import { useHistory } from "react-router-dom";
import { getPublicListsFromFirebase } from "../../firebase/FirestoreService";
import { useEffect, useState } from "react";
import ResourceList from "../../types/ResourceList";
import CardCollection from "../Card/CardCollection";
import ResourceListCard from "../Card/ResourceListCard";

const Home = (props: { loggedIn: boolean }) => {
  const history = useHistory();
  const [publicLists, setPublicLists] = useState<ResourceList[]>([]);

  useEffect(() => {
    getPublicListsFromFirebase().then((lists) => {
      setPublicLists(lists);
    });
  }, []);

  return (
    <div className="flex flex-col max-w-6xl mx-auto justify-left p-t">
      <h1 className="text-green-900 text-3xl sm:text-4xl p-5">
        Use resourceee to share lists of learning resources with friends,
        students, coworkers or for future reference.
      </h1>
      <div className="flex justify-center p-5">
        {props.loggedIn ? (
          <Button
            onClick={() => history.push("/list")}
            text="Create a new list"
            color="green"
          />
        ) : (
          <SignIn />
        )}
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
