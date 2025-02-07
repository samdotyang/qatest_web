import TextEditor from "@/components/textEditor/textEditor";
import { useRef } from "react";
import Quill from "quill";


const Delta = Quill.import("delta");

const TestPlanPage = () => {
  const ref = useRef();
  return (
    <div className="text-primary-label  border border-1 dark:border-gray-400">
      <TextEditor
        readOnly={false}
        ref={ref}
        onSelectionChange={() => {}}
        onTextChange={() => {}}
        defaultValue={new Delta()
          .insert("Hello")
          .insert("\n", { header: 1 })
          .insert("Some ")
          .insert("initial", { bold: true })
          .insert(" ")
          .insert("content", { underline: true })
          .insert("\n")}
      />
    </div>
  );
};

export default TestPlanPage;
