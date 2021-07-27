import { useCallback, useState } from "react";

type Message = {
  long: string;
  short?: string;
};

export default function useBannerMessage(defaultMessage: string | null) {
  const setErrorMessage = useCallback((message: string) => {
    setIsError(true);
    setMessage({
      long: `${message}. 🐞 We'd love it if you could us a bug report at info@howshouldilearn.com.`,
      short: `${message}`,
    });
  }, []);
  const setBannerMessage = useCallback((message: string) => {
    setIsError(false);
    setMessage({
      long: message,
    });
  }, []);
  const clearBanner = useCallback(() => {
    setIsError(false);
    setMessage(null);
  }, []);
  const [message, setMessage] = useState<Message | null>(
    defaultMessage ? { long: defaultMessage } : null
  );
  const [isError, setIsError] = useState(false);

  return { isError, message, setErrorMessage, setBannerMessage, clearBanner };
}
