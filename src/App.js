import './App.css';
import Herobg from './components/herobackgroung';
import NavBar from './components/navbar';
import Ripplebg from './components/ripplebg'; 
import dashboard from './components/dashboard';


import Transition from './components/transiton';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';

const TransitionHerobg = Transition(Herobg);
const TransitionRipplebg = Transition(Ripplebg);
const TransitionDashboard = Transition(dashboard);

function App() {
  const location = useLocation();
  return (
    <>
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<TransitionHerobg />} />
          <Route path="/talk" element={<TransitionRipplebg />} />
          <Route path="/test" element={<TransitionDashboard />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;