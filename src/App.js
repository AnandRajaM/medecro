import "./App.css";
import Herobg from "./components/herobackgroung";
import NavBar from "./components/navbar";
import Ripplebg from "./components/ripplebg";
import Transition from "./components/transiton";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import SignInPage from "./pages/signIn";
import SignUpPage from "./pages/signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/dashboard";
import PatientReports from "./components/patientReports";

// Import your page components
// import HomePage from "./components/HomePage";
// import SignUpPage from "./components/SignUpPage";
// import SignInPage from "./components/SignInPage";
// import DashboardPage from "./components/DashboardPage";
// import DiagnosesPage from "./components/DiagnosesPage";
// import ReportsPage from "./components/ReportsPage";

const TransitionHerobg = Transition(Herobg);
const TransitionRipplebg = Transition(Ripplebg);

function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<TransitionHerobg />} />
          <Route path="/talk" element={<TransitionRipplebg />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient-reports"
            element={
              <ProtectedRoute>
                <PatientReports />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
