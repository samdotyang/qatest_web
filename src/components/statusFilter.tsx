import { Filter } from "lucide-react";

type StatusFilterProps = {
  labels: Array<Record<string, string>>;
  selectedStatus: string;
  onChange: (status: string) => void;
};

const StatusFilter = ({
  labels,
  selectedStatus,
  onChange,
}: StatusFilterProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Filter className="w-4 h-4 text-gray-500" />
      <div className="flex space-x-1">
        {labels.map((status) => (
          <button
            key={status.value}
            onClick={() => onChange(status.value)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedStatus === status.value
                ? "bg-blue text-primary-label"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;
