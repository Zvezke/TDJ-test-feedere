import toast from "react-hot-toast";

const API_URL = `${process.env.NEXT_PUBLIC_URL}/api/v1/send-message`;

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

export const sendUpdateProgressMessage = async (feederId: string) => {
  await sendMessage(feederId, "update-progress", {
    feeder_id: getUUID(feederId),
    progress: 75,
  });
};
