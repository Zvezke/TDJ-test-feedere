export interface FeederData {
  calibration: number | null;
  pause: number | null;
  reset: boolean | null;
  feedNow: number | null;
  feedPlan: number | null;
  feedType: number | null;
  motorDirection: number | null;
  updateFirmware: number | null;
  updateProgress: number | null;
  isConnected: boolean;
}
