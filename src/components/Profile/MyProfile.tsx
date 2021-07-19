import { UserIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { Switch } from "@headlessui/react";
import Profile from "../../types/Profile";
import { editProfile } from "../../firebase/FirestoreService";
import Button from "../Button/Button";
import BasePopup from "../Popup/BasePopup";
import { useState } from "react";
import EditProfileForm from "../Form/EditProfileForm";

// "https://source.unsplash.com/4csdTPXTM1A/1600x900"

export default function MyProfile(props: { profile: Profile, uid: string }) {
  const toggleProfilePrivate = () => {
    editProfile({ ...props.profile, isPrivate: !props.profile.isPrivate });
  };
  const [isEditing, setIsEditing] = useState(false);
  const finishEditing = () => {
    setIsEditing(false);
  };
  const changeProfile = (p: Profile) => {
    editProfile(p).catch((e) => console.error(e));
  };
  return (
    <div className="text-gray-600 dark:text-gray-300">
      <div className="container px-8 py-16 mx-auto flex flex-col">
        <div className="lg:w-5/6 mx-auto">
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
                <p className="font-medium font-semibold mt-4 text-gray-900 dark:text-white text-md overflow-ellipsis break-all">
                  {props.profile.username}
                </p>
                <div className="mt-2">
                  <p className="text-gray-600  dark:text-gray-300 text-sm p-1">
                    {!props.profile.isPrivate
                      ? "Profile is public"
                      : "Profile is private"}
                  </p>
                  <Switch
                    checked={!props.profile.isPrivate}
                    onChange={toggleProfilePrivate}
                    className={`${
                      !props.profile.isPrivate ? "bg-green-500" : "bg-gray-300"
                    } relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mt-2`}
                  >
                    <span className="sr-only">
                      {!props.profile.isPrivate
                        ? "Make profile private"
                        : "Make profile public"}
                    </span>
                    <span
                      className={`${
                        !props.profile.isPrivate
                          ? "translate-x-6"
                          : "translate-x-1"
                      } inline-block w-4 h-4 transform bg-white dark:bg-gray-900 rounded-full pointer-events-none`}
                    />
                  </Switch>
                </div>
                <div className="w-12 h-1 bg-green-500 rounded mt-2 mb-4"></div>
                <p className="text-base">
                  {props.profile.tagline}
                </p>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-300 dark:border-gray-500 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <p className="leading-relaxed text-lg mb-4">
                {props.profile.body}
              </p>
              <Button
                color="green"
                text="Edit Profile"
                onClick={() => setIsEditing(true)}
                className="mt-2"
              />
              <Link
                to="/u"
                className="text-green-500 flex items-center underline mt-4"
              >
                Go to your collections
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <BasePopup
        isOpen={isEditing}
        onClickClose={finishEditing}
        title="Edit Profile"
      >
        <EditProfileForm
          initial={props.profile}
          onChange={changeProfile}
          onClose={finishEditing}
        />
      </BasePopup>
    </div>
  );
}
