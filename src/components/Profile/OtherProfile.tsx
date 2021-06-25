import { UserIcon } from "@heroicons/react/solid";
import Profile from "../../types/Profile";

export default function OtherProfile(props: { profile: Profile }) {
  return (
    <div className="text-gray-600 dark:text-gray-300 body-font">
      <div className="container px-5 py-16 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="rounded-lg h-72 overflow-hidden">
            <img
              alt="content"
              className="object-cover object-center h-full w-full"
              src="https://source.unsplash.com/4csdTPXTM1A/800x800"
            />
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="inline-flex items-center justify-center rounded-full p-4 bg-gray-200 dark:bg-gray-700 border-4 border-gray-400">
                <UserIcon className="w-12 h-12 text-gray-400 rounded-full font-thin" />
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900  dark:text-white text-lg">
                  {props.profile.username ?? "No username"}
                </h2>
                <div className="w-12 h-1 bg-green-500 rounded mt-2 mb-4"></div>
                <p className="text-base">
                  {props.profile.tagline ?? "No tagline"}
                </p>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 dark:border-gray-500 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <p className="leading-relaxed text-lg mb-4">
                {props.profile.body ?? "No about section"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
