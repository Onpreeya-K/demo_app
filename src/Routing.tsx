import { BrowserRouter, Route, Routes } from "react-router-dom";
// import environment from "./config/environment.json";
import Login from "./pages/login/Login";
import SchedulePage from "./pages/schedule/Schedule";
import DisbursementPage from "./pages/disbursement/Disbursement";
import ProfessorInfoPage from "./pages/professor-info/Professor-info";

const Routing: React.FC = () => {
  return (
    <BrowserRouter basename={'/'}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="disbursement" element={<DisbursementPage />} />
        <Route path="professor-info" element={<ProfessorInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
