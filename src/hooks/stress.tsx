import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetStressDataList = () => {
  const { isFetching, data, error, isPending } = useQuery({
    queryKey: ["stressDataList"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/stress/lists`
      );
      return await response.json();
    },
  });
  return {
    isStressDataListFetching: isFetching,
    stressDataList: data,
    stressDataListError: error,
    isPending: isPending,
  };
};

export const useGetStressData = (filename: string) => {
  const { isFetching, data, error, refetch } = useQuery({
    queryKey: ["stressData"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/stress/data/${filename}`
      );
      const json_response = await response.json();
      return JSON.parse(json_response.data);
    },
    enabled: false,
  });

  useEffect(() => {
    if (filename) {
      refetch();
    }
  }, [filename, refetch]);

  return {
    isStressDataFetching: isFetching,
    stressData: data,
    stressDataError: error,
  };
};

export const useGetStressHistoryList = () => {
  const { isFetching, data, error, refetch } = useQuery({
    queryKey: ["stressHistories"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/stress/results`
      );
      return await response.json();
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);
  return {
    isStressHistoryListFetching: isFetching,
    stressHistoryList: data,
    stressHistoryListError: error,
  };
};
