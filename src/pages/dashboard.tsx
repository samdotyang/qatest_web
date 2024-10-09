import { SmallCard } from "@/components/ui/card";
import { useAutomationCaseCount } from "@/hooks";



const Dashboard = () => {
  const { isFetching, automationCaseCount, error } = useAutomationCaseCount();
  return (
    <>
      <div className="flex flex-row flex-wrap">
        <SmallCard>
          {!isFetching && (
            <div className="flex flex-col items-center">
              <div className="text-4xl h-32 w-32 mx-auto flex items-center justify-center font-bold">
                {error ? 0 : automationCaseCount.data}
              </div>
              <div className="m-auto">Automation Cases</div>
            </div>
          )}
        </SmallCard>
      </div>
    </>
  );
};

export default Dashboard;
