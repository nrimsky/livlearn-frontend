import {
  UserIcon,
  ArrowRightIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { Switch } from "@headlessui/react";
import Profile from "../../types/Profile";
import { editProfile } from "../../firebase/FirestoreService";
import PInput from "./PInput";

function BodySection(props: {
  initial?: string;
  onChange: (text: string) => void;
}) {
  return (
    <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 dark:border-gray-500 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
      <PInput
        onSubmit={props.onChange}
        rows={10}
        initial={
          props.initial ??
          "Your livlearn profile is a place where you can share what you are currently learning, show people your public resource collections and stay accountable with your goals. You can also keep your profile private and just use it to keep personal notes."
        }
      />
      <Link
        to="/u"
        className="text-green-500 inline-flex items-center underline"
      >
        Your collections
        <ArrowRightIcon className="w-4 h-4 ml-2" />
      </Link>
    </div>
  );
}

function TaglineSection(props: {
  initial?: string;
  onChange: (text: string) => void;
}) {
  return (
    <PInput
      onSubmit={props.onChange}
      rows={5}
      initial={
        props.initial ??
        "A short description of you, what you're interested and what you're currently learning."
      }
    />
  );
}

function UsernameSection(props: {
  initial?: string;
  onChange: (text: string) => void;
}) {
  return (
    <div className="font-medium mt-4 leading-none text-lg ">
      <PInput
        onSubmit={props.onChange}
        rows={1}
        initial={props.initial ?? "No username."}
      />
    </div>
  );
}

export default function MyProfile(props: { profile: Profile }) {
  const togglePrivate = () => {
    editProfile({ ...props.profile, isPrivate: !props.profile.isPrivate });
  };
  return (
    <div className="text-gray-600 dark:text-gray-300 body-font">
      <div className="container px-6 py-16 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="rounded-lg h-72 overflow-hidden">
            <img
              alt="content"
              className="object-cover object-center h-full w-full"
              src="https://source.unsplash.com/O_CLjxjzN3M/800x800"
            />
          </div>
          <div className="flex flex-col sm:flex-row mt-10 items-top">
            <div className="sm:w-1/3 sm:pr-8">
              <div className="flex flex-col items-center justify-center text-center">
                <UserIcon className="w-20 h-20 text-gray-400 rounded-full font-thin p-4 rounded-full border-4 border-gray-400" />
                <UsernameSection
                  initial={props.profile.username}
                  onChange={() => {
                    return;
                  }}
                />

                <p className="text-gray-600  dark:text-gray-300 text-sm p-1 mt-2">
                  {props.profile.isPrivate
                    ? "Profile is private"
                    : "Profile is public"}
                </p>
                <Switch
                  checked={!props.profile.isPrivate}
                  onChange={togglePrivate}
                  className={`${
                    props.profile.isPrivate ? "bg-gray-300" : "bg-green-500"
                  } relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mt-2`}
                >
                  <span className="sr-only">
                    {props.profile.isPrivate
                      ? "Make profile public"
                      : "Make profile private"}
                  </span>
                  <span
                    className={`${
                      props.profile.isPrivate
                        ? "translate-x-1"
                        : "translate-x-6"
                    } inline-block w-4 h-4 transform bg-white dark:bg-gray-900 rounded-full pointer-events-none`}
                  />
                </Switch>

                <div className="w-12 h-1 bg-green-500 rounded my-4"></div>
                <TaglineSection
                  initial={props.profile.tagline}
                  onChange={() => {
                    return;
                  }}
                />
              </div>
            </div>
            <BodySection
              initial={props.profile.body}
              onChange={() => {
                return;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
