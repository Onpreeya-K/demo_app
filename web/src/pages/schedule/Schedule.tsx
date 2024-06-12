import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DoneIcon from '@mui/icons-material/Done';
import {
    Autocomplete,
    Box,
    Button,
    Divider,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import appConfig from '../../config/application-config.json';
import { getRoleUser, isNullOrUndefined } from '../../util/Util';

interface Dropdown {
    value: string;
    label: string;
}

interface Professor {
    teacher_id: string;
    prefix: string;
    fullname: string;
    position: string;
    sub_position: string;
    hasSchedule: boolean;
}

interface FormState {
    term: Dropdown | null;
    professor: Professor | null;
}

interface ScheduleRow {
    id: number;
    levelID: string;
    courseCode: string;
    secX: string;
    courseNameEng: string;
    courseUnit: string;
    totalSeat: string;
    enrollSeat: string;
    date: string;
}

const rows = [
    {
        id: '1',
        levelID: '9',
        courseCode: '0501701-8',
        secX: '1',
        courseNameEng:
            'Research Methodology in Educational Administration and Development',
        courseUnit: '3 (2-2-5)',
        totalSeat: '15',
        enrollSeat: '6',
        date: 'WED',
    },
    {
        id: '2',
        levelID: '8',
        courseCode: '0501701-8',
        secX: '1',
        courseNameEng:
            'Research Methodology in Educational Administration and Development',
        courseUnit: '3 (2-2-5)',
        totalSeat: '25',
        enrollSeat: '25',
        date: 'THU',
    },
    {
        id: '3',
        levelID: '8',
        courseCode: '0501701-8',
        secX: '2',
        courseNameEng:
            'Research Methodology in Educational Administration and Development',
        courseUnit: '3 (2-2-5)',
        totalSeat: '25',
        enrollSeat: '25',
        date: 'FRI',
    },
    {
        id: '4',
        levelID: '8',
        courseCode: '0501701-8',
        secX: '3',
        courseNameEng:
            'Research Methodology in Educational Administration and Development',
        courseUnit: '3 (2-2-5)',
        totalSeat: '25',
        enrollSeat: '21',
        date: 'MON',
    },
    {
        id: '5',
        levelID: '9',
        courseCode: '0501702-10',
        secX: '1',
        courseNameEng:
            'principles, theories and innovations in educational administration and development',
        courseUnit: '3 (2-2-5)',
        totalSeat: '15',
        enrollSeat: '12',
        date: 'TUE',
    },
    {
        id: '6',
        levelID: '8',
        courseCode: '0501702-10',
        secX: '1',
        courseNameEng:
            'principles, theories and innovations in educational administration and development',
        courseUnit: '3 (2-2-5)',
        totalSeat: '25',
        enrollSeat: '0',
        date: 'WED',
    },
    {
        id: '7',
        levelID: '8',
        courseCode: '0501702-10',
        secX: '2',
        courseNameEng:
            'principles, theories and innovations in educational administration and development',
        courseUnit: '3 (2-2-5)',
        totalSeat: '25',
        enrollSeat: '0',
        date: 'THU',
    },
];

const SchedulePage = () => {
    const [optionsTerm, setOptionsTerm] = useState<Dropdown[]>([]);
    const [professorList, setProfessorList] = useState<Professor[]>([]);
    const [form, setForm] = useState<FormState>({
        term: {
            value: '',
            label: '',
        },
        professor: {
            teacher_id: '',
            prefix: '',
            fullname: '',
            position: '',
            sub_position: '',
            hasSchedule: false,
        },
    });

    const boxHeaderRef = useRef<HTMLDivElement>(null);
    const boxAdminSectionTermRef = useRef<HTMLDivElement>(null);
    const boxUserSectionTermRef = useRef<HTMLDivElement>(null);
    const [boxHeaderHeight, setBoxHeaderHeight] = useState<number | null>(null);
    const [boxAdminSectionTermHeight, setBoxAdminSectionTermHeight] = useState<
        number | null
    >(null);
    const [boxUserSectionTermHeight, setBoxUserSectionTermHeight] = useState<
        number | null
    >(null);

    const fetchData = () => {
        const term = [
            {
                value: '12566',
                label: '1/2566',
            },
            {
                value: '22566',
                label: '2/2566',
            },
            {
                value: '12567',
                label: '1/2567',
            },
            {
                value: '22567',
                label: '2/2567',
            },
        ];
        setOptionsTerm(term);
        const professor = [
            {
                teacher_id: '50078',
                prefix: 'อ.ดร.',
                fullname: 'วิภาณี  สุขเอิบ',
                position: 'อาจารย์',
                sub_position: 'อาจารย์',
                hasSchedule: true,
            },
            {
                teacher_id: '5117',
                prefix: 'รศ.ดร.',
                fullname: 'รังสรรค์ โฉมยา',
                position: 'รองศาสตราจารย์',
                sub_position: 'อาจารย์ประจำหลักสูตร',
                hasSchedule: true,
            },
            {
                teacher_id: '5805010',
                prefix: 'ผศ.',
                fullname: 'กรรณิกา พันธ์ศรี',
                position: 'ผู้ช่วยศ.',
                sub_position: 'ผู้ช่วยศ.',
                hasSchedule: false,
            },
            {
                teacher_id: '5999',
                prefix: 'อ.',
                fullname: 'ศุภชัย ตู้กลาง',
                position: 'อาจารย์',
                sub_position: 'อาจารย์',
                hasSchedule: false,
            },
        ];
        setProfessorList(professor);
    };

    useEffect(() => {
        fetchData();
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
            if (boxUserSectionTermRef.current) {
                const height = boxUserSectionTermRef.current.clientHeight;
                setBoxUserSectionTermHeight(height);
            }
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

    const xlsxData = {
        levelId: [
            'E5',
            'E6',
            'E7',
            'E8',
            'E9',
            'E10',
            'E11',
            'E12',
            'E13',
            'E14',
            'E15',
            'E16',
            'E17',
            'E18',
            'E19',
            'E20',
            'E21',
            'E22',
            'E23',
            'E24',
            'E25',
            'E26',
            'E27',
        ],
        courseCode: [
            'F5',
            'F6',
            'F7',
            'F8',
            'F9',
            'F10',
            'F11',
            'F12',
            'F13',
            'F14',
            'F15',
            'F16',
            'F17',
            'F18',
            'F19',
            'F20',
            'F21',
            'F22',
            'F23',
            'F24',
            'F25',
            'F26',
            'F27',
        ],
        sec: [
            'G5',
            'G6',
            'G7',
            'G8',
            'G9',
            'G10',
            'G11',
            'G12',
            'G13',
            'G14',
            'G15',
            'G16',
            'G17',
            'G18',
            'G19',
            'G20',
            'G21',
            'G22',
            'G23',
            'G24',
            'G25',
            'G26',
            'G27',
        ],
        courseNameEng: [
            'H5',
            'H6',
            'H7',
            'H8',
            'H9',
            'H10',
            'H11',
            'H12',
            'H13',
            'H14',
            'H15',
            'H16',
            'H17',
            'H18',
            'H19',
            'H20',
            'H21',
            'H22',
            'H23',
            'H24',
            'H25',
            'H26',
            'H27',
        ],
        courseUnit: [
            'I5',
            'I6',
            'I7',
            'I8',
            'I9',
            'I10',
            'I11',
            'I12',
            'I13',
            'I14',
            'I15',
            'I16',
            'I17',
            'I18',
            'I19',
            'I20',
            'I21',
            'I22',
            'I23',
            'I24',
            'I25',
            'I26',
            'I27',
        ],
        totalSeat: [
            'J5',
            'J6',
            'J7',
            'J8',
            'J9',
            'J10',
            'J11',
            'J12',
            'J13',
            'J14',
            'J15',
            'J16',
            'J17',
            'J18',
            'J19',
            'J20',
            'J21',
            'J22',
            'J23',
            'J24',
            'J25',
            'J26',
            'J27',
        ],
        enrollSeat: [
            'K5',
            'K6',
            'J7',
            'J8',
            'J9',
            'J10',
            'J11',
            'J12',
            'J13',
            'J14',
            'J15',
            'J16',
            'J17',
            'J18',
            'J19',
            'J20',
            'J21',
            'J22',
            'J23',
            'J24',
            'J25',
            'J26',
            'J27',
        ],
        date: [
            'L5',
            'L6',
            'J7',
            'J8',
            'J9',
            'J10',
            'J11',
            'J12',
            'J13',
            'J14',
            'J15',
            'J16',
            'J17',
            'J18',
            'J19',
            'J20',
            'J21',
            'J22',
            'J23',
            'J24',
            'J25',
            'J26',
            'J27',
        ],
        Major: [
            'N5',
            'N6',
            'J7',
            'J8',
            'J9',
            'J10',
            'J11',
            'J12',
            'J13',
            'J14',
            'J15',
            'J16',
            'J17',
            'J18',
            'J19',
            'J20',
            'J21',
            'J22',
            'J23',
            'J24',
            'J25',
            'J26',
            'J27',
        ],
    };

    const [rowsOfSchedule, setRowsOfSchedule] = useState<ScheduleRow[]>([]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const xlsxDataRows = extractRowsFromWorksheet(worksheet);
                setRowsOfSchedule(xlsxDataRows);
            };

            reader.readAsArrayBuffer(file);
        }
    };

    const extractRowsFromWorksheet = (
        worksheet: XLSX.WorkSheet
    ): ScheduleRow[] => {
        const result: ScheduleRow[] = [];
        for (let i = 5; i < xlsxData.levelId.length; i++) {
            const row: ScheduleRow = {
                id: i + 1,
                levelID: worksheet[xlsxData.levelId[i]]?.v || '',
                courseCode: worksheet[xlsxData.courseCode[i]]?.v || '',
                secX: worksheet[xlsxData.sec[i]]?.v || '',
                courseNameEng: worksheet[xlsxData.courseNameEng[i]]?.v || '',
                courseUnit: worksheet[xlsxData.courseUnit[i]]?.v || '',
                totalSeat: worksheet[xlsxData.totalSeat[i]]?.v || '',
                enrollSeat: worksheet[xlsxData.enrollSeat[i]]?.v || '',
                date: worksheet[xlsxData.date[i]]?.v || '',
            };

            result.push(row);
        }
        return result;
    };

    const columnsOfSchedule: GridColDef[] = [
        {
            field: 'levelID',
            headerName: 'Level ID',
            align: 'center',
            headerAlign: 'center',
            width: 200,
        },
        {
            field: 'courseCode',
            headerName: 'Course Code',
            align: 'center',
            headerAlign: 'center',
            width: 200,
        },
        {
            field: 'secX',
            headerName: 'Section',
            align: 'center',
            headerAlign: 'center',
            width: 200,
        },
        {
            field: 'courseNameEng',
            headerName: 'Course Name',
            align: 'left',
            headerAlign: 'center',
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'courseUnit',
            headerName: 'Course Unit',
            align: 'center',
            headerAlign: 'center',
            width: 200,
        },
        {
            field: 'totalSeat',
            headerName: 'Total Seat',
            align: 'center',
            headerAlign: 'center',
            width: 200,
        },
        {
            field: 'enrollSeat',
            headerName: 'Enroll Seat',
            align: 'center',
            headerAlign: 'center',
            width: 200,
        },
        {
            field: 'date',
            headerName: 'Date',
            align: 'center',
            headerAlign: 'center',
            width: 150,
        },
    ];

    const [openTable, setOpenTable] = useState<boolean>(false);
    const onClickOpenTable = () => {
        setOpenTable(true);
    };

    const handleAutocompleteChange = <T extends keyof FormState>(
        name: T,
        value: FormState[T]
    ) => {
        setOpenTable(false);
        setRowsOfSchedule([]);
        if (value) {
            setForm((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    return (
        <div>
            <Box sx={{ height: '100%' }}>
                <Box ref={boxHeaderRef}>
                    <Typography textAlign="start" variant="h6" component="div">
                        ตารางสอน
                    </Typography>
                    <Divider />
                </Box>

                {getRoleUser() === appConfig.role.ADMIN ? (
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
                                    options={optionsTerm}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="ปีการศึกษา"
                                            variant="outlined"
                                        />
                                    )}
                                    isOptionEqualToValue={(option, value) =>
                                        option.value === value.value
                                    }
                                    onChange={(_e, option) =>
                                        handleAutocompleteChange('term', option)
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
                                        <TextField
                                            {...params}
                                            label="อาจารย์"
                                            variant="outlined"
                                        />
                                    )}
                                    isOptionEqualToValue={(option, value) =>
                                        option.teacher_id === value.teacher_id
                                    }
                                    onChange={(_e, option) =>
                                        handleAutocompleteChange(
                                            'professor',
                                            option
                                        )
                                    }
                                    disabled={!form.term?.value}
                                    renderOption={(props, option) => {
                                        return (
                                            <li
                                                {...props}
                                                key={option.teacher_id}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                }}
                                            >
                                                {option.fullname}
                                                {option.hasSchedule && (
                                                    <DoneIcon
                                                        sx={{
                                                            color: '#008000',
                                                        }}
                                                    />
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
                                    onClick={onClickOpenTable}
                                    disabled={isNullOrUndefined(
                                        form.professor?.teacher_id
                                    )}
                                >
                                    ตกลง
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                ) : (
                    // User
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
                                    options={optionsTerm}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="ปีการศึกษา"
                                            variant="outlined"
                                        />
                                    )}
                                    isOptionEqualToValue={(option, value) =>
                                        option.value === value.value
                                    }
                                    onChange={(_e, option) =>
                                        handleAutocompleteChange('term', option)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={onClickOpenTable}
                                    disabled={!form.term?.value}
                                >
                                    ตกลง
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {getRoleUser() === appConfig.role.ADMIN ? (
                    <div>
                        {openTable && (
                            <div>
                                {form.professor?.hasSchedule ? (
                                    <Box
                                        style={{
                                            height:
                                                boxHeaderHeight &&
                                                boxUserSectionTermHeight
                                                    ? `calc(100vh - ${boxHeaderHeight}px - ${boxUserSectionTermHeight}px - 16px)`
                                                    : '100%',
                                            width:
                                                window?.innerWidth > 1024
                                                    ? `calc(100vw - 272px)`
                                                    : `calc(100vw - 32px)`,
                                        }}
                                    >
                                        <DataGrid
                                            rows={rows}
                                            columns={columnsOfSchedule}
                                            getRowId={(row: any) => row.id}
                                            autoHeight
                                            initialState={{
                                                pagination: {
                                                    paginationModel: {
                                                        page: 0,
                                                        pageSize: 10,
                                                    },
                                                },
                                            }}
                                            pageSizeOptions={[5, 10]}
                                            disableRowSelectionOnClick
                                        />
                                    </Box>
                                ) : (
                                    <Box
                                        style={{
                                            backgroundColor: '#EEEEEE',
                                            borderRadius: '10px',
                                            height:
                                                boxHeaderHeight &&
                                                boxAdminSectionTermHeight
                                                    ? `calc(100vh - ${boxHeaderHeight}px - ${boxAdminSectionTermHeight}px - 16px)`
                                                    : '100%',
                                            display: !isNullOrUndefined(
                                                rowsOfSchedule
                                            )
                                                ? 'none'
                                                : 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Button
                                            startIcon={<CloudUploadIcon />}
                                            onClick={handleUploadButtonClick}
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
                            </div>
                        )}
                        {!isNullOrUndefined(rowsOfSchedule) && (
                            <Box
                                style={{
                                    height:
                                        boxHeaderHeight &&
                                        boxUserSectionTermHeight
                                            ? `calc(100vh - ${boxHeaderHeight}px - ${boxUserSectionTermHeight}px - 16px)`
                                            : '100%',
                                    width:
                                        window?.innerWidth > 1024
                                            ? `calc(100vw - 272px)`
                                            : `calc(100vw - 32px)`,
                                }}
                            >
                                <DataGrid
                                    rows={rowsOfSchedule}
                                    columns={columnsOfSchedule}
                                    getRowId={(row) => row.id}
                                    autoHeight
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                page: 0,
                                                pageSize: 10,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10]}
                                    disableRowSelectionOnClick
                                />
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
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            startIcon={<CloseIcon />}
                                            variant="contained"
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </div>
                ) : (
                    <div>
                        {openTable && (
                            <Box
                                style={{
                                    height:
                                        boxHeaderHeight &&
                                        boxUserSectionTermHeight
                                            ? `calc(100vh - ${boxHeaderHeight}px - ${boxUserSectionTermHeight}px - 16px)`
                                            : '100%',
                                    width:
                                        window?.innerWidth > 1024
                                            ? `calc(100vw - 272px)`
                                            : `calc(100vw - 32px)`,
                                }}
                            >
                                <DataGrid
                                    rows={rows}
                                    columns={columnsOfSchedule}
                                    getRowId={(row: any) => row.id}
                                    autoHeight
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                page: 0,
                                                pageSize: 10,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10]}
                                    disableRowSelectionOnClick
                                />
                            </Box>
                        )}
                    </div>
                )}
            </Box>
        </div>
    );
};

export default SchedulePage;
