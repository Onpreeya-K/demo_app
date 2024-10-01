import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    FormHelperText,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
    createSubject,
    deleteSubject,
    getAllCourseOfStudy,
    getAllSubject,
    updateSubject,
} from '../../services/Subject-service';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import PopupConfirm from '../../components/popupConfirm/Popup-Confirm';
import PopupAlert from '../../components/popupAlert/Popup-Alert';

interface CourseOfStudy {
    course_of_study_id: number;
    department_id: number;
    degree_id: number;
    name: string;
}
interface SubjectData {
    subject_id: string;
    course_of_study_id: number;
    name: string;
    unit: number;
    type: string;
    is_internal: number;
    course_of_study: CourseOfStudy | null;
}
interface FormState {
    subject_id: string;
    name: string;
    unit: string;
    course_of_study: CourseOfStudy | null;
}
interface ErrorState {
    subject_id: boolean;
    name: boolean;
    unit: boolean;
    course_of_study: boolean;
}

const SubjectInfoPage = () => {
    const startPage = useRef(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [subjectData, setSubjectData] = useState<SubjectData[]>([]);
    const [subjectAll, setSubjectAll] = useState<SubjectData[]>([]);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [typeOfPopupConfirm, setTypeOfPopupConfirm] = useState<string>('');
    const [isOpenPopupConfirm, setIsOpenPopupConfirm] = useState<boolean>(false);
    const [messagePopupConfirm, setMessagePopupConfirm] = useState<React.ReactNode>('');
    const [isOpenPopupAlert, setIsOpenPopupAlert] = useState<boolean>(false);
    const [messagePopupAlert, setMessagePopupAlert] = useState<string>('');
    const [modalAction, setModalAction] = useState<string>('');
    const [courseOfStudyList, setCourseOfStudyList] = useState<CourseOfStudy[]>([]);

    const [form, setForm] = useState<FormState>({
        subject_id: '',
        name: '',
        unit: '',
        course_of_study: null,
    });

    const [errors, setErrors] = useState<ErrorState>({
        subject_id: false,
        name: false,
        unit: false,
        course_of_study: false,
    });

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchSubject = async () => {
        try {
            const response = await getAllSubject();
            if (response && response.message === 'Success') {
                setSubjectAll(response.payload);
                setSubjectData(response.payload);
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    const fetchData = async () => {
        try {
            const responseCourseOfStudy = await getAllCourseOfStudy();
            if (responseCourseOfStudy && responseCourseOfStudy.message === 'Success') {
                setCourseOfStudyList(responseCourseOfStudy.payload);
                await fetchSubject();
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };
    const replaceRegExp = (key: any) => {
        return key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value) {
            const keywords = replaceRegExp(value);
            const filter = subjectAll.filter((item) =>
                new RegExp(keywords, 'i').test(item.subject_id + item.name)
            );
            setSubjectData(filter);
        } else {
            setSubjectData(subjectAll);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'unit') {
            const isValidFormat = /^[0-9]+\s{0,2}\(\d-\d-\d\)$/.test(value);
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
            setErrors((prev) => ({
                ...prev,
                [name]: !isValidFormat,
            }));
        } else {
            setForm({
                ...form,
                [name]: value,
            });
            setErrors({
                ...errors,
                [name]: !value,
            });
        }
    };

    const onChangeAutocompleteCourseOfStudy = (option: CourseOfStudy | null) => {
        setForm({
            ...form,
            course_of_study: option,
        });
        setErrors({
            ...errors,
            course_of_study: !option,
        });
    };

    const clearForm = () => {
        setForm({
            subject_id: '',
            name: '',
            unit: '',
            course_of_study: null,
        });
        setErrors({
            subject_id: false,
            name: false,
            unit: false,
            course_of_study: false,
        });
    };

    const onClickAddSubject = () => {
        clearForm();
        setModalAction('CREATE');
        setOpenDialog(true);
    };

    const onClickEditData = (row: SubjectData) => {
        setModalAction('UPDATE');
        setOpenDialog(true);
        setForm({
            subject_id: row.subject_id,
            name: row.name,
            unit: `${row.unit}${row.type}`,
            course_of_study: row.course_of_study ? row.course_of_study : null,
        });
    };

    const onClickDeleteData = async (row: SubjectData) => {
        setForm({
            subject_id: row.subject_id,
            name: row.name,
            unit: `${row.unit}${row.type}`,
            course_of_study: row.course_of_study ? row.course_of_study : null,
        });
        setTypeOfPopupConfirm('DELETE');
        setMessagePopupConfirm('คุณต้องการลบข้อมูลรายวิชา ?');
        setIsOpenPopupConfirm(true);
    };

    const validate = () => {
        // Regular Expression to validate format x(x-x-x) or x (x-x-x)
        const isValidUnitFormat = /^[0-9]+\s{0,2}\(\d-\d-\d\)$/.test(form.unit.trim());
        const tempErrors: ErrorState = {
            subject_id: form.subject_id.trim() === '',
            name: form.name.trim() === '',
            unit: form.unit.trim() === '' || !isValidUnitFormat,
            course_of_study: !form.course_of_study,
        };

        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === false);
    };

    const parseUnitTotal = (unitTotal: string) => {
        const cleanedUnitTotal = unitTotal.replace(/\s/g, '');
        const match = cleanedUnitTotal.match(/^(\d+)\((\d-\d-\d)\)$/);
        if (match) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [_, unit, type] = match;
            return {
                unit: parseInt(unit, 10),
                type: `(${type})`,
            };
        }

        return null;
    };

    const onSubmitDialogSubject = async () => {
        try {
            if (validate()) {
                setOpenDialog(false);
                if (modalAction === 'CREATE') {
                    const unitAndType = parseUnitTotal(form.unit.trim());
                    const payload = {
                        subject_id: form.subject_id.trim(),
                        name: form.name.trim(),
                        unit: unitAndType?.unit,
                        type: unitAndType?.type,
                        course_of_study_id: form.course_of_study
                            ? form.course_of_study.course_of_study_id
                            : '',
                    };
                    const response = await createSubject(payload);
                    if (response && response.message === 'Success') {
                        setIsOpenPopupAlert(true);
                        setModalAction('');
                        setMessagePopupAlert('เพิ่มรายวิชาสำเร็จ');
                        clearForm();
                        await fetchSubject();
                        setOpenDialog(false);
                    }
                } else {
                    const unitAndType = parseUnitTotal(form.unit.trim());
                    const subject_id = form.subject_id.trim();
                    const payload = {
                        subject_id: subject_id,
                        name: form.name.trim(),
                        course_of_study_id: form.course_of_study
                            ? form.course_of_study.course_of_study_id
                            : '',
                        unit: unitAndType?.unit,
                        type: unitAndType?.type,
                    };

                    const response = await updateSubject(subject_id, payload);
                    if (response && response.message === 'Success') {
                        setIsOpenPopupAlert(true);
                        setModalAction('');
                        setMessagePopupAlert('แก้ไขรายวิชาสำเร็จ');
                        clearForm();
                        await fetchSubject();
                    }
                }
            } else {
                console.log('Form has errors.');
            }
        } catch (error) {
            console.error('error ---> ', error);
        }
    };

    const onConfirm = async () => {
        if (typeOfPopupConfirm === 'DELETE') {
            const response = await deleteSubject(form.subject_id);
            setIsOpenPopupConfirm(false);
            if (response && response.message === 'Success') {
                await fetchSubject();
                setIsOpenPopupAlert(true);
                setMessagePopupAlert('ลบรายวิชาสำเร็จ');
            }
        }
    };

    const onClosePopup = () => {
        setIsOpenPopupAlert(false);
        setMessagePopupAlert('');
    };

    useEffect(() => {
        if (startPage.current === false) {
            fetchData();
        }
        return () => {
            startPage.current = true;
        };
    });

    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const getMaxWidth = () => {
        if (isXs) return 'xs';
        if (isSm) return 'sm';
        return 'md';
    };

    const renderDialogAddProfessor = () => {
        return (
            <Dialog open={openDialog} disableEnforceFocus fullWidth maxWidth={getMaxWidth()}>
                <DialogTitle sx={{ padding: '16px 24px 8px 24px', position: 'relative' }}>
                    <Typography textAlign="center" variant="h6" component="div">
                        {modalAction === 'CREATE' ? 'เพิ่มรายวิชา' : 'แก้ไขรายวิชา'}
                    </Typography>
                    <IconButton
                        autoFocus={false}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                        }}
                        onClick={() => {
                            clearForm();
                            setOpenDialog(false);
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ padding: 3 }}>
                    <Grid container rowSpacing={3} paddingTop={1}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="รหัสวิชา"
                                name="subject_id"
                                size="small"
                                value={form.subject_id || ''}
                                onChange={handleChange}
                                error={errors.subject_id}
                                helperText={errors.subject_id && 'กรุณาระบุรหัสวิชา'}
                                inputProps={{
                                    onInput: (event: any) => {
                                        event.target.value = event.target.value.replace(
                                            /[^0-9-]/g,
                                            ''
                                        );
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="รายวิชา"
                                name="name"
                                size="small"
                                value={form.name || ''}
                                onChange={handleChange}
                                error={errors.name}
                                helperText={errors.name && 'กรุณาระบุรายวิชา'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                size="small"
                                fullWidth
                                options={courseOfStudyList || []}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        required
                                        label="หลักสูตร"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={errors.course_of_study}
                                        helperText={errors.course_of_study && 'กรุณาระบุหลักสูตร'}
                                    />
                                )}
                                isOptionEqualToValue={(option, value) =>
                                    option.course_of_study_id === value.course_of_study_id
                                }
                                value={form.course_of_study}
                                onChange={(_e, option) => onChangeAutocompleteCourseOfStudy(option)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="หน่วยกิต"
                                name="unit"
                                size="small"
                                value={form.unit || ''}
                                onChange={handleChange}
                                error={errors.unit}
                                helperText={errors.unit && 'กรุณาระบุหน่วยกิต'}
                                inputProps={{
                                    onInput: (event: any) => {
                                        event.target.value = event.target.value.replace(
                                            /[^0-9-() ]/g,
                                            ''
                                        );
                                    },
                                }}
                            />
                            <FormHelperText>
                                กรุณากรอกหน่วยกิตในรูปแบบ x(x-x-x) เช่น 3(1-2-3) หรือ 3(4-5-6)
                            </FormHelperText>
                        </Grid>
                    </Grid>
                    <Grid container component={'div'} marginTop={2}>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'} gap={2}>
                            <Button variant="contained" onClick={onSubmitDialogSubject}>
                                {modalAction === 'CREATE'
                                    ? 'ยืนยันการเพิ่มรายวิชา'
                                    : 'ยืนยันการแก้ไข'}
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        );
    };

    return (
        <div>
            <PopupAlert
                isOpen={isOpenPopupAlert}
                onClose={onClosePopup}
                title={<div>{messagePopupAlert}</div>}
                type="SUCCESS"
            />
            <PopupConfirm
                isOpen={isOpenPopupConfirm}
                onClose={() => {
                    setTypeOfPopupConfirm('');
                    setMessagePopupConfirm('');
                    setIsOpenPopupConfirm(false);
                }}
                onConfirm={onConfirm}
                title={messagePopupConfirm}
            />
            {renderDialogAddProfessor()}
            <Box>
                <Typography textAlign="start" variant="h6" component="div">
                    ข้อมูลรายวิชา
                </Typography>
                <Divider />
            </Box>
            <Box
                style={{
                    height: '100%',
                    width: '100%',
                }}
            >
                <Grid container marginBottom={2} marginTop={1} spacing={1} alignItems="center">
                    <Grid item xs={12} md={10}>
                        <TextField
                            fullWidth
                            size="small"
                            label="ค้นหารายวิชา"
                            variant="outlined"
                            onChange={onChangeSearch}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Button fullWidth variant="contained" onClick={onClickAddSubject}>
                            เพิ่มรายวิชา
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">รหัสวิชา</TableCell>
                                <TableCell align="center">รายวิชา</TableCell>
                                <TableCell align="center">หลักสูตร</TableCell>
                                <TableCell align="center">หน่วยกิต</TableCell>
                                <TableCell align="center">แก้ไข</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subjectData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow key={row.subject_id}>
                                        <TableCell align="center" sx={{ minWidth: '120px' }}>
                                            {row.subject_id}
                                        </TableCell>
                                        <TableCell align="left" sx={{ minWidth: '120px' }}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{ minWidth: '120px', flex: 1 }}
                                        >
                                            {row.course_of_study ? row.course_of_study.name : '-'}
                                        </TableCell>
                                        <TableCell align="center" sx={{ minWidth: '120px' }}>
                                            {`${row.unit}${row.type}`}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{ minWidth: '100px', padding: 0 }}
                                        >
                                            <Tooltip title="แก้ไข" placement="top">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onClickEditData(row)}
                                                >
                                                    <EditIcon fontSize="inherit" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="ลบ" placement="top">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onClickDeleteData(row)}
                                                >
                                                    <DeleteOutlineIcon fontSize="inherit" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        component="div"
                        count={subjectData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelDisplayedRows={({ from, to, count }) =>
                            `รายวิชาตั้งแต่ ${from} ถึง ${to} จาก ${count !== -1 ? count : `${to}`}`
                        }
                        labelRowsPerPage="จำนวนรายวิชาต่อหน้า"
                    />
                </TableContainer>
            </Box>
        </div>
    );
};

export default SubjectInfoPage;
