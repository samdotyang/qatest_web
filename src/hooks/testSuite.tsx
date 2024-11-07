import { useQuery } from "@tanstack/react-query";

export const useGetTestSuiteList = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["getTestSuiteList"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/testsuite/lists`
      );
      const json_response = await response.json();
      return json_response.data;
    },
  });
  console.log(data, error);
  return {
    isTestSuiteListFetching: isLoading,
    testSuiteList: data,
    testSuiteListError: error,
  };
};
