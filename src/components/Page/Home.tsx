import SignIn from "../Auth/SignIn";
import Button from "../Button/Button";
import { useHistory } from "react-router-dom";

const Home = (props: { loggedIn: boolean }) => {
  const history = useHistory();
  return (
    <div className="flex items-center justify-center p-5 flex-col">
      <h1 className="text-gray-700 text-2xl font-medium">
        Use resourceee to share lists of learning resources with friends,
        students, coworkers or for future reference
      </h1>
      <div className="p-5">
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
    </div>
  );
};

export default Home;
