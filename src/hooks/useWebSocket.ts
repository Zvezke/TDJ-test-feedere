import { useState, useEffect, useCallback } from "react";
import { FeederData } from "../types";
import toast from "react-hot-toast";

export function useWebSocket(feederId: string, url: string) {
  const [feederData, setFeederData] = useState<FeederData>({
    isConnected: false,
    wifiStrength: null,
    weight: null,
    updateProgress: null,
  });
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    setSocket(ws);

    const handleConnection = (isConnected: boolean) => {
      setFeederData((prev) => ({ ...prev, isConnected }));

      if (isConnected) {
        const uuid =
          feederId === "feeder1"
            ? "123e4567-e89b-12d3-a456-426614174000"
            : "987e6543-e21b-12d3-a456-426614174000";
        const registerMessage = JSON.stringify({
          event: "register",
          payload: { uuid },
        });
        ws.send(registerMessage);
        toast.success(`${feederId} connected!`);
      } else {
        toast.error(`${feederId} disconnected!`);
      }
    };

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      switch (data.event) {
        case "wifi-strength":
          setFeederData((prev) => ({
            ...prev,
            wifiStrength: data.payload.rssi,
          }));
          break;
        case "weight":
          setFeederData((prev) => ({ ...prev, weight: data.payload.weight }));
          break;
        case "update-progress":
          setFeederData((prev) => ({
            ...prev,
            updateProgress: data.payload.progress,
          }));
          break;
      }
    };

    ws.onopen = () => handleConnection(true);
    ws.onclose = () => handleConnection(false);
    ws.onmessage = handleMessage;

    return () => {
      ws.close();
    };
  }, [feederId, url]);

  const triggerEvent = useCallback(
    (event: string, payload: any) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        const message = JSON.stringify({ event, payload });
        socket.send(message);
        toast.success(`Event ${event} aktiveret på ${feederId}`);
      } else {
        toast.error(`${feederId} er ikke forbundet`);
      }
    },
    [socket, feederId],
  );

  const resetData = useCallback(() => {
    setFeederData((prevData) => ({
      ...prevData,
      wifiStrength: null,
      weight: null,
      updateProgress: null,
    }));
  }, []);

  return { feederData, triggerEvent, resetData };
}
