import React from "react";
import Button from "../Button/Button";
import { useHistory } from "react-router-dom";

const Home = (props: { loggedIn: boolean }) => {
  const history = useHistory();
  return (
    <div className="flex justify-center items-center w-screen flex-grow bg-yellow-100">
      <div className="text-center max-w-lg">
        <h1 className="text-green-700 font-bold text-3xl mb-5">
        💡 The easiest way to share a list of learning resources.
        </h1>
        {props.loggedIn ? (
          <Button
            text="📝 Make a List!"
            color="green"
            onClick={() => history.push("/list")}
          />
        ) : (
          <Button
            text="Log in or Sign up"
            color="green"
            onClick={() => history.push("/auth")}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
