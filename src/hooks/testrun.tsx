import { useQuery } from "@tanstack/react-query"

export const useTestRunList = (limit: number) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['testRunList'],
        queryFn: async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/testrun/lists?${new URLSearchParams({limit: `${limit}`}).toString()}`)
            const json_response = await response.json()
            return json_response.data
        }
    })
    return {
        testRunList: data,
        isTestRunListLoading: isLoading,
        testRunListError: error
    }
}
