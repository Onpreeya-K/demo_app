import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tabs,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import PopupAlert from '../../components/popupAlert/Popup-Alert';
import { getCriteriaOfTeach, updateCriteriaOfTeach } from '../../services/Criteria-service';
import CloseIcon from '@mui/icons-material/Close';

interface Course {
    criteria_of_teach_id: number;
    course_of_study_id: number;
    level_id: number;
    teaching_rates: number;
    rate_unit: number;
    course_of_study: {
        course_of_study_id: number;
        department_id: number;
        degree_id: number;
        name: string;
    };
    level: {
        level_id: number;
        name: string;
    };
}

type CourseType = 'bachelor' | 'master' | 'doctor' | 'master_inter' | 'doctor_inter';

interface EducationData {
    bachelor: Course[];
    master: Course[];
    doctor: Course[];
    master_inter: Course[];
    doctor_inter: Course[];
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const CriteriaPage = () => {
    const startPage = useRef(false);

    const [data, setData] = useState<EducationData>();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const initDataCriteria = {
        criteria_of_teach_id: 0,
        course_of_study_id: 0,
        course_name: '',
        level_name: '',
        teaching_rates: 0,
        rate_unit: 0,
    };
    const [dataCriteria, setDataCriteria] = useState<{
        criteria_of_teach_id: number;
        course_of_study_id: number;
        course_name: string;
        level_name: string;
        teaching_rates: number;
        rate_unit: number;
    }>(initDataCriteria);

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [isOpenPopupAlert, setIsOpenPopupAlert] = useState<boolean>(false);
    const [messagePopupAlert, setMessagePopupAlert] = useState<string>('');

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchCriteriaOfTeach = async () => {
        try {
            const response = await getCriteriaOfTeach();
            if (response && response.message === 'success') {
                setData(response.payload);
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (startPage.current === false) {
            fetchCriteriaOfTeach();
            startPage.current = true;
        }
    });

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`tabpanel-${index}`}
                aria-labelledby={`tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    function a11yProps(index: number) {
        return {
            id: `tab-${index}`,
            'aria-controls': `tabpanel-${index}`,
        };
    }

    const onChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setDataCriteria((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onConfirmUpdateCriteriaOfTeach = async () => {
        let payload = {
            teaching_rates: dataCriteria.teaching_rates,
            rate_unit: dataCriteria.rate_unit,
        };
        const response = await updateCriteriaOfTeach(dataCriteria.criteria_of_teach_id, payload);
        if (response) {
            onCloseDialog();
            setIsOpenPopupAlert(true);
            setMessagePopupAlert('แก้ไขเกณฑ์ค่าสอนสำเร็จ');
        }
    };

    const onClickEditCriteria = (row: {
        criteria_of_teach_id: number;
        course_of_study_id: number;
        course_name: string;
        level_name: string;
        teaching_rates: number;
        rate_unit: number;
    }) => {
        setDataCriteria(row);
        setOpenDialog(true);
    };

    const onCloseDialog = () => {
        setOpenDialog(false);
        setDataCriteria(initDataCriteria);
    };

    const formatCourses = (courses: Course[]) => {
        return courses.map((course) => ({
            criteria_of_teach_id: course.criteria_of_teach_id,
            course_of_study_id: course.criteria_of_teach_id,
            course_name: course.course_of_study.name,
            level_name: course.level.name,
            teaching_rates: course.teaching_rates,
            rate_unit: course.rate_unit,
        }));
    };

    const onClosePopup = () => {
        setIsOpenPopupAlert(false);
        setMessagePopupAlert('');
        fetchCriteriaOfTeach();
    };

    const renderDialogEditCriteria = () => {
        return (
            <Dialog open={openDialog} onClose={onCloseDialog} fullWidth>
                <DialogTitle sx={{ padding: '16px 24px 8px 24px', position: 'relative' }}>
                    <Typography textAlign="center" variant="h6" component="div">
                        แก้ไขเกณฑ์ค่าสอน
                    </Typography>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                        }}
                        onClick={onCloseDialog}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ padding: 3 }}>
                    <Grid container spacing={2} paddingTop={1}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="หลักสูตร"
                                size="medium"
                                value={dataCriteria?.course_name}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="ระดับ"
                                size="medium"
                                value={dataCriteria?.level_name}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="ค่าบริหารการศึกษา"
                                size="medium"
                                name="teaching_rates"
                                value={dataCriteria?.teaching_rates}
                                onChange={onChangeTextField}
                                inputProps={{
                                    onInput: (event: any) => {
                                        event.target.value = event.target.value.replace(
                                            /[^0-9]/g,
                                            ''
                                        );
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="อัตราค่าสอน/หัว/หน่วยกิต"
                                size="medium"
                                name="rate_unit"
                                value={dataCriteria?.rate_unit}
                                onChange={onChangeTextField}
                                inputProps={{
                                    onInput: (event: any) => {
                                        event.target.value = event.target.value.replace(
                                            /[^0-9]/g,
                                            ''
                                        );
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container component={'div'} marginTop={2}>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'} gap={2}>
                            <Button variant="contained" onClick={onConfirmUpdateCriteriaOfTeach}>
                                ยืนยันการแก้ไข
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        );
    };

    const courseTypes: CourseType[] = [
        'bachelor',
        'master',
        'doctor',
        'master_inter',
        'doctor_inter',
    ];

    return (
        <div>
            <Box sx={{ height: '100%' }}>
                <div>
                    <Typography textAlign="start" variant="h6" component="div">
                        เกณฑ์ค่าสอน
                    </Typography>
                    <Divider />
                </div>
                {renderDialogEditCriteria()}
                <PopupAlert
                    isOpen={isOpenPopupAlert}
                    onClose={onClosePopup}
                    title={<div>{messagePopupAlert}</div>}
                    type="SUCCESS"
                />
                {data && (
                    <div>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                        >
                            {[
                                'ระดับปริญญาตรี',
                                'ระดับมหาบัณฑิต',
                                'ระดับปริญญาดุษฎีบัณฑิต',
                                'ระดับมหาบัณฑิต (นิสิตต่างชาติ)',
                                'ระดับปริญญาดุษฎีบัณฑิต (นิสิตต่างชาติ)',
                            ].map((label, index) => (
                                <Tab key={index} label={label} {...a11yProps(index)} />
                            ))}
                        </Tabs>
                        {courseTypes.map((courseType, index) => (
                            <TabPanel key={index} value={value} index={index}>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">หลักสูตร</TableCell>
                                                <TableCell align="center">ระดับ</TableCell>
                                                <TableCell align="center">
                                                    ค่าบริหารการศึกษา
                                                </TableCell>
                                                <TableCell align="center">
                                                    อัตราค่าสอน/หัว/หน่วยกิต
                                                </TableCell>
                                                <TableCell align="center">แก้ไข</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {formatCourses(data[courseType])
                                                .slice(
                                                    page * rowsPerPage,
                                                    page * rowsPerPage + rowsPerPage
                                                )
                                                .map((row) => (
                                                    <TableRow key={row.course_of_study_id}>
                                                        <TableCell
                                                            align="left"
                                                            sx={{ minWidth: '200px', flex: 1 }}
                                                        >
                                                            {row.course_name}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ minWidth: '130px' }}
                                                        >
                                                            {row.level_name}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ minWidth: '150px' }}
                                                        >
                                                            {row.teaching_rates}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ minWidth: '150px' }}
                                                        >
                                                            {row.rate_unit}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            sx={{ minWidth: '80px', padding: 0 }}
                                                        >
                                                            <Tooltip title="แก้ไข" placement="top">
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() =>
                                                                        onClickEditCriteria(row)
                                                                    }
                                                                >
                                                                    <EditIcon fontSize="inherit" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10]}
                                        component="div"
                                        count={formatCourses(data[courseType]).length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        labelDisplayedRows={({ from, to, count }) =>
                                            `แสดง ${from} ถึง ${to} จาก ${count}`
                                        }
                                        labelRowsPerPage="จำนวนหลักสูตรต่อหน้า"
                                    />
                                </TableContainer>
                            </TabPanel>
                        ))}
                    </div>
                )}
            </Box>
        </div>
    );
};

export default CriteriaPage;
