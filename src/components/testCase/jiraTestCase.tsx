import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Pencil, Save } from "lucide-react";
import JiraTestStep from "@/components/testStep/jiraTestStep";
import TextEditor from "@components/textEditor/textEditor";
import TestCaseSearchBar from "./searchBar";
import Quill from "quill";

const Delta = Quill.import("delta");

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

type JiraTestCaseProps = {
  caseId: string;
  onInputChange: (value: string) => void;
  results: TestCase | null;
  loading: boolean;
  error: string | null;
  onSearch: (caseIs: string) => void;
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

const JiraTestCase = ({
  caseId,
  onInputChange,
  results,
  loading,
  error,
  onSearch,
}: JiraTestCaseProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const quillRef = useRef();

  // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setTestCase((prev) => ({ ...prev!, precondition: e.target.value }));
  // };

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      // @ts-ignore
      textareaRef.current.style.height = "auto";
      // @ts-ignore
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [results?.precondition]);

  return (
    <>
      <div className="flex flex-col space-y-2 h-full max-h-screen w-full m-auto text-primary-label ">
        <TestCaseSearchBar
          caseId={caseId}
          onInputChange={onInputChange}
          onButtonClick={onSearch}
        />

        <div className="flex flex-row justify-items-stretch">
          {results && (
            <p className="text-lg font-bold">
              {results.key}: {results.name}
            </p>
          )}
          <div className="justify-self-end ml-auto mr-0">
            <button
              className="bg-blue-500 rounded-md p-2 disabled:bg-blue-900"
              onClick={() => setIsEdit((prev) => !prev)}
              disabled
            >
              {isEdit ? <Save /> : <Pencil />}
            </button>
          </div>
        </div>
        {results && (
          <div className="bg-card p-2 rounded-lg grid grid-cols-2 gap-y-2 w-2/3">
            {Object.entries(results).map(([key, value], index) => {
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
        )}

        <span className="text-lg font-bold">PreCondition:</span>
        {results && (
          <TextEditor
            ref={quillRef}
            readOnly={!isEdit}
            defaultValue={results.precondition}
            onSelectionChange={() => {}}
            onTextChange={() => {}}
          />
          // <textarea
          //   ref={textareaRef}
          //   className="resize-y min-h-36 appearance-none bg-transparent rounded-md py-2 px-3 my-auto border border-1 border-gray-500 whitespace-pre-wrap focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          //   value={testcase.precondition.replaceAll("<br />", "\n")}
          //   onChange={handleChange}
          // ></textarea>
        )}
        <span className="text-lg font-bold">Steps:</span>
        <div>{results && <JiraTestStep steps={results.testScript} />}</div>
      </div>
    </>
  );
};

export default JiraTestCase;
