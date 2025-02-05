import { useEffect } from "react";
import { useParams } from "react-router-dom";

import Terminal from "@/components/terminal/terminal";
import { usePageAlertContext } from "@/contexts/pageAlertContext";
import { useTerminalWebSocket } from "@/hooks";



const AutomationRunnerPage = () => {
  const { automationId = "" } = useParams();
  const pageAlertContext = usePageAlertContext();
  const { content, isConnected, error } = useTerminalWebSocket(automationId);

  console.log(automationId);

  useEffect(() => {
    if (error) {
      pageAlertContext.setAlert(error.message, "error");
    }
  }, [error, pageAlertContext]);

  return (
    <>
      {/* Terminal  */}
      <div className="w-full">
        {!isConnected && !error && <div className="text-primary-label">Connecting to terminal...</div>}
        <Terminal content={content} />
      </div>
    </>
  );
};

export default AutomationRunnerPage;
