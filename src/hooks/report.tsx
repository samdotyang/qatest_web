import { useQuery } from "@tanstack/react-query";

export const generateReport = () => {
  return;
};

export const useGetPassRate = (team?: string, days?: number, type?: string) => {
  const searchParams = new URLSearchParams();
  if (team) {
    searchParams.append("team", team);
  }
  if (days) {
    searchParams.append("days", `${days}`);
  }
  if (type) {
    if (["regression", "daily"].includes(type)) {
      switch (type) {
        case "regression":
          searchParams.append("is_regression", "true");
          break;
        case "daily":
          searchParams.append("is_daily", "true");
          break;
      }
    } else {
      throw new Error(
        "Invalid type. Type should be either 'regression' or 'daily'."
      );
    }
  }
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["passRate", team, days, type],
    queryFn: async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_BACKEND_API
        }/report/pass_rates?${searchParams.toString()}`
      );
      const json_response = await response.json();
      return json_response;
    },
    staleTime: 1000 * 60 * 5, // 60 minutes
    refetchInterval: 1000 * 60 * 5, // 60 minutes
  });
  return {
    passRate: data,
    isPassRateLoading: isLoading,
    passRateError: error,
    refetchPassRate: refetch,
  };
};
