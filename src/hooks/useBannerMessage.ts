import { useCallback, useState } from "react";
import { BannerButtonParams } from "../components/Banner/Banner";

export type Message = {
  long: string;
  short?: string;
};

export default function useBannerMessage(
  defaultMessage: Message | null,
  defaultButton: BannerButtonParams | null
) {
  const setErrorMessage = useCallback((message: string) => {
    setIsError(true);
    setMessage({
      long: `${message}. 🐞 We'd love it if you could us a bug report at info@howshouldilearn.com.`,
      short: `${message}`,
    });
    setButtonParams(null);
  }, []);
  const setBannerMessage = useCallback(
    (message: Message, buttonParams: BannerButtonParams | null) => {
      setIsError(false);
      setMessage(message);
      setButtonParams(buttonParams);
    },
    []
  );
  const clearBanner = useCallback(() => {
    setIsError(false);
    setMessage(null);
    setButtonParams(null);
  }, []);
  const [message, setMessage] = useState<Message | null>(defaultMessage);
  const [buttonParams, setButtonParams] = useState<BannerButtonParams | null>(
    defaultButton
  );
  const [isError, setIsError] = useState(false);

  return {
    isError,
    message,
    setErrorMessage,
    setBannerMessage,
    clearBanner,
    buttonParams,
  };
}
