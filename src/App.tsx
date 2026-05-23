import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DatePlanner from './pages/DatePlanner';

export default function App() {
  return (
    <BrowserRouter basename="/lab">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/date-planner" element={<DatePlanner />} />
      </Routes>
    </BrowserRouter>
  );
}
