import axios from "axios";

import { ChevronRight, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export const AutomationRunnerListItem = ({
  id,
  item,
}: {
  id: string;
  item: Record<string, string>;
}) => {

  const deleteItem = async (id: string) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND_API}/automation/tasks/${id}`)
  };

  return (
    <div className="bg-card rounded-md">
      <Link to={`/automation/${id}`} className="flex justify-between p-4">
        <div>id: {id}</div>
        <div className="flex items-center">
          <div>{item.status}</div>
          {item.status === "completed" && <div onClick={(e) => {e.preventDefault();deleteItem(id)}}><Trash2 className="ml-2" /></div>}
          <ChevronRight />
        </div>
      </Link>
    </div>
  );
};
