import { AutomationRunnerListItem } from "./automationRunnerListItem";

export const AutomationRunnerList = ({
  runnerList,
}: {
  runnerList: Array<Record<string, string>>;
}) => {
  return (
    <>
      {Object.keys(runnerList).length > 0 ? (
        Object.entries(runnerList).map(([key, value], index) => (
          <AutomationRunnerListItem key={index} id={key} item={value} />
        ))
      ) : (
        <div>No Runners Running</div>
      )}
    </>
  );
};
