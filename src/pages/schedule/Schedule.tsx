import {
    Autocomplete,
    Box,
    Button,
    Divider,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import MenuDrawer from '../../components/drawer/Drawer-menu';
import { getRoleUser } from '../../util/Util';
import appConfig from '../../config/application-config.json';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Dropdown {
    value: string;
    label: string;
}

const SchedulePage = () => {
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

    const handleFileInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            const selectedFile = fileList[0];
            if (
                selectedFile.type ===
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ) {
                console.log('Selected XLSX file:', selectedFile);
            } else {
                console.error('Please select an XLSX file.');
            }
        }
    };

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

    const columns: GridColDef[] = [
        {
            field: 'levelID',
            headerName: 'levelID',
            align: 'center',
            headerAlign: 'center',
            // width: 200,
            valueGetter: (params) => params,
        },
        {
            field: 'courseCode',
            headerName: 'courseCode',
            align: 'center',
            headerAlign: 'center',
            valueGetter: (params) => params,
        },
        {
            field: 'secX',
            headerName: 'Sec',
            align: 'center',
            headerAlign: 'center',
            width: 150,
            valueGetter: (params) => params,
        },
        {
            field: 'courseNameEng',
            headerName: 'courseNameEng',
            align: 'left',
            headerAlign: 'center',
            width: 200,
            valueGetter: (params) => params,
        },
        {
            field: 'courseUnit',
            headerName: 'courseUnit',
            align: 'left',
            headerAlign: 'center',
            flex: 1,
            valueGetter: (params) => params,
        },
        {
            field: 'totalSeat',
            headerName: 'totalSeat',
            align: 'center',
            headerAlign: 'center',
            valueGetter: (params) => params,
        },
        {
            field: 'enrollSeat',
            headerName: 'enrollSeat',
            align: 'center',
            headerAlign: 'center',
            width: 150,
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

    const [openTable, setOpenTable] = useState<boolean>(false);
    const onClickOpenTable = () => {
        console.log('click!');

        setOpenTable(true);
    };

    return (
        <MenuDrawer>
            <Box sx={{ height: '100%' }}>
                <Box ref={boxHeaderRef}>
                    <Typography textAlign="start" variant="h6" component="div">
                        ตารางสอน
                    </Typography>
                    <Divider />
                </Box>

                {/* USER */}
                {getRoleUser() === appConfig.role.ADMIN ? (
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
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    size="small"
                                    fullWidth
                                    options={professorList}
                                    getOptionLabel={(option) => option.label}
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
                                    onClick={onClickOpenTable}
                                >
                                    ตกลง
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                ) : (
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
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={onClickOpenTable}
                                >
                                    ตกลง
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                )}
                {getRoleUser() === appConfig.role.ADMIN ? (
                    <Box
                        style={{
                            backgroundColor: '#EEEEEE',
                            borderRadius: '10px',
                            height:
                                boxHeaderHeight && boxAdminSectionTermHeight
                                    ? `calc(100vh - ${boxHeaderHeight}px - ${boxAdminSectionTermHeight}px - 16px)`
                                    : '100%',
                            display: !openTable ? 'flex' : 'none',
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
                            accept=".xlsx"
                            onChange={handleFileInputChange}
                        />
                    </Box>
                ) : (
                    <Box
                        style={{
                            height:
                                boxHeaderHeight && boxUserSectionTermHeight
                                    ? `calc(100vh - ${boxHeaderHeight}px - ${boxUserSectionTermHeight}px - 16px)`
                                    : '100%',
                            display: !openTable ? 'flex' : 'none',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <label>ไม่มีข้อมูลตารางสอน</label>
                    </Box>
                )}

                {openTable && (
                    <Box
                        style={{
                            // backgroundColor: '#EEEEEE',
                            // borderRadius: '10px',
                            height:
                                boxHeaderHeight && boxUserSectionTermHeight
                                    ? `calc(100vh - ${boxHeaderHeight}px - ${boxUserSectionTermHeight}px - 16px)`
                                    : '100%',
                            // width: `calc(100% - 240px)`,
                            // display: 'flex',
                            // justifyContent: 'center',
                            // alignItems: 'center',
                        }}
                    >
                        <DataGrid
                            rows={rows}
                            columns={columns}
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
                            // slots={{ noRowsOverlay: CustomNoRowsOverlay }}
                            // sx={{ '--DataGrid-overlayHeight': '250px' }}
                            pageSizeOptions={[5, 10]}
                            disableRowSelectionOnClick
                            // onCellClick={(record) => handleCellTeam(record)}
                            // rowHeight={150}
                        />
                    </Box>
                )}
            </Box>
        </MenuDrawer>
    );
};

export default SchedulePage;
