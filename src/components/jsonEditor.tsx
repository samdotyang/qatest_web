import { useEffect, useRef } from "react";
import { JSONEditor, JSONEditorPropsOptional } from "vanilla-jsoneditor";

const JsonEditor: React.FC<JSONEditorPropsOptional> = (props) => {
  const container = useRef<HTMLDivElement>(null);
  const editor = useRef<JSONEditor | null>(null);

  useEffect(() => {
    editor.current = new JSONEditor({
      target: container.current!,
      props: {},
    });
    return () => {
      if (editor.current) {
        editor.current.destroy();
        editor.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // update props
    if (editor.current) {
      editor.current.updateProps(props)
    }
  }, [props])

  return <div ref={container} />;
};

export default JsonEditor;
