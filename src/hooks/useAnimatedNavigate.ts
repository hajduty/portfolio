import { useNavigate } from "react-router-dom";

export function useAnimatedNavigate() {
  const navigate = useNavigate();

  return (to: string, options?: { replace?: boolean; state?: any }) => {
    navigate(to, {
      ...options,
      state: {
        ...options?.state,
        animated: true,
      },
    });
  };
}
