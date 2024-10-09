import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

type TextEditorProps = {
  readOnly: boolean;
  defaultValue: any;
  onTextChange: any;
  onSelectionChange: any;
};

// Editor is an uncontrolled React component
const TextEditor = forwardRef(
  (
    {
      readOnly,
      defaultValue,
      onTextChange,
      onSelectionChange,
    }: TextEditorProps,
    ref
  ) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (ref) {
        // @ts-ignore
        ref.current?.enable(!readOnly);
      }
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      // @ts-ignore
      const editorContainer = container!.appendChild(
        // @ts-ignore
        container.ownerDocument.createElement("div")
      );

      const quill = new Quill(editorContainer, {
        modules: {
          toolbar: [
          ["bold", "italic", "underline"],
          ["code-block"],
        //   [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          // [{ script: "sub" }, { script: "super" }], // superscript/subscript
        //   [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

          // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        //   [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          // [{ font: [] }],
          [{ align: [] }],

          ["clean"],
            ],
        },
        theme: "snow"
      });

      if (ref) {
        // @ts-ignore
        ref!.current = quill;
      }

      if (defaultValueRef.current) {
        const delta = quill.clipboard.convert({
          html: defaultValueRef.current,
        });
        quill.setContents(delta);

        console.log(
          `original value: ${defaultValueRef.current} \n convert data: ${delta}`
        );
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        if (ref) {
          // @ts-ignore
          ref.current = null;
        }
        if (container !== null) {
          // @ts-ignore
          container.innerHTML = "";
        }
      };
    }, [ref]);

    return (
      <div>
        <div ref={containerRef}></div>
      </div>
    );
  }
);

TextEditor.displayName = "Editor";

export default TextEditor;
