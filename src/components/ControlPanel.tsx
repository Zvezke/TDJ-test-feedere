import React from "react";
import { SendMessageButton } from "./SendMessageButton";

interface ControlPanelProps {
  sendCalibration: (
    feederId: string,
    calibrationEvent: 1 | 2 | 3,
  ) => Promise<void>;
  sendPause: (feederId: string, pauseState: 0 | 1) => Promise<void>;
  sendReset: (feederId: string) => Promise<void>;
  resetFeederData: () => void;
  sendFeedNow: (feederId: string, grams: number) => Promise<void>;
  sendFeedPlan: (feederId: string, plan: string) => Promise<void>;
  sendFeedType: (feederId: string, type: string) => Promise<void>;
  sendMotorDirection: (feederId: string, direction: 0 | 1) => Promise<void>;
  sendUpdateFirmware: (
    feederId: string,
    updateEvent: 0 | 1 | 2 | 3 | 4,
  ) => Promise<void>;
  sendUpdateProgress: (feederId: string, progress: number) => Promise<void>;
}

export function ControlPanel({
  sendCalibration,
  sendPause,
  sendReset,
  resetFeederData,
  sendFeedNow,
  sendFeedPlan,
  sendFeedType,
  sendMotorDirection,
  sendUpdateFirmware,
  sendUpdateProgress,
}: ControlPanelProps) {
  return (
    <div className="rounded bg-neutral-800 p-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-roboto text-xl font-bold text-neutral-200">
          API-server (send data)
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
            sendMessageToIoT={() => sendCalibration("feeder1", 1)}
            label="Feeder 1, Calibrate (Tare)"
          />
          <SendMessageButton
            feederId="feeder1"
            sendMessageToIoT={() => sendPause("feeder1", 1)}
            label="Feeder 1, Pause"
          />
          <SendMessageButton
            feederId="feeder1"
            sendMessageToIoT={() => sendReset("feeder1")}
            label="Feeder 1, Reset"
          />
          <SendMessageButton
            feederId="feeder1"
            sendMessageToIoT={() => sendFeedNow("feeder1", 50)} // Assuming 50 grams as default
            label="Feeder 1, Feed Now"
          />
          <SendMessageButton
            feederId="feeder1"
            sendMessageToIoT={() => sendFeedPlan("feeder1", "default_plan")} // Assuming a default plan
            label="Feeder 1, Set Feed Plan"
          />
          <SendMessageButton
            feederId="feeder1"
            sendMessageToIoT={() => sendFeedType("feeder1", "pellets")}
            label="Feeder 1, Set Feed Type"
          />
          <SendMessageButton
            feederId="feeder1"
            sendMessageToIoT={() => sendMotorDirection("feeder1", 1)}
            label="Feeder 1, Set Motor Direction"
          />
          <SendMessageButton
            feederId="feeder1"
            sendMessageToIoT={() => sendUpdateFirmware("feeder1", 0)}
            label="Feeder 1, Update Firmware"
          />
          <SendMessageButton
            feederId="feeder1"
            sendMessageToIoT={() => sendUpdateProgress("feeder1", 78)}
            label="Feeder 1, Update Progress"
          />
        </div>
        <div className="flex flex-col gap-4">
          <SendMessageButton
            feederId="feeder2"
            sendMessageToIoT={() => sendCalibration("feeder2", 2)}
            label="Feeder 2, Calibrate (Tare)"
          />
          <SendMessageButton
            feederId="feeder2"
            sendMessageToIoT={() => sendPause("feeder2", 0)}
            label="Feeder 2, Pause"
          />
          <SendMessageButton
            feederId="feeder2"
            sendMessageToIoT={() => sendReset("feeder2")}
            label="Feeder 2, Reset"
          />
          <SendMessageButton
            feederId="feeder2"
            sendMessageToIoT={() => sendFeedNow("feeder2", 50)} // Assuming 50 grams as default
            label="Feeder 2, Feed Now"
          />
          <SendMessageButton
            feederId="feeder2"
            sendMessageToIoT={() => sendFeedPlan("feeder2", "default_plan")} // Assuming a default plan
            label="Feeder 2, Set Feed Plan"
          />
          <SendMessageButton
            feederId="feeder2"
            sendMessageToIoT={() => sendFeedType("feeder2", "muesli")} // Assuming a default feed type
            label="Feeder 2, Set Feed Type"
          />
          <SendMessageButton
            feederId="feeder2"
            sendMessageToIoT={() => sendMotorDirection("feeder2", 0)}
            label="Feeder 2, Set Motor Direction"
          />
          <SendMessageButton
            feederId="feeder2"
            sendMessageToIoT={() => sendUpdateFirmware("feeder2", 3)}
            label="Feeder 2, Update Firmware"
          />
          <SendMessageButton
            feederId="feeder2"
            sendMessageToIoT={() => sendUpdateProgress("feeder2", 53)}
            label="Feeder 2, Update Progress"
          />
        </div>
      </div>
    </div>
  );
}
