import {
  SpeakerphoneIcon,
  XIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";
import classNames from "../../helpers/classNames";

type BannerButtonParams = {
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
        "w-full text-sm",
        isError
          ? "bg-gradient-to-r from-red-500 to-yellow-500 dark:from-red-600 dark:to-yellow-600"
          : "bg-gradient-to-r from-green-500 via-blue-600 to-pink-500 dark:from-green-600 dark:via-blue-600 dark:to-pink-600"
      )}
    >
      <div className="px-2 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between flex-wrap max-w-screen-2xl mx-auto">
          <div className="w-0 flex-1 flex items-center">
            <span
              className={classNames(
                "flex p-2 rounded-lg bg-opacity-40",
                isError ? "bg-red-800" : "bg-green-800"
              )}
            >
              {isError ? (
                <ExclamationCircleIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              ) : (
                <SpeakerphoneIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              )}
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden">
                {shortText ? shortText : longText}
              </span>
              <span className="hidden md:inline">{longText}</span>
            </p>
          </div>
          {buttonParams && (
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <button
                className={classNames(
                  "flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-white",
                  isError
                    ? "text-red-600 hover:bg-red-50"
                    : "text-green-600 hover:bg-green-50"
                )}
                onClick={buttonParams.action}
              >
                {buttonParams.text}
              </button>
            </div>
          )}
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className={
                "flex rounded-md focus:outline-none"
              }
              onClick={clearBanner}
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
