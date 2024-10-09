import { AutomationRunnerListItem } from "./automationRunnerListItem";

export const AutomationRunnerList = ({
  runnerList,
}: {
  runnerList: Array<Record<string, string>>;
}) => {
  return (
    <>
      {runnerList.length > 0 ? (
        runnerList.map((item, index) => <AutomationRunnerListItem key={index} item={item}/>)
      ) : (
        <div>No runner list</div>
      )}
    </>
  );
};
