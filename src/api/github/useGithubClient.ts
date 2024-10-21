import { AxiosRequestConfig, isAxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { githubClient } from "./githubClient";

export const useGithubClient = (config: AxiosRequestConfig) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  const makeRequest = useCallback(async () => {
    setLoading(true);

    try {
      const response = await githubClient(config);

      setData(response.data);
      setLoading(false);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.cause?.message);
        setLoading(false);
      } else {
        setLoading(false);
        setError("Unexpected Errror");
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      makeRequest();
    })();
  }, [makeRequest]);

  return { data, loading, error };
};
