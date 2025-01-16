import { ChevronRight } from "lucide-react";

export const AutomationRunnerListItem = ({
  id,
  item,
}: {
  id: string,
  item: Record<string, string>;
}) => {
  return (
    <div className="flex justify-between bg-card p-4 rounded-md">
      <div>id: {id}</div>
      <div className="flex items-center">
        <div>{item.status}</div>
        <ChevronRight />
      </div>
    </div>
  );
};
