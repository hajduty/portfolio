import { useEffect } from "react";

export function usePlayOnce(key: string) {
  const hasPlayed =
    typeof window !== "undefined" &&
    sessionStorage.getItem(key) === "true";

  useEffect(() => {
    if (!hasPlayed) {
      sessionStorage.setItem(key, "true");
    }
  }, [hasPlayed, key]);

  return !hasPlayed;
}
