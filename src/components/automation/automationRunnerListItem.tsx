import { ChevronRight, Trash2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export const AutomationRunnerListItem = ({
  id,
  item,
}: {
  id: string;
  item: Record<string, string>;
}) => {
  //props
  // const navigate = useNavigate();

  const itemClick = (id: string) => {
    // navigate(`/automation/${id}`);
  };

  return (
    <div
      className="bg-card rounded-md"
      onClick={() => {
        itemClick(id);
      }}
    >
      <Link to={`/automation/${id}`} className="flex justify-between p-4">
        <div>id: {id}</div>
        <div className="flex items-center">
          <div>{item.status}</div>
          {item.status === "completed" && <Trash2 className="ml-2" />}
          <ChevronRight />
        </div>
      </Link>
    </div>
  );
};
