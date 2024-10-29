"use client";

import { useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { FeederComponent } from "../components/FeederComponent";
import { ControlPanel } from "../components/ControlPanel";
import { useWebSocket } from "../hooks/useWebSocket";
import {
  sendFeedNowMessage,
  sendFeedPlanMessage,
  sendFeedTypeMessage,
  sendMotorDirectionMessage,
  sendUpdateFirmwareMessage,
  sendCalibrationMessage,
  sendPauseMessage,
  sendResetMessage,
  sendUpdateProgressMessage,
} from "../utils/sendMessageFunctions";

export default function Home() {
  const { feederData: feeder1Data, resetData: resetFeeder1 } = useWebSocket(
    "feeder1",
    process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5000",
  );
  const { feederData: feeder2Data, resetData: resetFeeder2 } = useWebSocket(
    "feeder2",
    process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5000",
  );

  // console.log("feeder1Data", feeder1Data);
  // console.log("feeder2Data", feeder2Data);

  const sendFeedNow = useCallback(sendFeedNowMessage, []);
  const sendFeedPlan = useCallback(sendFeedPlanMessage, []);
  const sendFeedType = useCallback(sendFeedTypeMessage, []);
  const sendMotorDirection = useCallback(sendMotorDirectionMessage, []);
  const sendUpdateFirmware = useCallback(sendUpdateFirmwareMessage, []);
  const sendUpdateProgress = useCallback(sendUpdateProgressMessage, []);
  const sendCalibration = useCallback(sendCalibrationMessage, []);
  const sendPause = useCallback(sendPauseMessage, []);
  const sendReset = useCallback(sendResetMessage, []);

  const resetFeederData = () => {
    resetFeeder1();
    resetFeeder2();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 p-4">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#1f1f1f",
            color: "#fff",
            padding: "16px",
            width: "300px",
            textAlign: "left",
          },
        }}
      />
      <div>
        <h1 className="mb-4 font-roboto text-2xl font-bold text-neutral-200">
          WebSocket Feedere
        </h1>
        <div className="flex w-full gap-4">
          <FeederComponent feederName="Feeder 1" data={feeder1Data} />
          <FeederComponent feederName="Feeder 2" data={feeder2Data} />
          <ControlPanel
            sendFeedNow={sendFeedNow}
            sendFeedPlan={sendFeedPlan}
            sendFeedType={sendFeedType}
            sendMotorDirection={sendMotorDirection}
            sendUpdateFirmware={sendUpdateFirmware}
            sendCalibration={sendCalibration}
            sendPause={sendPause}
            sendReset={sendReset}
            resetFeederData={resetFeederData}
            sendUpdateProgress={sendUpdateProgress}
          />
        </div>
      </div>
    </main>
  );
}
