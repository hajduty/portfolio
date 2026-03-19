import { LocationProvider, Router, Route } from 'preact-iso';
import { Home } from './routes/index';
import Project from './routes/project/Project';

export function App() {
  return (
    <LocationProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/projects/:slug" component={Project} />
      </Router>
    </LocationProvider>
  );
}
