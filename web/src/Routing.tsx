import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuDrawer from './components/drawer/Drawer-menu';
import CriteriaProcessPage from './pages/criteria-process/Criteria-process';
import CriteriaPage from './pages/criteria/Criteria';
import DisbursementPage from './pages/disbursement/Disbursement';
import Login from './pages/login/Login';
import ProfessorInfoPage from './pages/professor-info/Professor-info';
import SchedulePage from './pages/schedule/Schedule';

const Routing: React.FC = () => {
    return (
        <BrowserRouter basename="/teachingfee">
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
                                <Route
                                    path="criteria-of-teach"
                                    element={<CriteriaPage />}
                                />
                                <Route
                                    path="criteria-process"
                                    element={<CriteriaProcessPage />}
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
