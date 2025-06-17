import { useLocation } from 'react-router-dom';

interface LocationState {
  fromNavigation?: boolean;
}

export function useIsNavigated() {
  const location = useLocation();
  const state = location.state as LocationState;
  return !!state?.fromNavigation;
}

// Custom navigate hook
import { useNavigate } from 'react-router-dom';

export function useAnimatedNavigate() {
  const navigate = useNavigate();
  
  return (to: string, options?: { replace?: boolean; state?: any }) => {
    navigate(to, {
      ...options,
      state: { ...options?.state, fromNavigation: true }
    });
  };
}