import { useQuery } from "@tanstack/react-query";

export const useGetTestSuiteList = () => {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["getTestSuiteList"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_API}/testsuite/lists`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json_response = await response.json();
      if (!json_response || !json_response.data) {
        throw new Error("Invalid response format");
      }
      return json_response;
    },
    // Optionally add stale time and caching behavior
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

  });
  return {
    refetch: refetch,
    isTestSuiteListFetching: isLoading,
    testSuiteList: data,
    testSuiteListError: error,
  };
};

export const useGetTestSuite = (uuid: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getTestSuite", uuid],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_API}/testsuite/${uuid}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json_response = await response.json();
      if (!json_response ||!json_response.data) {
        throw new Error("Invalid response format");
      }
      return json_response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
  return {
    refetch: refetch,
    isTestSuiteFetching: isLoading,
    testSuite: data,
    testSuiteError: error,
  };
}