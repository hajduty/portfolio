import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Home } from './index';
import { Project } from './project/Project';
import { useShouldAnimateRoute } from '../hooks/useIsNavigated';

export function AnimatedRoutes() {
  const location = useLocation();
  const shouldAnimate = useShouldAnimateRoute();

  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={shouldAnimate ? { opacity: 1, x: -15, } : false}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.3, ease: "circOut" } }}
                exit={shouldAnimate ? { opacity: 1, x: -15, transition: {duration: 0.15, ease: "circIn"}} : undefined}
              >
                <Home />
              </motion.div>
            }
          />

          <Route
            path="/projects/:slug"
            element={
              <motion.div
                initial={shouldAnimate ? { opacity: 1, x: 15 } : false}
                animate={{ opacity: 1, x: 0,transition: { duration: 0.3, ease: "circOut" } }}
                exit={shouldAnimate ? { opacity: 1, x: 15, transition: { duration: 0.15, ease: "circIn" } } : undefined}
              >
                <Project />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

