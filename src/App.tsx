import { BrowserRouter } from 'react-router-dom';
import { AnimatedRoutes } from './routes/AnimatedRoute';

export function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
