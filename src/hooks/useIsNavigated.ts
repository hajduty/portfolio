import { useLocation } from 'react-router-dom';

interface LocationState {
  fromNavigation?: boolean;
}

export function useIsNavigated() {
  const location = useLocation();
  const state = location.state as LocationState | null;

  const navEntries =
    typeof window !== "undefined"
      ? performance.getEntriesByType("navigation")
      : [];

  const navType =
    navEntries.length > 0 ? (navEntries[navEntries.length - 1] as any).type : null;

  return state?.fromNavigation === true || navType === "back_forward";
}

export function useShouldAnimateRoute() {
  const location = useLocation();
  const state = location.state as { animated?: boolean } | null;

  return state?.animated === true;
}
