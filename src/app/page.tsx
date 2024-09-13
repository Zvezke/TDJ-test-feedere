"use client";

import { useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { FeederComponent } from "../components/FeederComponent";
import { ControlPanel } from "../components/ControlPanel";
import { useWebSocket } from "../hooks/useWebSocket";
import {
  sendWifiStrengthMessage,
  sendWeightMessage,
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

  const sendWifiStrength = useCallback(sendWifiStrengthMessage, []);
  const sendWeight = useCallback(sendWeightMessage, []);
  const sendUpdateProgress = useCallback(sendUpdateProgressMessage, []);

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
            sendWifiStrength={sendWifiStrength}
            sendWeight={sendWeight}
            sendUpdateProgress={sendUpdateProgress}
            resetFeederData={resetFeederData}
          />
        </div>
      </div>
    </main>
  );
}
