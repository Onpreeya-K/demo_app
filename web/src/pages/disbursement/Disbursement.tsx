import {
    Autocomplete,
    Box,
    Button,
    Divider,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import {
    DataGrid,
    GridColDef,
    GridColumnGroupingModel,
} from '@mui/x-data-grid';
import { getRoleUser } from '../../util/Util';
import appConfig from '../../config/application-config.json';
import { useEffect, useState } from 'react';
import { FaRegFilePdf } from 'react-icons/fa6';
import { MdPreview } from 'react-icons/md';

interface Dropdown {
    value: string;
    label: string;
}

const DisbursementPage = () => {
    const [optionsTerm, setOptionsTerm] = useState<Dropdown[]>([]);
    const [professorList, setProfessorList] = useState<Dropdown[]>([]);

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
        ];
        setOptionsTerm(term);
        const professor = [
            {
                value: '1',
                label: 'ผศ.ดร.วราพร  เอราวรรณ์',
            },
            {
                value: '2',
                label: 'ผศ.ก่อเกียรติ  ขวัญสกุล',
            },
            {
                value: '3',
                label: 'อ.ดร.ชนยุตฏษ์  ช้างเพชร',
            },
        ];
        setProfessorList(professor);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const rowsOfSchedule = [
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
    ];

    const columnsOfSchedule: GridColDef[] = [
        {
            field: 'levelID',
            headerName: 'levelID',
            align: 'center',
            headerAlign: 'center',
            width: 200,
            valueGetter: (params) => params,
        },
        {
            field: 'courseCode',
            headerName: 'courseCode',
            align: 'center',
            headerAlign: 'center',
            width: 200,
            valueGetter: (params) => params,
        },
        {
            field: 'secX',
            headerName: 'Sec',
            align: 'center',
            headerAlign: 'center',
            width: 200,
            valueGetter: (params) => params,
        },
        {
            field: 'courseNameEng',
            headerName: 'courseNameEng',
            align: 'left',
            headerAlign: 'center',
            minWidth: 200,
            flex: 1,
            valueGetter: (params) => params,
        },
        {
            field: 'courseUnit',
            headerName: 'courseUnit',
            align: 'center',
            headerAlign: 'center',
            width: 200,
            valueGetter: (params) => params,
        },
        {
            field: 'totalSeat',
            headerName: 'totalSeat',
            align: 'center',
            headerAlign: 'center',
            width: 200,
            valueGetter: (params) => params,
        },
        {
            field: 'enrollSeat',
            headerName: 'enrollSeat',
            align: 'center',
            headerAlign: 'center',
            width: 200,
            valueGetter: (params) => params,
        },
        {
            field: 'date',
            headerName: 'date',
            align: 'center',
            headerAlign: 'center',
            width: 150,
            valueGetter: (params) => params,
        },
    ];

    const rowsOfDisburse = [
        {
            id: '1',
            courseCode: '0560202-1',
            courseNameEng: 'Learning and Teaching',
            courseUnit: '3 (2-2-5)',
            group: '15',
            lavel: '1',
            enrollSeat: '24',
            instructor: '1',
            disburse: '2,880.00',
            note: 'Music ED',
            accept: '3.00',
            reject: null,
        },
        {
            id: '2',
            courseCode: '0560401-3',
            courseNameEng: 'Internship I',
            courseUnit: '6 (0-16-0)',
            group: '310',
            lavel: '1',
            enrollSeat: '24',
            instructor: '1',
            disburse: '',
            note: 'Music ED',
            accept: '1.00',
            reject: '2.00',
        },
    ];
    const columnsOfDisburse: GridColDef[] = [
        {
            field: 'courseCode',
            headerName: 'รหัสวิชา',
            align: 'center',
            headerAlign: 'center',
            width: 200,
            valueGetter: (params) => params,
        },
        {
            field: 'courseNameEng',
            headerName: 'รายวิชา',
            align: 'left',
            headerAlign: 'center',
            width: 200,
            valueGetter: (params) => params,
        },
        {
            field: 'courseUnit',
            headerName: 'หน่วยกิต',
            align: 'center',
            headerAlign: 'center',
            width: 200,
            valueGetter: (params) => params,
        },
        {
            field: 'group',
            headerName: 'กลุ่ม',
            align: 'center',
            headerAlign: 'center',
            width: 150,
            valueGetter: (params) => params,
        },
        {
            field: 'lavel',
            headerName: 'ระดับ',
            align: 'center',
            headerAlign: 'center',
            width: 150,
            valueGetter: (params) => params,
        },
        {
            field: 'enrollSeat',
            headerName: 'จำนวนนิสิตลงทะเบียน',
            align: 'center',
            headerAlign: 'center',
            width: 250,
            valueGetter: (params) => params,
        },
        {
            field: 'instructor',
            headerName: 'ผู้สอน',
            align: 'center',
            headerAlign: 'center',
            minWidth: 250,
            flex: 1,
            valueGetter: (params) => params,
        },
        {
            field: 'accept',
            headerName: 'ได้',
            align: 'center',
            headerAlign: 'center',
            width: 150,
            valueGetter: (params) => params,
        },
        {
            field: 'reject',
            headerName: 'ไม่ได้',
            align: 'center',
            headerAlign: 'center',
            width: 150,
            valueGetter: (params) => params,
        },
        {
            field: 'date',
            headerName: 'เวลาเรียน',
            align: 'center',
            headerAlign: 'center',
            width: 150,
            valueGetter: (params) => params,
        },
        {
            field: 'note',
            headerName: 'หมายเหตุ',
            align: 'left',
            headerAlign: 'center',
            width: 150,
            valueGetter: (params) => params,
        },
    ];

    const columnGroupingResult: GridColumnGroupingModel = [
        {
            groupId: 'เบิก',
            headerAlign: 'center',
            children: [{ field: 'accept' }, { field: 'reject' }],
        },
    ];

    return (
        <div>
            <Box sx={{ height: '100%' }}>
                <Box>
                    <Typography textAlign="start" variant="h6" component="div">
                        เบิกค่าสอน
                    </Typography>
                    <Divider />
                </Box>
                {getRoleUser() !== appConfig.role.ADMIN ? (
                    <Box
                        sx={{
                            // backgroundColor: '#EEEEEE',
                            // borderRadius: '10px',
                            // height: '300px',
                            marginTop: 2,
                            width:
                                window?.innerWidth > 1024
                                    ? `calc(100vw - 272px)`
                                    : `calc(100vw - 32px)`,
                        }}
                    >
                        <DataGrid
                            rows={rowsOfSchedule}
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
                    <div>
                        <Box>
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
                                        getOptionLabel={(option) =>
                                            option.label
                                        }
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
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Autocomplete
                                        size="small"
                                        fullWidth
                                        options={professorList}
                                        getOptionLabel={(option) =>
                                            option.label
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="อาจารย์"
                                                variant="outlined"
                                            />
                                        )}
                                        isOptionEqualToValue={(option, value) =>
                                            option.value === value.value
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        // onClick={onClickOpenTable}
                                    >
                                        ตกลง
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                )}
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ paddingTop: 2, paddingBottom: 2 }}
                >
                    <Grid item xs={4} md={2}>
                        <Button
                            variant="text"
                            fullWidth
                            startIcon={<MdPreview />}
                        >
                            ดูตัวอย่าง
                        </Button>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <Button
                            variant="text"
                            fullWidth
                            startIcon={<FaRegFilePdf />}
                        >
                            ดาวน์โหลด
                        </Button>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        // backgroundColor: '#EEEEEE',
                        // borderRadius: '10px',
                        height: '300px',
                        // marginTop: 2,
                        width:
                            window?.innerWidth > 1024
                                ? `calc(100vw - 272px)`
                                : `calc(100vw - 32px)`,
                    }}
                >
                    <DataGrid
                        rows={rowsOfDisburse}
                        columns={columnsOfDisburse}
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
                        columnGroupingModel={columnGroupingResult}
                    />
                </Box>
            </Box>
        </div>
    );
};

export default DisbursementPage;
