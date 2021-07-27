import {
  SpeakerphoneIcon,
  XIcon,
  ExclamationCircleIcon,
  ArrowRightIcon
} from "@heroicons/react/outline";
import classNames from "../../helpers/classNames";

export type BannerButtonParams = {
  text: string;
  action: () => void;
};

type BannerProps = {
  isError: boolean;
  longText: string;
  clearBanner: () => void;
  shortText?: string;
  buttonParams?: BannerButtonParams;
};

export default function Banner({
  isError,
  longText,
  shortText,
  buttonParams,
  clearBanner,
}: BannerProps) {
  return (
    <div
      className={classNames(
        "w-full text-sm px-2 sm:px-6 py-2 flex items-center justify-between flex-wrap mx-auto font-medium text-white text-sm",
        isError
          ? "bg-gradient-to-r from-red-500 to-yellow-500 dark:from-red-600 dark:to-yellow-600"
          : "bg-gradient-to-r from-green-500 via-blue-600 to-pink-500 dark:from-green-600 dark:via-blue-600 dark:to-pink-600"
      )}
    >
      {isError ? (
        <ExclamationCircleIcon className="h-6 w-6" aria-hidden="true" />
      ) : (
        <SpeakerphoneIcon className="h-6 w-6" aria-hidden="true" />
      )}
      <div>
        <p className="truncate inline">
          <span className="md:hidden">{shortText ? shortText : longText}</span>
          <span className="hidden md:inline">{longText}</span>
        </p>
        {buttonParams && (
          <button
            className="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm bg-white text-white focus:outline-none focus:ring-2 focus:ring-white bg-opacity-20 ml-4 hover:bg-opacity-30"
            onClick={buttonParams.action}
          >
            {buttonParams.action} <ArrowRightIcon className="h-3 w-3 inline ml-1" aria-hidden="true" />
          </button>
        )}
      </div>
      <button
        type="button"
        className="focus:outline-none"
        onClick={clearBanner}
      >
        <span className="sr-only">Dismiss</span>
        <XIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}
