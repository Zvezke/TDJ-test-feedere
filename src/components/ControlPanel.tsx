import React from "react";
import { SendMessageButton } from "./SendMessageButton";

interface ControlPanelProps {
  sendWifiStrength: (feederId: string) => Promise<void>;
  sendWeight: (feederId: string) => Promise<void>;
  sendUpdateProgress: (feederId: string) => Promise<void>;
  resetFeederData: () => void; // Add this new prop
}

export function ControlPanel({
  sendWifiStrength,
  sendWeight,
  sendUpdateProgress,
  resetFeederData, // Add this new prop
}: ControlPanelProps) {
  return (
    <div className="rounded bg-neutral-800 p-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-roboto text-xl font-bold text-neutral-200">
          Send data til feedere
        </h2>
        <button
          onClick={resetFeederData}
          className="rounded bg-red-700 px-3 py-1 text-sm text-white hover:bg-red-600"
        >
          Nulstil data
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <SendMessageButton
            feederId="feeder1"
            sendMessageToIoT={sendWifiStrength}
            label="Feeder 1, WiFi"
          />
          <SendMessageButton
            feederId="feeder1"
            sendMessageToIoT={sendWeight}
            label="Feeder 1, Vægt"
          />
          <SendMessageButton
            feederId="feeder1"
            sendMessageToIoT={sendUpdateProgress}
            label="Feeder 1, Opdatering"
          />
        </div>
        <div className="flex flex-col gap-4">
          <SendMessageButton
            feederId="feeder2"
            sendMessageToIoT={sendWifiStrength}
            label="Feeder 2, WiFi"
          />
          <SendMessageButton
            feederId="feeder2"
            sendMessageToIoT={sendWeight}
            label="Feeder 2, Vægt"
          />
          <SendMessageButton
            feederId="feeder2"
            sendMessageToIoT={sendUpdateProgress}
            label="Feeder 2, Opdatering"
          />
        </div>
      </div>
    </div>
  );
}
