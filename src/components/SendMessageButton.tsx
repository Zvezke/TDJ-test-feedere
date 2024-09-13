import React from "react";

interface SendMessageButtonProps {
  feederId: string;
  sendMessageToIoT: (feederId: string) => Promise<void>;
  label: string;
}

export function SendMessageButton({
  feederId,
  sendMessageToIoT,
  label,
}: SendMessageButtonProps) {
  return (
    <button
      className="rounded bg-blue-500 px-2 py-1 text-left text-white"
      onClick={() => sendMessageToIoT(feederId)}
    >
      {label}
    </button>
  );
}
