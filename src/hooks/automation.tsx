import { useQuery } from "@tanstack/react-query"

export const useGetAutomationRunnerList = () => {
    const { isFetching, data, error } = useQuery({
        queryKey: ['getAutomationRunnerList'],
        queryFn: async() => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/automation/runners`)
            const json_response = await response.json()
            return json_response.data;
        }
    })
    return {
        isAutomationRunnerListFetching: isFetching,
        automationRunnerList: data,
        automationRunnerListError: error
    }
}