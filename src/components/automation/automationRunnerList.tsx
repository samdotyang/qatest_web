import { AutomationRunnerListItem } from "./automationRunnerListItem";

export const AutomationRunnerList = ({
  runnerList,
  onItemDelete,
}: {
  runnerList: Array<Record<string, string>>;
  onItemDelete: (runnerId: string) => void;
}) => {
  return (
    <>
      {Object.keys(runnerList).length > 0 ? (
        Object.entries(runnerList).map(([key, value], index) => (
          <AutomationRunnerListItem key={index} id={key} item={value} onItemDelete={onItemDelete} />
        ))
      ) : (
        <div>No Runners Running</div>
      )}
    </>
  );
};
