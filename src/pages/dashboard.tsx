import { Card } from "@/components/ui/card";
import { useAutomationCaseCount } from "@/hooks";



const Dashboard = () => {
  const { isFetching, automationCaseCount, error } = useAutomationCaseCount();
  return (
    <>
      <div className="flex flex-row flex-wrap">
        <Card>
          {!isFetching && (
            <div className="flex flex-col items-center text-primary-label">
              <div className="text-4xl h-32 w-32 mx-auto flex items-center justify-center font-bold">
                {error ? 0 : automationCaseCount.data}
              </div>
              <div className="m-auto p-2">Automation Cases</div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
