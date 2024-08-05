type TerminalProps = {
    content: string
}


const Terminal = ({content}: TerminalProps) => {
    return  <div className="bg-mac-light-card dark:bg-mac-dark-card rounded-lg p-4 text-primary-label dark:text-dark-primary-label flex-1 overflow-hidden flex flex-col">
    <span className="text-lg m-2 shrink-0">Terminal Output</span>
    <pre className="p-4 bg-mac-light dark:bg-mac-dark rounded-lg overflow-x-auto overflow-y-auto flex-1 ">
      <code>{content}</code>
    </pre>
  </div>;
}

export default Terminal;