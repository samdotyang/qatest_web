import axios from "axios";

import { ChevronRight, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export const AutomationRunnerListItem = ({
  id,
  item,
  onItemDelete,
}: {
  id: string;
  item: Record<string, string>;
  onItemDelete: (runnerId: string) => void;
}) => {
  return (
    <div className="bg-card rounded-md">
      <Link to={`/automation/${id}`} className="flex justify-between p-4">
        <div>id: {id}</div>
        <div className="flex items-center">
          <div>{item.status}</div>
          {item.status === "completed" && (
            <div
              onClick={(e) => {
                e.preventDefault();
                onItemDelete(id);
              }}
            >
              <Trash2 className="ml-2" />
            </div>
          )}
          <ChevronRight />
        </div>
      </Link>
    </div>
  );
};
