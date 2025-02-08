import StressHistoryListItem from "./stressHistoryListItem";


type StressHistoryListItemProps = {
    data: Array<Record<string, string>>;
  };
  
  const StressHistoryListHeader = () => {
    return (
      <div className="flex flex-row text-primary-label  p-2">
        <div className="basis-1/2">Endpoint</div>
        <div className="basis-1/4">Requests</div>
        <div className="basis-1/4">Fails</div>
        <div className="basis-1/4">Max(s)</div>
        <div className="basis-1/4">Min(s)</div>
        <div className="basis-1/4">Mean(s)</div>
        <div className="basis-1/4">Median(s)</div>
        <div className="basis-1/4">RPS</div>
        <div className="basis-1/4">Total(s)</div>
      </div>
    );
  };
  
  const StressHistoryList = ({ data }: StressHistoryListItemProps) => {
    return (
      <>
        <StressHistoryListHeader />
        {data.length > 0 ? (
          <>
            {data &&
              data.map((item, index) => (
                <StressHistoryListItem key={index} index={index} item={item} />
              ))}
          </>
        ) : (
          <div className="text-primary-label  m-auto">No history</div>
        )}
      </>
    );
  };
  
  export default StressHistoryList;
  