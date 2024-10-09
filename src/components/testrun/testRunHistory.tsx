import TestRunList from "./testRunList";

const TestRunHistory = () => {
    return (
    <>
        <div className="text-primary-label dark:text-dark-primary-label text-lg font-bold">
            History
        </div>
        <TestRunList rows={10}/>
    </>
    );
}

export default TestRunHistory;
