import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Home } from './index';
import { Project } from './project/project';

export function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 1, x: -15 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.3, ease: "circOut" } }}
                exit={{ opacity: 1, x: -15, transition: { duration: 0.15, ease: "circIn" } }}>
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <motion.div
                initial={{ opacity: 1, x: 15 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.3, ease: "circOut" } }}
                exit={{ opacity: 1, x: 15, transition: { duration: 0.15, ease: "circIn" } }}
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
