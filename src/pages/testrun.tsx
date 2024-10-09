import TestRunHistory from "@/components/testrun/testRunHistory";

const TestRunPage = () => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row">
          <div className="bg-mac-light-card dark:bg-mac-dark-card rounded-lg text-primary-label dark:text-dark-primary-label  w-1/2">
            <div className="font-bold p-2">Clauster</div>
            <div className="flex flex-row">
              <div className="basis-1/2 grid grid-flow-row place-items-center">
                <div>{0}</div>
                <div> Idle</div>
              </div>
              <div className="basis-1/2 grid grid-flow-row place-items-center">
                <span>{0}</span>
                <span> Running</span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <TestRunHistory />
      </div>
    </>
  );
};

export default TestRunPage;
