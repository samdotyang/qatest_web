import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";

export const useGetAutomationRunnerList = () => {
  const { isFetching, data, error, refetch } = useQuery({
    queryKey: ["getAutomationRunnerList"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_API}/automation/runners`
      );
      const json_response = await response.json();
      return json_response;
    },
    refetchInterval: 60 * 1000, // refetch every minute
  });
  return {
    isAutomationRunnerListFetching: isFetching,
    automationRunnerList: data,
    automationRunnerListError: error,
    refetchRunnerList: refetch,
  };
};

type TerminalWebSocketHook = {
  content: string;
  isConnected: boolean;
  error: Error | null;
};

export const useTerminalWebSocket = (
  automationId: string
): TerminalWebSocketHook => {
  const ws = useRef<WebSocket | null>(null);
  const [content, setContent] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!ws.current && automationId) {
      try {
        console.log(`Creating new WebSocket connection for ${automationId}`);
        const socket = new WebSocket(
          `${import.meta.env.VITE_APP_BACKEND_API}/terminal/ws/${automationId}`
        );

        socket.onopen = () => {
          console.log("WebSocket connected");
          setIsConnected(true);
          setError(null);
          setContent("");
        };

        socket.onmessage = (event: MessageEvent) => {
          if (event.data.includes("not found")) {
            setError(new Error(event.data));
            socket.close();
            return;
          }
          setContent((prev) => prev + `${event.data}\n`);
        };

        socket.onclose = () => {
          console.log("WebSocket closed");
          setIsConnected(false);
          ws.current = null; // Clear the ref when connection is closed
        };

        socket.onerror = (event) => {
          console.error("WebSocket error:", event);
          setError(new Error("WebSocket connection error"));
        };

        ws.current = socket;
      } catch (error) {
        console.error("Failed to create WebSocket:", error);
        setError(
          error instanceof Error ? error : new Error("Connection failed")
        );
      }
    }

    // Cleanup function
    return () => {
      if (ws.current) {
        console.log("Cleaning up WebSocket connection");
        ws.current.close();
        ws.current = null;
      }
    };
  }, [automationId]);

  return {
    content,
    isConnected,
    error,
  };
};
