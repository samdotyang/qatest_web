import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";
import { FcApproval } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { BsFillDashCircleFill } from "react-icons/bs";

export interface TestCaseFailedInfo {
  id: number;
  test_run_uuid: string;
  name: string;
  description: string;
  platform: string;
  exc_time: string;
  status: string;
  build_version: string;
  fail_function: string;
  terminal_output: string;
  log_file_path: string;
  steps: Array<string>
}

interface FailTestCaseModalProps {
  data: TestCaseFailedInfo;
  show: boolean;
  closeClicked: () => void;
}

type StepProps = {
  stepName: string;
  args: {}
}

const FailStep = ({ stepName, args }: StepProps) => {
  return (
    <div className="flex items-center col-span-3">
      <FcHighPriority />
      <span className="ml-2">
        {stepName}
        {JSON.stringify(args)}
      </span>
    </div>
  );
};

const PassStep = ({ stepName, args }: StepProps) => {
  return (
    <div className="flex items-center col-span-3">
      <FcApproval />
      <span className="ml-2">
        {stepName}
        {JSON.stringify(args)}
      </span>
    </div>
  );
};

const SkipStep = ({ stepName, args }: StepProps) => {
  return (
    <div className="flex items-center col-span-3">
      <BsFillDashCircleFill />
      <span className="ml-2">
        {stepName}
        {JSON.stringify(args)}
      </span>
    </div>
  );
};

const getPosition = (str: string, substr: string, index: number) => {
  return str.split(substr, index).join(substr).length;
};

function toTimeString(totalSeconds: string) {
  const parsedTotalSeconds = parseInt(totalSeconds);
  const totalMinutes = Math.floor(parsedTotalSeconds / 60);

  const seconds = Math.round(parsedTotalSeconds % 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours} hr ${minutes} mins ${seconds} sec`;
  } else if (minutes > 0) {
    return `${minutes} mins ${seconds} sec`;
  } else {
    return `${seconds} sec`;
  }
}

export const FailCaseModal = ({
  data,
  show,
  closeClicked,
}: FailTestCaseModalProps) => {
  if (data.log_file_path.startsWith("/var")) {
    data.log_file_path = data.log_file_path.slice(
      getPosition(data.log_file_path, "/", 3) + 1
    );
  } else if (data.log_file_path.startsWith("/Users")) {
    data.log_file_path = data.log_file_path.slice(
      getPosition(data.log_file_path, "/", 5) + 1
    );
  }
  return (
    <>
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          show ? "" : "hidden"
        } fixed overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 md:h-full bg-gray-500/40 dark:bg-mac-dark/50`}
      >
        <div className="relative w-full max-w-max h-full md:h-auto m-auto">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white border border-black dark:border-gray-700 rounded-lg shadow dark:bg-mac-dark">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {data.name}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
                onClick={closeClicked}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <ModalBody>
              {/* <div>Country:</div>
              <div className="col-span-2">{data.case.country}</div> */}
              <div>Platform:</div>
              <div className="col-span-2">{data.platform}</div>
              {/* <div>Feature:</div>
              <div className="col-span-2">{data.case.feature}</div> */}
              <div>Build Version:</div>
              <div className="col-span-2">{data.build_version}</div>
              <div>Description:</div>
              <div className="col-span-2">{data.description}</div>
              <div className="col-span-1">Steps:</div>
              <div className="col-span-2 inline-flex">
                <FcApproval className="mt-1.5 mr-1.5" />- pass
                <FcHighPriority className="ml-3 mt-1.5 mr-1" />- fail
                <BsFillDashCircleFill className="ml-3 mt-1.5 mr-1" />- skip
              </div>
              {data.steps.map(function (item) {
                const stepName = JSON.parse(item)["name"];
                const args = JSON.parse(item)["args"];
                const lineNo = JSON.parse(item)["lineNo"];
                var fail_lineNo;
                try {
                  fail_lineNo = JSON.parse(data.fail_function)["lineNum"];
                } catch {
                  fail_lineNo = data.fail_function;
                }
                if (fail_lineNo === lineNo) {
                  return (
                    <>
                      <FailStep stepName={stepName} args={args} />
                    </>
                  );
                } else if (lineNo < fail_lineNo && lineNo != fail_lineNo) {
                  return (
                    <>
                      <PassStep stepName={stepName} args={args} />
                    </>
                  );
                } else {
                  return (
                    <>
                      <SkipStep stepName={stepName} args={args} />
                    </>
                  );
                }
              })}
              <div className="col-span-3">Terminal Output:</div>
              <pre className="col-span-3 bg-black p-4 rounded-lg overflow-x-auto">
                <code>{data.terminal_output}</code>
              </pre>
              <div>Execution Time:</div>
              <div className="col-span-2">{toTimeString(data.exc_time)}</div>
              <div>Log:</div>
              <div className="col-span-2 flex-1">
                <a
                  href={`/logs/${data.log_file_path}`}
                  className="text-blue-600 dark:text-blue-500 hover:underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  {data.log_file_path}
                </a>
              </div>
            </ModalBody>
            {/* <!-- Modal footer --> */}
            <ModalFooter><></></ModalFooter>
          </div>
        </div>
      </div>
    </>
  );
};
