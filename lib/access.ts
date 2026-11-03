import { drop } from "@/lib/drop";

export function isLaunched(now = Date.now()) {
  return now >= new Date(drop.launchAt).getTime();
}
