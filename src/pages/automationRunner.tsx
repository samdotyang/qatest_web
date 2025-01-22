import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import Terminal from "@/components/terminal/terminal";
import { usePageAlertContext } from "@/contexts/pageAlertContext";

const AutomationRunnerPage = () => {
  const { automationId }  = useParams();
  const pageAlertContext = usePageAlertContext();
  const messageRef = useRef<HTMLPreElement>(null);
  console.log(automationId);

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (socket) {
      socket.onopen = () => setContent("");

      socket.onmessage = (event) => {
        if (messageRef.current) {
          messageRef.current.textContent += `${event.data}\n`;
        }
        setContent((prev) => prev + `${event.data}\n`);
      };

      socket.onerror = (error) => {
        pageAlertContext.setAlert(`${error}`, "error");
      };
    } else {
      try {
        setSocket(
            new (window.WebSocket as new (url: string) => WebSocket)(
              `${process.env.REACT_APP_BACKEND_API}/terminal/ws/${automationId}`
            )
        )
      } catch (error) {}
    }

    return () => {
      socket?.close();
    };
  }, [socket, messageRef, pageAlertContext, automationId]);
  return (
    <>
      {/* Terminal  */}
      <div className="w-full">
        <Terminal content={content} />
      </div>
    </>
  );
};

export default AutomationRunnerPage;
