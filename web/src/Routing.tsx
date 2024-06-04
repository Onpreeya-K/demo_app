import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import environment from "./config/environment.json";
import Login from './pages/login/Login';
import SchedulePage from './pages/schedule/Schedule';
import DisbursementPage from './pages/disbursement/Disbursement';
import ProfessorInfoPage from './pages/professor-info/Professor-info';
import MenuDrawer from './components/drawer/Drawer-menu';

const Routing: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route
                    path="/*"
                    element={
                        <MenuDrawer>
                            <Routes>
                                <Route
                                    path="schedule"
                                    element={<SchedulePage />}
                                />
                                <Route
                                    path="disbursement"
                                    element={<DisbursementPage />}
                                />
                                <Route
                                    path="professor-info"
                                    element={<ProfessorInfoPage />}
                                />
                            </Routes>
                        </MenuDrawer>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;
