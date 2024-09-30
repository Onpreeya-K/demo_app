import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MenuDrawer from './components/drawer/Drawer-menu';
import CriteriaProcessPage from './pages/criteria-process/Criteria-process';
import CriteriaPage from './pages/criteria/Criteria';
import DisbursementPage from './pages/disbursement/Disbursement';
import Login from './pages/login/Login';
import ProfessorInfoPage from './pages/professor-info/Professor-info';
import SchedulePage from './pages/schedule/Schedule';
import PreviewPdfPage from './pages/preview/Preview-Pdf';
import SubjectInfoPage from './pages/subject-info/Subject-info';

const Routing: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="login" replace={true} />} />
                <Route path="login" element={<Login />} />
                <Route
                    path="/*"
                    element={
                        <MenuDrawer>
                            <Routes>
                                <Route path="schedule" element={<SchedulePage />} />
                                <Route path="disbursement" element={<DisbursementPage />} />
                                <Route path="professor-info" element={<ProfessorInfoPage />} />
                                <Route path="subject-info" element={<SubjectInfoPage />} />
                                <Route path="criteria-of-teach" element={<CriteriaPage />} />
                                <Route path="criteria-process" element={<CriteriaProcessPage />} />
                                <Route path="criteria-process" element={<PreviewPdfPage />} />
                                <Route path="*" element={<Navigate to="/login" replace />} />
                            </Routes>
                        </MenuDrawer>
                    }
                />
                <Route path="viewpdf/:pdf_path">
                    <Route index element={<PreviewPdfPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;
