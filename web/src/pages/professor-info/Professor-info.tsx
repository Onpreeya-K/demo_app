import {
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import MenuDrawer from '../../components/drawer/Drawer-menu';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useRef, useState } from 'react';

const ProfessorInfoPage = () => {
    const rows = [
        {
            id: '1',
            professorId: '50078',
            fullName: 'รศ.ดร.สุวัฒน์ จุลสุวรรณ์',
            role: 'รองศาสตราจารย์',
        },
        {
            id: '2',
            professorId: '5117',
            fullName: 'ผศ.ดร.วราพร เอราวรรณ์',
            role: 'รองศาสตราจารย์',
        },
        {
            id: '3',
            professorId: '5999',
            fullName: 'ผศ.ก่อเกียรติ ขวัญสกุล',
            role: 'รองศาสตราจารย์',
        },
        {
            id: '4',
            professorId: '5805010',
            fullName: 'อ.ดร.ชนยุตฏษ์ ช้างเพชร',
            role: 'รองศาสตราจารย์',
        },
        {
            id: '5',
            professorId: '50014',
            fullName: 'อ.มาณวิกา กิตติพร',
            role: 'รองศาสตราจารย์',
        },
        {
            id: '6',
            professorId: '6105003',
            fullName: 'รศ.ดร.พชรวิทย์ จันทร์ศิริสิร',
            role: 'รองศาสตราจารย์',
        },
        {
            id: '7',
            professorId: '5999',
            fullName: 'ผศ.ก่อเกียรติ ขวัญสกุล',
            role: 'รองศาสตราจารย์',
        },
        {
            id: '8',
            professorId: '5805010',
            fullName: 'อ.ดร.ชนยุตฏษ์ ช้างเพชร',
            role: 'รองศาสตราจารย์',
        },
        {
            id: '9',
            professorId: '50014',
            fullName: 'อ.มาณวิกา กิตติพร',
            role: 'รองศาสตราจารย์',
        },
        {
            id: '10',
            professorId: '6105003',
            fullName: 'รศ.ดร.พชรวิทย์ จันทร์ศิริสิร',
            role: 'รองศาสตราจารย์',
        },
    ];

    const columns: GridColDef[] = [
        {
            field: 'professorId',
            headerName: 'userId',
            align: 'center',
            headerAlign: 'center',
            width: 150,
            // valueGetter: (params) => params,
        },
        {
            field: 'fullName',
            headerName: 'ชื่อ',
            align: 'left',
            headerAlign: 'center',
            flex: 1,
            // valueGetter: (params) => params,
        },
        {
            field: 'role',
            headerName: 'ตำแหน่ง',
            align: 'left',
            headerAlign: 'center',
            width: 200,
            // valueGetter: (params) => params,
        },
        {
            field: 'edit',
            headerName: 'แก้ไข',
            align: 'center',
            headerAlign: 'center',
            width: 150,
            renderCell: (params) => (
                <IconButton size="small">
                    <EditIcon fontSize="inherit" />
                </IconButton>
            ),
        },
    ];

    // const [boxWidth, setBoxWidth] = useState(window.innerWidth);
    // const boxRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     function updateHeights() {
    //         if (boxRef.current) {
    //             const width = boxRef.current.clientWidth;
    //             console.log('width :: ', width);

    //             setBoxWidth(width);
    //         }
    //     }
    //     updateHeights();
    //     window.addEventListener('resize', updateHeights);
    //     return () => {
    //         window.removeEventListener('resize', updateHeights);
    //     };
    // }, []);

    return (
        <MenuDrawer>
            <Box sx={{ height: '100%', width: '100%' }}>
                <Box>
                    <Typography textAlign="start" variant="h6" component="div">
                        ข้อมูลอาจารย์
                    </Typography>
                    <Divider />
                </Box>
                <Box sx={{ marginTop: 2, width: '100%' }}>
                    <Grid
                        container
                        marginBottom={2}
                        spacing={2}
                        alignItems="center"
                    >
                        <Grid item xs={8} md={8}>
                            <TextField
                                fullWidth
                                size="small"
                                label="ค้นหารายชื่อ"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Button fullWidth variant="contained">
                                ค้นหา
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button fullWidth variant="outlined">
                                เพิ่มรายชื่ออาจารย์
                            </Button>
                        </Grid>
                    </Grid>
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
                        // style={{ width: `${boxWidth}px` }}
                        pageSizeOptions={[5, 10]}
                        disableRowSelectionOnClick
                    />
                </Box>
                {/* <Box sx={{ height: 400, width: `${boxWidth}px` }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowId={(row: any) => row.id}
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
                </Box> */}
            </Box>
        </MenuDrawer>
    );
};

export default ProfessorInfoPage;
