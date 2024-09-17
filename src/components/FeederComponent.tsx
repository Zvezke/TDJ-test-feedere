import React from "react";
import { FeederData } from "../types";

interface FeederComponentProps {
  feederName: string;
  data: FeederData;
}

export function FeederComponent({ feederName, data }: FeederComponentProps) {
  return (
    <div className="w-64 rounded bg-neutral-800 p-4">
      <h2 className="mb-6 flex items-center justify-between font-roboto text-xl font-bold text-neutral-200">
        {feederName}
        {data.isConnected ? (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-900 ring-1 ring-inset ring-green-600/20">
            Forbundet
          </span>
        ) : (
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-900 ring-1 ring-inset ring-red-600/10">
            Frakoblet
          </span>
        )}
      </h2>
      <p className="text-neutral-300">Calibration: {data.calibration ?? ""}</p>
      <p className="text-neutral-300">Pause: {data.pause ?? ""}</p>
      <p className="text-neutral-300">Reset: {data.reset ? "true" : ""}</p>
      <p className="text-neutral-300">Feed now: {data.feedNow ?? ""}</p>
      <p className="text-neutral-300">Feed plan: {data.feedPlan ?? ""}</p>
      <p className="text-neutral-300">Feed type: {data.feedType ?? ""}</p>
      <p className="text-neutral-300">
        Motor direction: {data.motorDirection ?? ""}
      </p>
      <p className="text-neutral-300">
        Update firmware: {data.updateFirmware ?? ""}
      </p>
      <p className="text-neutral-300">
        Update progress: {data.updateProgress ?? ""}
      </p>
    </div>
  );
}
