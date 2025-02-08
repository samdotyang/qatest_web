type StressHistoryListItemProps = {
  index: number;
  item: Record<string, string>;
};

const StressHistoryListItem = ({  index, item }: StressHistoryListItemProps) => {
  return (
    <>
      <div
        key={`row_${index}`}
        className={`flex flex-row text-primary-label  ${
          index % 2 === 0
            ? "bg-card"
            : "bg-transparent"
        } p-2 rounded-lg`}
      >
        {Object.entries(item).map(([key, value]) => (
          <div
            key={`${key}`}
            className={
              key === "endpoint"
                ? "basis-1/2 group overflow-hidden"
                : "basis-1/4"
            }
          >
            {key === "endpoint" ? (
              <>
                <p className="truncate">{value}</p>
                <p className="hidden group-hover:block absolute bottom-0 left-0 p-1">
                  {value}
                </p>
              </>
            ) : (
              value
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default StressHistoryListItem;
