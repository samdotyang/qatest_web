import { apiClient } from './client'


export const deleteTestSuite = async (testSuiteId: string) => {
    try {
        return await apiClient.delete(`/testsuite/${testSuiteId}`)
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
    }
}