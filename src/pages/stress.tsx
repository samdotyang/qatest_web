import axios from "axios";
import { useEffect, useCallback, useState, useRef } from "react";
import Terminal from "@/components/terminal/terminal";
import { StressData, StressPanel, StressHistory } from "@/components/stress";
import { useGetStressData } from "@/hooks";
import { usePageAlertContext } from "@/contexts/pageAlertContext";

const Stress = () => {
  const pageAlertContext = usePageAlertContext();
  const messageRef = useRef<HTMLPreElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [terminalContent, setTerminalContent] = useState("");

  const handleSubmit = async (config: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_API}/stress/run`,
        config
      );
      setSocket(
        new (window.WebSocket as new (url: string) => WebSocket)(
          `${import.meta.env.VITE_APP_BACKEND_API}/terminal/ws/${response.data.request_id}`
        )
      );
    } catch (error) {
      pageAlertContext.setAlert(`${error}`, "error");
    }
  };

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        
        setTerminalContent("");
      };

      socket.onmessage = (event) => {
        
        if (messageRef.current) {
          messageRef.current.textContent += `${event.data}\n`;
        }
        setTerminalContent((prev) => (prev += `${event.data}\n`));
      };

      socket.onclose = () => {
        
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    }
    return () => {
      if (socket) {
        socket?.close();
      }
    };
  }, [socket, messageRef]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-4 h-1/2">
        <StressPanel onSubmit={handleSubmit} />
      </div>
      <Terminal content={terminalContent} />
      <StressHistory />
    </div>
  );
};

export default Stress;
