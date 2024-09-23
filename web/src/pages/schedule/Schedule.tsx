import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import {
    Autocomplete,
    Box,
    Button,
    Divider,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import PopupAlert from '../../components/popupAlert/Popup-Alert';
import appConfig from '../../config/application-config.json';
import { IProfessor } from '../../interface/Professor-interface';
import { getTeacherSchedule, getTermOfYear } from '../../services/Criteria-service';
import {
    getScheduleByTermIdAndTeacherId,
    saveScheduleTeach,
} from '../../services/Schedule-service';
import { getDataProfessor, getRoleUser, isNullOrUndefined, sourceList } from '../../util/Util';
import { ScheduleTeach } from '../disbursement/Disbursement';

interface Professor {
    teacher_id: string;
    prefix: string;
    fullname: string;
    position: string;
    sub_position: string;
    has_schedule: boolean;
    dataTable: ScheduleRow[];
}

interface FormSearch {
    term: DropdownTerm | null;
    professor: Professor;
}

interface ScheduleRow {
    schedule_teach_id: number;
    level_id: string;
    course_code: string;
    section: string;
    course_name: string;
    course_unit: string;
    total_seat: string;
    enroll_seat: string;
    teach_date: string;
    major_name: string;
}

interface MapData {
    levelId: string[];
    courseCode: string[];
    sec: string[];
    courseNameEng: string[];
    courseUnit: string[];
    totalSeat: string[];
    enrollSeat: string[];
    date: string[];
    major: string[];
}

interface DropdownTerm {
    term_of_year_id: string;
    term: string;
}

const SchedulePage = () => {
    const startPage = useRef(false);
    const [professorList, setProfessorList] = useState<Professor[]>([]);

    const boxHeaderRef = useRef<HTMLDivElement>(null);
    const boxAdminSectionTermRef = useRef<HTMLDivElement>(null);
    const boxUserSectionTermRef = useRef<HTMLDivElement>(null);
    const [boxHeaderHeight, setBoxHeaderHeight] = useState<number | null>(null);
    const [boxAdminSectionTermHeight, setBoxAdminSectionTermHeight] = useState<number | null>(null);
    // const [boxUserSectionTermHeight, setBoxUserSectionTermHeight] = useState<number | null>(null);

    const [termOfYear, setTermOfYear] = useState<DropdownTerm[]>([]);
    const [department, setDepartment] = useState<string>('');
    const [openPopupAlertError, setOpenPopupAlertError] = useState<boolean>(false);
    const [openPopupAlert, setOpenPopupAlert] = useState<boolean>(false);
    const [messagePopupAlert, setMessagePopupAlert] = useState<string>('');

    const initFormSearch: FormSearch = {
        term: null,
        professor: {
            teacher_id: '',
            prefix: '',
            fullname: '',
            position: '',
            sub_position: '',
            has_schedule: false,
            dataTable: [],
        },
    };

    const [formSearch, setFormSearch] = useState<FormSearch>(initFormSearch);
    const [openSectionUpload, setOpenSectionUpload] = useState<boolean>(false);
    const [openSectionNoti, setOpenSectionNoti] = useState<boolean>(false);

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchTerm = async () => {
        try {
            const response = await getTermOfYear();
            if (response && response.message === 'Success') {
                setTermOfYear(response.payload);
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (startPage.current === false) {
            fetchTerm();
            if (getRoleUser() === appConfig.role.USER) {
                const data = getDataProfessor();
                if (data) {
                    const professorData: IProfessor = JSON.parse(data);
                    setFormSearch((prev) => ({
                        ...prev,
                        professor: {
                            teacher_id: professorData.teacher_id,
                            prefix: professorData.prefix,
                            fullname: professorData.fullname,
                            position: professorData.position,
                            sub_position: professorData.sub_position,
                            has_schedule: false,
                            dataTable: [],
                        },
                    }));
                }
            }
            startPage.current = true;
        }
    }, []);

    useEffect(() => {
        function updateHeights() {
            if (boxHeaderRef.current) {
                const height = boxHeaderRef.current.clientHeight;
                setBoxHeaderHeight(height);
            }
            if (boxAdminSectionTermRef.current) {
                const height = boxAdminSectionTermRef.current.clientHeight;
                setBoxAdminSectionTermHeight(height);
            }
            // if (boxUserSectionTermRef.current) {
            //     const height = boxUserSectionTermRef.current.clientHeight;
            //     setBoxUserSectionTermHeight(height);
            // }
        }
        updateHeights();
        window.addEventListener('resize', updateHeights);
        return () => {
            window.removeEventListener('resize', updateHeights);
        };
    }, []);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleUploadButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                if (!worksheet || !worksheet['!ref']) {
                    console.error('Worksheet or worksheet reference is undefined');
                    return;
                }
                const range = XLSX.utils.decode_range(worksheet['!ref']);
                const targetValues = [
                    'ID',
                    'PREFIXNAME1',
                    'DEPARTMENT',
                    'CAMPUSID',
                    'LEVELID',
                    'COURSECODE',
                    'SECX',
                    'COURSENAMEENG',
                    'COURSEUNIT',
                    'TOTALSEAT',
                    'ENROLLSEAT',
                    'DATE',
                    'MAJOR',
                ];
                const foundValues: { value: string; cellRef: string }[] = [];
                for (let row = range.s.r; row <= range.e.r; ++row) {
                    for (let col = range.s.c; col <= range.e.c; ++col) {
                        const cellAddress = { c: col, r: row };
                        const cellRef = XLSX.utils.encode_cell(cellAddress);
                        const cell = worksheet[cellRef];
                        const cellValue = cell ? cell.v : undefined;
                        if (targetValues.includes(cellValue)) {
                            foundValues.push({ value: cellValue, cellRef });
                        }
                    }
                }

                const xlsxData: MapData = {
                    levelId: [],
                    courseCode: [],
                    sec: [],
                    courseNameEng: [],
                    courseUnit: [],
                    totalSeat: [],
                    enrollSeat: [],
                    date: [],
                    major: [],
                };
                const mapping: { [key: string]: keyof MapData } = {
                    LEVELID: 'levelId',
                    COURSECODE: 'courseCode',
                    SECX: 'sec',
                    COURSENAMEENG: 'courseNameEng',
                    COURSEUNIT: 'courseUnit',
                    TOTALSEAT: 'totalSeat',
                    ENROLLSEAT: 'enrollSeat',
                    DATE: 'date',
                    MAJOR: 'major',
                };

                if (foundValues) {
                    const colID = foundValues[0].cellRef.charAt(0);
                    const rowID = parseInt(foundValues[0].cellRef.slice(1)) + 1;
                    const teacherIdFromXlsx = worksheet[colID + rowID]?.v;

                    const colDepartment = foundValues[1].cellRef.charAt(0);
                    const rowDepartment = parseInt(foundValues[1].cellRef.slice(1)) + 1;
                    const departmentValue = worksheet[colDepartment + rowDepartment]?.v;
                    if (!isNullOrUndefined(departmentValue)) {
                        setDepartment(departmentValue);
                    }
                    if (
                        teacherIdFromXlsx &&
                        teacherIdFromXlsx.toString() !== formSearch.professor.teacher_id
                    ) {
                        setOpenPopupAlertError(true);
                    } else {
                        const startValueIndex = foundValues.findIndex(
                            (item) => item.value === 'LEVELID'
                        );
                        if (startValueIndex !== -1) {
                            for (
                                let i = startValueIndex;
                                i < startValueIndex + 30 && i < foundValues.length;
                                i++
                            ) {
                                const { value, cellRef } = foundValues[i];
                                const col = cellRef.charAt(0);
                                const row = parseInt(cellRef.slice(1));
                                for (let j = row + 2; j <= 27; j++) {
                                    const newCellRef = col + j;
                                    const mapKey = mapping[value];
                                    if (mapKey) {
                                        xlsxData[mapKey].push(newCellRef);
                                    }
                                }
                            }
                        } else {
                            console.error('Start value LEVELID not found in the worksheet');
                        }
                        const xlsxDataRows = extractRowsFromWorksheet(worksheet, xlsxData);
                        const filterData = xlsxDataRows.filter(
                            (item) => !isNullOrUndefined(item.course_code)
                        );

                        setFormSearch((prev) => ({
                            ...prev,
                            professor: {
                                ...prev.professor,
                                dataTable: filterData,
                            },
                        }));
                    }
                }
            };
            reader.readAsArrayBuffer(file);
            event.target.value = '';
        }
    };

    const extractRowsFromWorksheet = (
        worksheet: XLSX.WorkSheet,
        xlsxData: MapData
    ): ScheduleRow[] => {
        const result: ScheduleRow[] = [];
        const maxLength = Math.max(
            xlsxData.levelId.length,
            xlsxData.courseCode.length,
            xlsxData.sec.length,
            xlsxData.courseNameEng.length,
            xlsxData.courseUnit.length,
            xlsxData.totalSeat.length,
            xlsxData.enrollSeat.length,
            xlsxData.date.length,
            xlsxData.major.length
        );
        for (let i = 0; i < maxLength + 3; i++) {
            const row: ScheduleRow = {
                schedule_teach_id: i,
                level_id: worksheet[xlsxData.levelId[i]]?.v || '',
                course_code: worksheet[xlsxData.courseCode[i]]?.v || '',
                section: worksheet[xlsxData.sec[i]]?.v || '',
                course_name: worksheet[xlsxData.courseNameEng[i]]?.v || '',
                course_unit: worksheet[xlsxData.courseUnit[i]]?.v || '',
                total_seat: worksheet[xlsxData.totalSeat[i]]?.v || '',
                enroll_seat: worksheet[xlsxData.enrollSeat[i]]?.v?.toString() || '',
                teach_date: worksheet[xlsxData.date[i]]?.v || '',
                major_name: worksheet[xlsxData.major[i]]?.v || '',
            };
            result.push(row);
        }
        return result;
    };

    const handleAutocompleteChange = (opt: Professor | null) => {
        setOpenSectionUpload(false);
        if (opt) {
            setFormSearch((prev) => ({
                ...prev,
                professor: {
                    ...prev.professor,
                    ...opt,
                    dataTable: [],
                },
            }));
        } else {
            setFormSearch((prev) => ({
                ...prev,
                professor: initFormSearch.professor,
            }));
        }
    };

    const fetchTeacherListByTerm = async (param: any) => {
        try {
            const response = await getTeacherSchedule(param);
            if (response && response.message === 'Success') {
                if (!isNullOrUndefined(response.payload)) {
                    const professor = response.payload;
                    const sourceProfessor = sourceList(professor);
                    setProfessorList(sourceProfessor);
                }
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    const handleChangeTerm = (opt: DropdownTerm | null, role: string) => {
        if (role === appConfig.role.ADMIN) {
            setFormSearch((prev) => ({
                ...prev,
                term: opt,
                professor: initFormSearch.professor,
            }));
            if (opt) {
                fetchTeacherListByTerm(opt.term_of_year_id);
            }
        }
        if (role === appConfig.role.USER) {
            setOpenSectionNoti(false);
            setFormSearch((prev) => ({
                ...prev,
                term: opt,
                professor: {
                    ...prev.professor,
                    dataTable: [],
                },
            }));
        }
    };

    const onClickSearch = async () => {
        try {
            let payload = {
                termId: formSearch.term?.term_of_year_id,
                teacherID: formSearch.professor.teacher_id,
            };
            // const response = await getScheduleByTeacherId(payload);
            const response = await getScheduleByTermIdAndTeacherId(payload);
            if (response && response.message === 'Success') {
                if (!isNullOrUndefined(response.payload)) {
                    const mapResponse = response.payload.map((item: ScheduleTeach) => {
                        return {
                            schedule_teach_id: item.schedule_teach_id,
                            level_id: item.level_id,
                            course_code: item.course_code,
                            section: item.section,
                            course_name: item.subject.name,
                            course_unit: `${item.subject.unit}${item.subject.type}`,
                            total_seat: item.total_seat,
                            enroll_seat: item.enroll_seat,
                            teach_date: item.teach_date,
                            major_name: item.major_name,
                        };
                    });
                    setFormSearch((prev) => ({
                        ...prev,
                        professor: {
                            ...prev.professor,
                            dataTable: mapResponse,
                        },
                    }));
                } else {
                    if (getRoleUser() === appConfig.role.ADMIN) {
                        setOpenSectionUpload(true);
                    } else {
                        setOpenSectionNoti(true);
                    }
                }
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    const onClickSave = async () => {
        if (!isNullOrUndefined(formSearch.professor.dataTable)) {
            const dataTable = formSearch.professor?.dataTable;
            const mapData = dataTable.map((item) => {
                return {
                    level_id: item.level_id,
                    course_code: item.course_code,
                    section: item.section,
                    course_name: item.course_name,
                    course_unit: item.course_unit,
                    total_seat: item.total_seat,
                    enroll_seat: Number(item.enroll_seat),
                    teach_date: item.teach_date,
                    major_name: item.major_name,
                };
            });
            let payload = {
                term_of_year_id: formSearch.term?.term_of_year_id,
                teacher_id: formSearch.professor?.teacher_id,
                teacher_name: formSearch.professor?.fullname,
                department: department,
                data: mapData,
            };
            const response = await saveScheduleTeach(payload);
            if (response && response.message === 'Success') {
                setOpenPopupAlert(true);
                setMessagePopupAlert('บันทึกตารางสอนสำเร็จ');
                setFormSearch((prev) => ({
                    ...prev,
                    professor: {
                        ...prev.professor,
                        has_schedule: true,
                    },
                }));
                fetchTeacherListAfterUploadSchedule();
            }
            setDepartment('');
        }
    };

    const fetchTeacherListAfterUploadSchedule = async () => {
        try {
            const response = await getTeacherSchedule(formSearch.term?.term_of_year_id);
            if (response && response.message === 'Success') {
                if (!isNullOrUndefined(response.payload)) {
                    const professor = response.payload;
                    const sourceProfessor = sourceList(professor);
                    setProfessorList(sourceProfessor);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onCancelSaveSchedule = () => {
        setFormSearch((prev) => ({
            ...prev,
            professor: {
                ...prev.professor,
                teacher_id: (prev.professor && prev.professor.teacher_id) ?? '',
                prefix: (prev.professor && prev.professor.prefix) ?? '',
                fullname: (prev.professor && prev.professor.fullname) ?? '',
                position: (prev.professor && prev.professor.position) ?? '',
                sub_position: (prev.professor && prev.professor.sub_position) ?? '',
                has_schedule: (prev.professor && prev.professor.has_schedule) ?? false,
                dataTable: [],
            },
        }));
    };

    const onClosePopupAlert = () => {
        setOpenPopupAlert(false);
        setMessagePopupAlert('');
    };

    return (
        <div>
            <Box sx={{ height: '100%' }}>
                <PopupAlert
                    isOpen={openPopupAlertError}
                    onClose={() => setOpenPopupAlertError(false)}
                    title={
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <span>ไม่สามารถเพิ่มตารางสอนได้</span>
                            <span>เนื่องจากข้อมูลอาจารย์ไม่ตรงกับระบบ</span>
                        </div>
                    }
                    type={'ERROR'}
                />
                <PopupAlert
                    isOpen={openPopupAlert}
                    onClose={onClosePopupAlert}
                    title={<div>{messagePopupAlert}</div>}
                    type={'SUCCESS'}
                />
                <Box ref={boxHeaderRef}>
                    <Typography textAlign="start" variant="h6" component="div">
                        ตารางสอน
                    </Typography>
                    <Divider />
                </Box>

                {getRoleUser() === appConfig.role.ADMIN && (
                    // Admin
                    <Box ref={boxAdminSectionTermRef}>
                        <Grid
                            container
                            spacing={2}
                            alignItems="center"
                            sx={{ paddingTop: 2, paddingBottom: 2 }}
                        >
                            <Grid item xs={12} sm={4}>
                                <Autocomplete
                                    size="small"
                                    fullWidth
                                    options={termOfYear}
                                    getOptionLabel={(option) => option.term}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="ปีการศึกษา"
                                            variant="outlined"
                                        />
                                    )}
                                    isOptionEqualToValue={(option, value) =>
                                        option.term_of_year_id === value.term_of_year_id
                                    }
                                    value={formSearch.term}
                                    onChange={(_e, option) =>
                                        handleChangeTerm(option, appConfig.role.ADMIN)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    size="small"
                                    fullWidth
                                    options={professorList}
                                    getOptionLabel={(option) => option.fullname}
                                    renderInput={(params) => (
                                        <TextField {...params} label="อาจารย์" variant="outlined" />
                                    )}
                                    isOptionEqualToValue={(option, value) =>
                                        option.teacher_id === value.teacher_id
                                    }
                                    value={
                                        professorList.find(
                                            (professor) =>
                                                professor.teacher_id ===
                                                formSearch.professor.teacher_id
                                        ) || null
                                    }
                                    onChange={(_e, option) => handleAutocompleteChange(option)}
                                    disabled={!formSearch.term}
                                    renderOption={(props, option) => {
                                        return (
                                            <li
                                                {...props}
                                                key={option.teacher_id}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                {option.fullname}
                                                {option.has_schedule && (
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <CheckCircleOutlineIcon
                                                            fontSize="small"
                                                            sx={{
                                                                color: '#008000',
                                                            }}
                                                        />
                                                        <label
                                                            style={{
                                                                fontSize: 14,
                                                                color: '#008000',
                                                            }}
                                                        >
                                                            บันทึกแล้ว
                                                        </label>
                                                    </div>
                                                )}
                                            </li>
                                        );
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={onClickSearch}
                                    disabled={
                                        !formSearch.term?.term ||
                                        isNullOrUndefined(formSearch.professor.teacher_id)
                                    }
                                >
                                    ตกลง
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                )}
                {getRoleUser() === appConfig.role.USER && (
                    <Box ref={boxUserSectionTermRef}>
                        <Grid
                            container
                            spacing={2}
                            alignItems="center"
                            sx={{ paddingTop: 2, paddingBottom: 2 }}
                        >
                            <Grid item xs={12} sm={8}>
                                <Autocomplete
                                    size="small"
                                    fullWidth
                                    options={termOfYear}
                                    getOptionLabel={(option) => option.term}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="ปีการศึกษา"
                                            variant="outlined"
                                        />
                                    )}
                                    isOptionEqualToValue={(option, value) =>
                                        option.term_of_year_id === value.term_of_year_id
                                    }
                                    onChange={(_e, option) =>
                                        handleChangeTerm(option, appConfig.role.USER)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={onClickSearch}
                                    disabled={!formSearch.term?.term}
                                >
                                    ตกลง
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                )}
                {formSearch.professor && !isNullOrUndefined(formSearch.professor.dataTable) && (
                    <Box
                        style={{
                            height: '100%',
                            width: '100%',
                            // height:
                            //     boxHeaderHeight && boxUserSectionTermHeight
                            //         ? `calc(100vh - ${boxHeaderHeight}px - ${boxUserSectionTermHeight}px - 16px)`
                            //         : '100%',
                            // width:
                            //     window?.innerWidth > 1024
                            //         ? `calc(100vw - 272px)`
                            //         : `calc(100vw - 32px)`,
                        }}
                    >
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Level ID</TableCell>
                                        <TableCell align="center">Course Code</TableCell>
                                        <TableCell align="center">Section</TableCell>
                                        <TableCell align="center">Course Name</TableCell>
                                        <TableCell align="center">Course Unit</TableCell>
                                        <TableCell align="center">Total Seat</TableCell>
                                        <TableCell align="center">Enroll Seat</TableCell>
                                        <TableCell align="center">Date</TableCell>
                                        <TableCell align="center">Major</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {formSearch.professor?.dataTable
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <TableRow key={row.schedule_teach_id}>
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '100px' }}
                                                >
                                                    {row.level_id}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '120px' }}
                                                >
                                                    {row.course_code}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '100px' }}
                                                >
                                                    {row.section}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{ minWidth: '200px', flex: 1 }}
                                                >
                                                    {row.course_name}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '100px' }}
                                                >
                                                    {row.course_unit}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '100px' }}
                                                >
                                                    {row.total_seat}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '100px' }}
                                                >
                                                    {row.enroll_seat}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '100px' }}
                                                >
                                                    {row.teach_date}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{ minWidth: '100px' }}
                                                >
                                                    {row.major_name}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10]}
                                component="div"
                                count={formSearch.professor?.dataTable.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelDisplayedRows={({ from, to, count }) =>
                                    `Showing ${from} to ${to} of ${count}`
                                }
                                labelRowsPerPage="Rows per page"
                            />
                        </TableContainer>
                        {getRoleUser() === appConfig.role.ADMIN &&
                            !formSearch.professor.has_schedule && (
                                <Grid container marginTop={2}>
                                    <Grid
                                        item
                                        xs={12}
                                        display={'flex'}
                                        justifyContent={'center'}
                                        gap={2}
                                    >
                                        <Button
                                            startIcon={<SaveIcon />}
                                            variant="contained"
                                            onClick={onClickSave}
                                        >
                                            บันทึกตารางสอน
                                        </Button>
                                        <Button
                                            startIcon={<CloseIcon />}
                                            variant="contained"
                                            onClick={onCancelSaveSchedule}
                                        >
                                            ยกเลิก
                                        </Button>
                                    </Grid>
                                </Grid>
                            )}
                    </Box>
                )}
                {openSectionUpload &&
                    formSearch.professor &&
                    isNullOrUndefined(formSearch.professor.dataTable) && (
                        <Box
                            style={{
                                backgroundColor: '#EEEEEE',
                                borderRadius: '10px',
                                height:
                                    boxHeaderHeight && boxAdminSectionTermHeight
                                        ? `calc(100vh - ${boxHeaderHeight}px - ${boxAdminSectionTermHeight}px - 16px)`
                                        : '100%',
                                display: !isNullOrUndefined(formSearch.professor.dataTable)
                                    ? 'none'
                                    : 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                startIcon={<CloudUploadIcon />}
                                onClick={handleUploadButtonClick}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                Upload ตารางสอน
                            </Button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept=".xlsx, .xls"
                                onChange={handleFileUpload}
                            />
                        </Box>
                    )}
                {getRoleUser() === appConfig.role.USER && openSectionNoti && (
                    <Box
                        style={{
                            backgroundColor: '#EEEEEE',
                            borderRadius: '10px',
                            height:
                                boxHeaderHeight && boxAdminSectionTermHeight
                                    ? `calc(100vh - ${boxHeaderHeight}px - ${boxAdminSectionTermHeight}px - 16px)`
                                    : '100%',
                            display: !isNullOrUndefined(formSearch.professor.dataTable)
                                ? 'none'
                                : 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="subtitle1">ไม่มีข้อมูลตารางสอนในระบบ</Typography>
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default SchedulePage;
