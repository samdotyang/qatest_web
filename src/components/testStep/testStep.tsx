import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Card } from "../ui/card";

type TestStepProps = {
  index: number;
  step: string;
};

const TestStep = ({ index, step }: TestStepProps) => {
  const [showStep, setShowStep] = useState(false);
  const [jsonStep, setJsonStep] = useState(JSON.parse(step));
  console.log(jsonStep.args)
  return (
    <>
    <div className="my-auto">
      <Card>
        <div className="flex">
          <span className="text-lg font-bold font-">{index}</span>
          <span className="w-full ml-2 my-auto">
            {jsonStep.name}
          </span>
          {Object.keys(jsonStep.args).length !== 0 &&
          <button onClick={() => setShowStep((prev) => !prev)}>
            <ChevronRightIcon className={`w-6 ml-auto mr-0 transition-all transform ${showStep ? "rotate-90": ""}`} />
          </button>
          }
        </div>
      </Card>
      {showStep && (
        <div className={`flex flex-col space-y-2 pl-8 pt-2`}>
          {Object.entries(jsonStep.args).map(
            ([key, value], index: number) => (
              <div key={index} className={`space-y-2 rounded-lg overflow-hidden shadow-lg p-4 bg-mac-light-card dark:bg-mac-dark-card text-primary-label dark:text-dark-primary-label transition duration-500 ease-in-out}`}
              style={{}}
              >
                {key}: {value as any}
              </div>
            )
          )}
        </div>
      )}
      </div>
    </>
  );
};

export default TestStep;
