import React, { useRef, useState } from "react";
import TextEditor from "../textEditor/textEditor";
import Quill from "quill";
// import { convertTextToDelta } from 'node-quill-converter';

const Delta = Quill.import('delta');

type JiraTestStepProps = {
  steps: Array<Record<string, string>>;
};

const JiraTestStepHeader = () => {
    return <>
              <div className="grid grid-cols-3 m-2 gap-4 font-bold">
            <span>Test Step</span>
            <span>Test Data</span>
            <span>Expected Result</span>
          </div></>
}

const JiraTestStep = ({ steps }: JiraTestStepProps) => {
  const quillref = useRef();
  const [readOnly, setReadOnly] = useState(true)
  return (
    <>
      <JiraTestStepHeader />
      {steps.map((step, index) => (
        <div 
            key={index}
            className="grid grid-cols-3 gap-4 bg-card p-2 m-2 rounded-lg text-primary-label "
        >
          {/* <span className="text-wrap whitespace-pre-line">{step["_description"].replaceAll("<br />", "\n")}</span>
      <span>{step["_test_data"]}</span>
      <span>{step["_expected_result"]}</span> */}
          <TextEditor
            ref={quillref}
            readOnly={readOnly}
            // defaultValue={step["_description"]}
            defaultValue={step["_description"]}
            onSelectionChange={() => {}}
            onTextChange={() => {}}
          />
          <TextEditor
            ref={quillref}
            readOnly={readOnly}
            defaultValue={step["_test_data"]}
            onSelectionChange={() => {}}
            onTextChange={() => {}}
          />
          <TextEditor
            ref={quillref}
            readOnly={readOnly}
            defaultValue={step["_expected_result"]}
            onSelectionChange={() => {}}
            onTextChange={() => {}}
          />
        </div>
      ))}
    </>
  );
};

export default JiraTestStep;
