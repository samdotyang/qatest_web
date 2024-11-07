import { useQuery } from "@tanstack/react-query"

export const useGetLogNameList = (fp: string) => {
    const { data, isFetching, error } = useQuery({
        queryKey: [''],
        queryFn: async () => {
            
        }
    })
}

export const useGetLogContent = (filename: string) => {
    const { data, isFetching, error } = useQuery({
        queryKey: [`getLogContent_${filename}`],
        queryFn: async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/logs/content/${filename}`)
            return await response.text()
        }
    })
}