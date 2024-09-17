import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_URL
  ? `${process.env.NEXT_PUBLIC_URL}/api/v1/send-message`
  : `http://localhost:5000/api/v1/send-message`;

const getUUID = (feederId: string) =>
  feederId === "feeder1"
    ? "123e4567-e89b-12d3-a456-426614174000"
    : "987e6543-e21b-12d3-a456-426614174000";

const sendMessage = async (feederId: string, event: string, payload: any) => {
  const uuid = getUUID(feederId);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid,
        event,
        payload,
      }),
    });

    if (response.ok) {
      toast.success(`${event} sendt til ${feederId}`);
    } else {
      throw new Error(`Failed to send ${event} message`);
    }
  } catch (error) {
    console.error(`Error sending ${event} message:`, error);
    toast.error(`Failed to send ${event} message to ${feederId}`);
  }
};

export const sendWifiStrengthMessage = async (feederId: string) => {
  await sendMessage(feederId, "wifi-strength", {
    feeder_id: getUUID(feederId),
    rssi: -65,
  });
};

export const sendWeightMessage = async (feederId: string) => {
  await sendMessage(feederId, "weight", {
    feeder_id: getUUID(feederId),
    weight: 500.5,
  });
};

export const sendUpdateProgressMessage = async (
  feederId: string,
  progress: number,
) => {
  await sendMessage(feederId, "update-progress", {
    feeder_id: getUUID(feederId),
    update_progress: progress,
  });
};

// TODO: implement the sendMessage functions for the other events

export const sendCalibrationMessage = async (
  feederId: string,
  calibrationEvent: 1 | 2 | 3,
) => {
  const calibrationEventMap = {
    1: "tare",
    2: "no_feeder",
    3: "feeder_attached",
  };

  await sendMessage(feederId, "calibration", {
    feeder_id: getUUID(feederId),
    "calibration-event": calibrationEvent,
  });
};

export const sendPauseMessage = async (feederId: string, pauseState: 0 | 1) => {
  const pauseStateMap = {
    0: "pause",
    1: "resume",
  };

  await sendMessage(feederId, "pause", {
    feeder_id: getUUID(feederId),
    "pause-state": pauseState,
  });
};

export const sendResetMessage = async (feederId: string) => {
  await sendMessage(feederId, "reset", {
    feeder_id: getUUID(feederId),
  });
};

export const sendFeedNowMessage = async (feederId: string, grams: number) => {
  await sendMessage(feederId, "feed-now", {
    feeder_id: getUUID(feederId),
    grams: grams,
  });
};

export const sendFeedPlanMessage = async (feederId: string, feedPlan: any) => {
  await sendMessage(feederId, "feed-plan", {
    feeder_id: getUUID(feederId),
    feedplan: feedPlan,
  });
};

export const sendFeedTypeMessage = async (
  feederId: string,
  feedType: string,
) => {
  await sendMessage(feederId, "feed-type", {
    feeder_id: getUUID(feederId),
    feed_type: feedType,
  });
};

export const sendMotorDirectionMessage = async (
  feederId: string,
  direction: 0 | 1,
) => {
  await sendMessage(feederId, "motor-direction", {
    feeder_id: getUUID(feederId),
    motor_direction: direction,
  });
};

export const sendUpdateFirmwareMessage = async (
  feederId: string,
  updateEvent: 0 | 1 | 2 | 3 | 4,
) => {
  // const updateEventMap = {
  //   0: "update-now",
  //   1: "update-dev-now",
  //   2: "turn_on_autoupdate",
  //   3: "turn_on_autoupdate_dev",
  //   4: "turn_off_autoupdate",
  // };

  await sendMessage(feederId, "update-firmware", {
    feeder_id: getUUID(feederId),
    "update-event": updateEvent,
  });
};
