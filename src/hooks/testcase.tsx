import { useQuery } from "@tanstack/react-query";

export const useAutomationCaseCount = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["automationCaseCount"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/testcase/automation/count`
      );
      const json_response = await response.json();
      return json_response;
    },
  });
  return {
    isPending: isPending,
    error: error,
    automationCaseCount: data,
    isFetching: isFetching,
  };
};

type Option = {
  value: string;
  label: string;
};

export const useAutomationFeatureList = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["automationFeatureList"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/automation/features`
      );
      const json_response = await response.json();
      const features: Option[] = [];
      json_response.data.map((feature: string) =>
        features.push({ value: feature, label: feature })
      );
      return features;
    },
  });
  return {
    isPending: isPending,
    featuresFetchError: error,
    features: data,
    featuresIsFetching: isFetching,
  };
};

export const useAutomationServiceList = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["automationServiceList"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/automation/services`
      );
      const json_response = await response.json();
      const services: Option[] = [];
      json_response.data.map((service: string) =>
        services.push({ value: service, label: service })
      );
      return services;
    },
  });
  return {
    isPending: isPending,
    servicesFetchError: error,
    services: data,
    servicesIsFetching: isFetching,
  };
};

export const useGetAutomationTestCase = (caseId: string) => {
  const {isFetching, data, error} = useQuery({
    queryKey: [`automationCase_${caseId}`],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/testcase/automation/${caseId}`
      );
      const json_response = await response.json();
      return json_response;
    }
  });
  return {
    automationTestCaseIsFetching: isFetching,
    automationTestCase: data,
    automationTestCaseError: error,
  };
}