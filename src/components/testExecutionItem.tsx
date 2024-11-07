type CaseExecution = {
  description: string;
  exc_time: string;
  name: string;
  status: string;
};

const toTimeString = (totalSecondsInString: string) => {
  const totalSeconds = parseInt(totalSecondsInString);
  const totalMinutes = Math.floor(totalSeconds / 60);

  const seconds = Math.round(totalSeconds % 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours} hr ${minutes} mins ${seconds} sec`;
  } else if (minutes > 0) {
    return `${minutes} mins ${seconds} sec`;
  } else {
    return `${seconds} sec`;
  }
};

const TestExecutionItem = ({ value, onItemClick }: { value: CaseExecution, onItemClick: (item:any) => void }) => {
  return (
    <>
      <div className="flex p-2 rounded-lg hover:bg-gray-400 hover:cursor-pointer" onClick={() => {
        onItemClick(value)
        }}>
        <div className="basis-2/12 overflow-auto flex-grow flex-shrink">{value.name}</div>
        <div className="basis-6/12">{value.description}</div>
        <div className="basis-2/12">{toTimeString(value.exc_time)}</div>
        <div className="basis-2/12">
          {value.status === "Pass" ? (
            value.status
          ) : (
            <p className="underline">{value.status}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TestExecutionItem;
