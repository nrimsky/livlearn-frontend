import { UserIcon, ArrowRightIcon } from "@heroicons/react/solid";
import firebase from "firebase/app";
import "firebase/auth";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Switch } from "@headlessui/react";

// "https://source.unsplash.com/4csdTPXTM1A/1600x900"

export default function MyProfile(props: { user: firebase.User }) {
  const [profilePublic, setProfilePublic] = useState(false);
  return (
    <div className="text-gray-600 dark:text-gray-300 body-font">
      <div className="container px-5 py-16 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="rounded-lg h-72 overflow-hidden">
            <img
              alt="content"
              className="object-cover object-center h-full w-full"
              src="https://source.unsplash.com/O_CLjxjzN3M/800x800"
            />
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="inline-flex items-center justify-center rounded-full p-4 bg-gray-200 dark:bg-gray-700 border-4 border-gray-400">
                <UserIcon className="w-12 h-12 text-gray-400 rounded-full font-thin" />
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900  dark:text-white text-lg">
                  {props.user.displayName ??
                    props.user.email?.split("@")[0] ??
                    "Anonomous user"}
                </h2>
                <div className="mt-2">
                  <p className="text-gray-600  dark:text-gray-300 text-sm p-1">
                    {profilePublic ? "Profile is public" : "Profile is private"}
                  </p>
                  <Switch
                    checked={profilePublic}
                    onChange={setProfilePublic}
                    className={`${
                      profilePublic ? "bg-green-500" : "bg-gray-300"
                    } relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mt-2`}
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${
                        profilePublic ? "translate-x-6" : "translate-x-1"
                      } inline-block w-4 h-4 transform bg-white dark:bg-gray-900 rounded-full pointer-events-none`}
                    />
                  </Switch>
                </div>
                <div className="w-12 h-1 bg-green-500 rounded mt-2 mb-4"></div>
                <p className="text-base">
                  LivLearn learner profiles are coming soon! We are developing a
                  super cool learner profile system that will help you track
                  goals, share your achievements and share knowledge with
                  others.
                </p>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 dark:border-gray-500 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <p className="leading-relaxed text-lg mb-4">
                LivLearn learner profiles are coming soon! We are developing a
                super cool learner profile system that will help you track
                goals, share your achievements and share knowledge with others.
                <br />
                <br />
                Your livlearn profile will be a place where you can share what
                you are currently learning, show people your public resource
                collections and stay accountable with your goals. You can also
                keep your profile private and just use it to keep personal
                notes.
              </p>
              <Link
                to="/u"
                className="text-green-500 inline-flex items-center underline"
              >
                Your collections
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
