import { useState, useEffect, useCallback } from "react";
import { FeederData } from "../types";
import toast from "react-hot-toast";

export function useWebSocket(feederId: string, url: string) {
  const [feederData, setFeederData] = useState<FeederData>({
    isConnected: false,
    pause: null,
    reset: null,
    feedNow: null,
    feedPlan: null,
    feedType: null,
    motorDirection: null,
    updateFirmware: null,
    updateProgress: null,
    calibration: null,
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
        case "calibration":
          setFeederData((prev) => ({
            ...prev,
            calibration: data.payload["calibration-event"],
          }));
          break;
        case "pause":
          setFeederData((prev) => ({
            ...prev,
            pause: data.payload["pause-state"],
          }));
          break;
        case "reset":
          setFeederData((prev) => ({ ...prev, reset: true }));
          break;
        case "feed-now":
          setFeederData((prev) => ({ ...prev, feedNow: data.payload.grams }));
          break;
        case "feedings":
          setFeederData((prev) => ({
            ...prev,
            feedPlan: data.payload.feedplan,
          }));
          break;
        case "feed-type":
          setFeederData((prev) => ({
            ...prev,
            feedType: data.payload.feed_type,
          }));
          break;
        case "motor-direction":
          setFeederData((prev) => ({
            ...prev,
            motorDirection: data.payload.motor_direction,
          }));
          break;
        case "update-firmware":
          setFeederData((prev) => ({
            ...prev,
            updateFirmware: data.payload["update-event"],
          }));
          break;
        case "update-progress":
          setFeederData((prev) => ({
            ...prev,
            updateProgress: data.payload.update_progress,
          }));
          break;
      }
    };

    ws.onopen = () => {
      handleConnection(true);
    };
    ws.onclose = () => {
      handleConnection(false);
    };

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
      calibration: null,
      pause: null,
      reset: false,
      feedNow: null,
      feedPlan: null,
      feedType: null,
      motorDirection: null,
      updateFirmware: null,
      updateProgress: null,
      wifiStrength: null,
      weight: null,
    }));
  }, []);

  return { feederData, triggerEvent, resetData };
}
