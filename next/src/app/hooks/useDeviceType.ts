import UAParser from "ua-parser-js";

const parser = new UAParser();

type DeviceType =
  | "console"
  | "mobile"
  | "tablet"
  | "smarttv"
  | "wearable"
  | "embedded";

export default function useDeviceType() {
  return parser.getDevice().type as DeviceType | undefined;
}
