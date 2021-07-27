import { useHistory } from "react-router-dom";
import ResourceListCard from "../Card/ResourceListCard";
import CardCollection from "../Card/CardCollection";
import Button from "../Button/Button";
import useMyResourceLists from "../../hooks/useMyResourceLists";
import { useContext } from "react";
import { BannerContext } from "../../App";

const MyPage = () => {
  const { setErrorMessage } = useContext(BannerContext);
  const history = useHistory();
  const { myLists } = useMyResourceLists(setErrorMessage);

  return (
    <div className="flex w-full flex-grow items-center flex-col md:items-start max-w-screen-2xl mx-auto">
      {myLists.length > 0 ? (
        <>
          <CardCollection title={`Your collections (${myLists.length})`}>
            {myLists
              .filter((l) => !!l.id)
              .map((l) => {
                return <ResourceListCard rl={l} key={l.id!} hideUpvotes />;
              })}
          </CardCollection>
          <div className="mx-auto">
            <Button
              onClick={() => history.push("/list")}
              text="Create a new collection"
              color="green"
              className="my-5"
            />
          </div>
        </>
      ) : (
        <div className="flex w-full flex-grow items-center flex-col mt-10 p-10">
          <p className="text-gray-500  dark:text-gray-400 pb-8">
            You haven't saved any collections yet
          </p>
          <Button
            onClick={() => history.push("/list")}
            text="Create a new collection"
            color="green"
            className="my-5"
          />
        </div>
      )}
    </div>
  );
};

export default MyPage;
