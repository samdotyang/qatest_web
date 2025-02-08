import { useQuery } from "@tanstack/react-query";

export const useGetTeamList = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["teamList"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_API}/teams`
      );
      const json_response = await response.json();
      return json_response;
    },
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 60 * 1000, // 60 minutes
    refetchOnMount: false,     // Don't refetch when component mounts
  });
  return {
    teamListIsFetching: isFetching,
    teamList: data,
    teamListError: error,
  };
};
