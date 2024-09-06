import AnsiToHtml from 'ansi-to-html'
import { useLayoutEffect, useRef } from 'react';

type TerminalProps = {
  content: string;
};

const Terminal = ({ content }: TerminalProps) => {
  const preRef = useRef<HTMLPreElement>(null);
  useLayoutEffect(() => {
    const preElement = preRef.current;
    if (preElement) {
      const scrollHeight = preElement.scrollHeight
      const clientHeight = preElement.clientHeight
      const scrollTop = preElement.scrollTop

      if (scrollHeight > clientHeight) {
        preElement.scrollTop = scrollHeight - clientHeight;
      }
    }
  }, [content])
  const convertor = new AnsiToHtml()

  return (
    <div className="bg-mac-light-card dark:bg-mac-dark-card rounded-lg p-4 text-primary-label dark:text-dark-primary-label flex-1 overflow-hidden flex flex-col max-h-1/2">
      <span className="text-lg m-2 shrink-0">Terminal Output</span>
      <pre
        ref={preRef}
        className="p-4 bg-mac-light dark:bg-mac-dark rounded-lg overflow-x-auto overflow-y-auto flex-1"
        dangerouslySetInnerHTML={{ __html: convertor.toHtml(content) }}
      />
    </div>
  );
};

export default Terminal;
