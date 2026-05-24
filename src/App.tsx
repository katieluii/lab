import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DatePlanner from './pages/DatePlanner';
import CoupleGift from './pages/CoupleGift';
import WineRecommender from './pages/Wine';
import Nota from './pages/Nota';

export default function App() {
  return (
    <BrowserRouter basename="/lab">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/date-planner" element={<DatePlanner />} />
        <Route path="/couple-gift" element={<CoupleGift />} />
        <Route path="/wine" element={<WineRecommender />} />
        <Route path="/nota" element={<Nota />} />
      </Routes>
    </BrowserRouter>
  );
}
