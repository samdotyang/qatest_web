import { useQuery } from "@tanstack/react-query";

export const useTestRunList = (limit: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["testRunList"],
    queryFn: async () => {
      const response = await fetch(
        `${
          process.env.REACT_APP_BACKEND_API
        }/testrun/lists?${new URLSearchParams({
          limit: `${limit}`,
        }).toString()}`
      );
      const json_response = await response.json();
      return json_response.data;
    },
  });
  return {
    testRunList: data,
    isTestRunListLoading: isLoading,
    testRunListError: error,
  };
};

export const useTestRunDetail = (testRunId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [`testRunDetail_${testRunId}`],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/report/${testRunId}`
      );
      const json_response = await response.json();
      console.log(json_response);
      return json_response.data;
    },
  });
  return {
    testRunDetail: data,
    isTestRunDetailLoading: isLoading,
    testRunDetailError: error,
  };
};
