import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DatePlanner from './pages/DatePlanner';
import WineRecommender from './pages/Wine';

export default function App() {
  return (
    <BrowserRouter basename="/lab">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/date-planner" element={<DatePlanner />} />
        <Route path="/wine" element={<WineRecommender />} />
      </Routes>
    </BrowserRouter>
  );
}
