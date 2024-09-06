import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import JiraTestStep from "@/components/testStep/jiraTestStep";
import TextEditor from "@components/textEditor/textEditor";
import Quill from "quill";

const Delta = Quill.import('delta');

type TestCase = {
  key: string;
  name: string;
  priority: string;
  platform: string;
  folder: string;
  owner: string;
  status: string;
  precondition: string;
  testScript: Array<Record<string, string>>;
};

const filterKeys = [
  "id",
  "testScript",
  "labels",
  "customFields",
  "owner",
  "links",
  "name",
  "key",
  "precondition",
];

const JiraTestCase = () => {
  const [testcase, setTestCase] = useState<TestCase | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const getTestCase = async (caseId: string) => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}/testcase/jira/${caseId}`
    );
    console.log(res.data);
    console.log(res.data["data"]["precondition"]);
    res.data["data"]["precondition"] = res.data["data"][
      "precondition"
    ].replaceAll("<br />", "\n");
    setTestCase(res.data["data"]);
  };

  const quillRef = useRef();

  useEffect(() => {
    getTestCase("KQT-T7755");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTestCase((prev) => ({ ...prev!, precondition: e.target.value }));
  };

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      console.log(textareaRef.current);
      // @ts-ignore
      textareaRef.current.style.height = "auto";
      // @ts-ignore
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [testcase?.precondition]);

  return (
    <>
      <div className="flex flex-col space-y-2 h-full max-h-screen w-full m-auto text-primary-label dark:text-dark-primary-label">
        <div className="flex flex-row justify-items-stretch">
          {testcase && (
            <p className="text-lg font-bold">
              {testcase.key}: {testcase.name}
            </p>
          )}
          <div className="justify-self-end ml-auto mr-0">
            <button
              className="bg-blue-500 rounded-md p-2"
              onClick={() => setIsEdit((prev) => !prev)}
            >
              {isEdit ? <FaRegSave /> : <FaRegEdit />}
            </button>
          </div>
        </div>
        <div className="bg-mac-light-card dark:bg-mac-dark-card p-2 rounded-lg grid grid-cols-2 gap-y-2 w-2/3">
          {testcase &&
            Object.entries(testcase).map(([key, value], index) => {
              if (!filterKeys.includes(key)) {
                return (
                  <React.Fragment key={index}>
                    <span>{key}: </span>
                    {isEdit ? (
                      <input
                        className="bg-transparent rounded-md px-2 my-auto border border-1 border-gray-500"
                        // @ts-ignore
                        value={value}
                        disabled={key !== "id" ? false : true}
                      />
                    ) : value == null ? (
                      <p className="">null</p>
                    ) : (
                      // @ts-ignore
                      <p className="overflow-hidden">{value}</p>
                    )}
                  </React.Fragment>
                );
              } else {
                return <React.Fragment key={index}></React.Fragment>;
              }
            })}
        </div>

        <span className="text-lg font-bold">PreCondition:</span>
        {testcase && (
          <TextEditor ref={quillRef} readOnly={isEdit} defaultValue={testcase.precondition} onSelectionChange={() => {}} onTextChange={() => {}}/>
          // <textarea
          //   ref={textareaRef}
          //   className="resize-y min-h-36 appearance-none bg-transparent rounded-md py-2 px-3 my-auto border border-1 border-gray-500 whitespace-pre-wrap focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          //   value={testcase.precondition.replaceAll("<br />", "\n")}
          //   onChange={handleChange}
          // ></textarea>
        )}
        <span className="text-lg font-bold">Steps:</span>
        <div>

          {testcase && <JiraTestStep steps={testcase.testScript} />}
        </div>
      </div>
    </>
  );
};

export default JiraTestCase;
